"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FESTIVAL } from "@/data/config";

export const INTRO_SESSION_KEY = "techflix_s3_intro_seen";

// Centralized timing configuration (all in ms)
export const INTRO_TIMING = {
  totalDuration: 5200,      // ~5.2s total visible play duration
  atmosphereEnd: 800,       // Atmosphere settles (0 -> 0.8s)
  tunnelTravelEnd: 2400,    // Camera travels through 3D corridor (0.8s -> 2.4s)
  lightSweepStart: 2100,    // Bright red light sweep initiates across scene
  lightSweepEnd: 3300,      // Light sweep completes
  titleRevealStart: 2400,   // Title emerges with dimensional shadow & glow
  titleHoldEnd: 4600,       // Title holds prominently with tagline (2.4s -> 4.6s)
  exitFadeStart: 4600,      // Overlay and 3D scene smoothly crossfades into Hero
  exitFadeDuration: 600,    // 600ms exit transition
};

interface IntroProps {
  onDone: () => void;
}

export default function Intro({ onDone }: IntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const titleStageRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<"init" | "travel" | "reveal" | "hold" | "exit">("init");
  const [isSkipped, setIsSkipped] = useState(false);
  const animFrameRef = useRef<number>(0);
  const isMountedRef = useRef(true);

  // Finish callback helper
  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {}
    onDone();
  }, [onDone]);

  // Skip button click handler
  const handleSkip = useCallback(() => {
    if (isSkipped) return;
    setIsSkipped(true);
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {}

    const container = containerRef.current;
    if (container) {
      container.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      container.style.opacity = "0";
      container.style.transform = "scale(1.03)";
    }
    setTimeout(() => {
      onDone();
    }, 400);
  }, [isSkipped, onDone]);

  useEffect(() => {
    isMountedRef.current = true;

    // Check query params for `?intro=1` preview bypass
    let isPreview = false;
    try {
      const params = new URLSearchParams(window.location.search);
      isPreview = params.get("intro") === "1" || params.get("intro") === "true";
    } catch {}

    // Check session storage if not explicitly requesting preview
    if (!isPreview) {
      try {
        if (sessionStorage.getItem(INTRO_SESSION_KEY)) {
          onDone();
          return;
        }
      } catch {}
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Reduced motion path ──
    if (prefersReduced) {
      setPhase("hold");
      if (titleStageRef.current) {
        titleStageRef.current.style.opacity = "1";
        titleStageRef.current.style.transform = "none";
      }
      const t = setTimeout(() => {
        handleComplete();
      }, 3200);
      return () => clearTimeout(t);
    }

    // ── Three.js Moving 3D Scene Initialization ──
    let cleanupThree: (() => void) | null = null;
    let startTime = performance.now();

    const initScene = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const THREE = await import("three");
        if (!isMountedRef.current) return;

        const isMobile = window.innerWidth < 768;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
        renderer.setSize(width, height);
        renderer.setClearColor(0x0b0b0b, 1);

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0b0b0b, 0.022);

        const camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 180);
        // Initial camera position far back down the corridor
        camera.position.set(0, 0, 48);

        // ── 1. LIGHTING ──
        const ambientLight = new THREE.AmbientLight(0x220508, 2.0);
        scene.add(ambientLight);

        // Core deep red glow point light
        const redCoreLight = new THREE.PointLight(0xe50914, 4, 80);
        redCoreLight.position.set(0, 0, 10);
        scene.add(redCoreLight);

        // Dynamic light sweep spotlight that glides across
        const sweepLight = new THREE.SpotLight(0xff3847, 8, 70, Math.PI / 4, 0.4, 1);
        sweepLight.position.set(-40, 5, 25);
        scene.add(sweepLight);
        const sweepTarget = new THREE.Object3D();
        sweepTarget.position.set(0, 0, 0);
        scene.add(sweepTarget);
        sweepLight.target = sweepTarget;

        // ── 2. TUNNEL OF FLOATING ABSTRACT GLASS PANELS ──
        const panelsGroup = new THREE.Group();
        scene.add(panelsGroup);

        const panelCount = isMobile ? 12 : 22;
        const panelMeshes: {
          mesh: import("three").Mesh;
          baseZ: number;
          rotSpeed: { x: number; y: number; z: number };
          edges: import("three").LineSegments;
        }[] = [];

        for (let i = 0; i < panelCount; i++) {
          const pWidth = isMobile ? 7 : 10 + Math.random() * 4;
          const pHeight = isMobile ? 4.5 : 6 + Math.random() * 3;
          const planeGeo = new THREE.PlaneGeometry(pWidth, pHeight);

          // Glass material with subtle reflection and translucency
          const glassMat = new THREE.MeshStandardMaterial({
            color: 0x1f080b,
            roughness: 0.1,
            metalness: 0.85,
            transparent: true,
            opacity: 0.32,
            side: THREE.DoubleSide,
          });

          const mesh = new THREE.Mesh(planeGeo, glassMat);

          // Position around a tunnel perimeter (left, right, ceiling, floor)
          const angle = (i / panelCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
          const radius = isMobile ? 10 + Math.random() * 4 : 14 + Math.random() * 6;
          const zPos = 35 - (i / panelCount) * 75; // spread along corridor from z=35 to z=-40

          mesh.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.75,
            zPos
          );

          mesh.rotation.set(
            (Math.random() - 0.5) * 0.3,
            angle + Math.PI / 2 + (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
          );

          // Luminous crimson edge highlights
          const edgesGeo = new THREE.EdgesGeometry(planeGeo);
          const edgesMat = new THREE.LineBasicMaterial({
            color: 0xff2837,
            transparent: true,
            opacity: 0.4,
          });
          const edges = new THREE.LineSegments(edgesGeo, edgesMat);
          mesh.add(edges);

          panelsGroup.add(mesh);
          panelMeshes.push({
            mesh,
            baseZ: zPos,
            rotSpeed: {
              x: (Math.random() - 0.5) * 0.003,
              y: (Math.random() - 0.5) * 0.003,
              z: (Math.random() - 0.5) * 0.002,
            },
            edges,
          });
        }

        // ── 3. GLOWING PARTICLES ALONG CORRIDOR ──
        const pCount = isMobile ? 400 : 900;
        const pGeo = new THREE.BufferGeometry();
        const pPositions = new Float32Array(pCount * 3);
        const pColors = new Float32Array(pCount * 3);

        for (let i = 0; i < pCount; i++) {
          pPositions[i * 3] = (Math.random() - 0.5) * 45;
          pPositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
          pPositions[i * 3 + 2] = 40 - Math.random() * 85;

          // Crimson, ruby and soft white embers
          const type = Math.random();
          if (type > 0.4) {
            pColors[i * 3] = 0.95;     // Red
            pColors[i * 3 + 1] = 0.08;
            pColors[i * 3 + 2] = 0.12;
          } else if (type > 0.15) {
            pColors[i * 3] = 0.65;     // Deep maroon
            pColors[i * 3 + 1] = 0.04;
            pColors[i * 3 + 2] = 0.06;
          } else {
            pColors[i * 3] = 1.0;      // Starlight white glint
            pColors[i * 3 + 1] = 0.85;
            pColors[i * 3 + 2] = 0.85;
          }
        }

        pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
        pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));

        const pMat = new THREE.PointsMaterial({
          size: isMobile ? 0.22 : 0.28,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true,
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        // ── 4. CUSTOM GEOMETRIC TECHFLIX 3D MARK ──
        // A luminous futuristic monolithic prism emblem that coalesces at z=0
        const markGroup = new THREE.Group();
        markGroup.position.set(0, 1.8, 0);
        scene.add(markGroup);

        // Inner glowing geometric chevron / hexagon prism
        const markGeo = new THREE.OctahedronGeometry(2.4, 0);
        const markWireGeo = new THREE.WireframeGeometry(markGeo);
        const markMat = new THREE.LineBasicMaterial({
          color: 0xff3847,
          transparent: true,
          opacity: 0.1, // starts faint, surges during light sweep
        });
        const markLines = new THREE.LineSegments(markWireGeo, markMat);
        markGroup.add(markLines);

        // Outer faceted crystal ring
        const ringGeo = new THREE.TorusGeometry(3.6, 0.04, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xe50914,
          transparent: true,
          opacity: 0.1,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2.3;
        markGroup.add(ring);

        // Monogram constellation particles inside the mark
        const markPCount = 120;
        const markPGeo = new THREE.BufferGeometry();
        const markPPos = new Float32Array(markPCount * 3);
        for (let i = 0; i < markPCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 2.2 * Math.cbrt(Math.random());
          markPPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          markPPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          markPPos[i * 3 + 2] = r * Math.cos(phi);
        }
        markPGeo.setAttribute("position", new THREE.BufferAttribute(markPPos, 3));
        const markPMat = new THREE.PointsMaterial({
          color: 0xff6b78,
          size: 0.2,
          transparent: true,
          opacity: 0.1,
        });
        const markParticles = new THREE.Points(markPGeo, markPMat);
        markGroup.add(markParticles);

        // ── RESIZE HANDLER ──
        const onResize = () => {
          if (!renderer || !camera) return;
          const w = window.innerWidth;
          const h = window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize, { passive: true });

        // ── 5. ANIMATION LOOP WITH INTENTIONAL TIMING SEQUENCE ──
        const animate = (now: number) => {
          if (!isMountedRef.current) return;
          if (document.hidden) {
            animFrameRef.current = requestAnimationFrame(animate);
            return;
          }

          const elapsed = now - startTime;

          // A. Camera Forward Travel Curve
          // Eases camera position from z=48 down to z=11 over tunnelTravelEnd
          if (elapsed < INTRO_TIMING.tunnelTravelEnd) {
            const travelProgress = Math.min(1, Math.max(0, (elapsed - 200) / (INTRO_TIMING.tunnelTravelEnd - 200)));
            // Smooth easeInOutCubic curve
            const eased = travelProgress < 0.5
              ? 4 * travelProgress * travelProgress * travelProgress
              : 1 - Math.pow(-2 * travelProgress + 2, 3) / 2;

            camera.position.z = 48 - eased * 37; // 48 -> 11
            camera.position.y = Math.sin(travelProgress * Math.PI) * 0.8;
            camera.rotation.z = Math.sin(travelProgress * Math.PI) * 0.04;
          } else if (elapsed < INTRO_TIMING.exitFadeStart) {
            // Slight graceful drift while holding title
            const holdProgress = (elapsed - INTRO_TIMING.tunnelTravelEnd) / 1000;
            camera.position.z = 11 - holdProgress * 0.3;
            camera.rotation.z *= 0.95;
          } else {
            // Exit push: camera accelerates forward smoothly through the mark
            const exitProgress = (elapsed - INTRO_TIMING.exitFadeStart) / INTRO_TIMING.exitFadeDuration;
            camera.position.z = 10.4 - exitProgress * exitProgress * 9;
          }

          // B. Red Light Sweep
          if (elapsed >= INTRO_TIMING.lightSweepStart && elapsed <= INTRO_TIMING.lightSweepEnd + 400) {
            const sweepProgress = (elapsed - INTRO_TIMING.lightSweepStart) / (INTRO_TIMING.lightSweepEnd - INTRO_TIMING.lightSweepStart);
            const clamped = Math.min(1, Math.max(0, sweepProgress));
            sweepLight.position.x = -35 + clamped * 70; // Sweep across X: -35 -> +35
            sweepLight.intensity = 4 + Math.sin(clamped * Math.PI) * 12;

            // Mark illumination surges
            markMat.opacity = 0.1 + Math.sin(clamped * Math.PI) * 0.85;
            markPMat.opacity = 0.1 + Math.sin(clamped * Math.PI) * 0.9;
            ringMat.opacity = 0.1 + Math.sin(clamped * Math.PI) * 0.7;
          } else if (elapsed > INTRO_TIMING.lightSweepEnd) {
            // Settle to stable ambient glow
            markMat.opacity = 0.55 + Math.sin(elapsed * 0.003) * 0.15;
            markPMat.opacity = 0.7;
            ringMat.opacity = 0.45;
          }

          // C. Rotate panels and mark
          markGroup.rotation.y = elapsed * 0.0009;
          markGroup.rotation.x = Math.sin(elapsed * 0.0012) * 0.15;
          ring.rotation.z = -elapsed * 0.0015;

          panelMeshes.forEach((p) => {
            p.mesh.rotation.x += p.rotSpeed.x;
            p.mesh.rotation.y += p.rotSpeed.y;
            // Float slightly forward relative to camera
            p.mesh.position.y += Math.sin(elapsed * 0.0015 + p.baseZ) * 0.004;
          });

          // Particles gentle drift
          particles.rotation.y = elapsed * 0.00015;

          renderer.render(scene, camera);
          animFrameRef.current = requestAnimationFrame(animate);
        };

        animFrameRef.current = requestAnimationFrame(animate);

        cleanupThree = () => {
          window.removeEventListener("resize", onResize);
          if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
          renderer.dispose();
          scene.clear();
        };
      } catch (err) {
        console.warn("Three.js intro initialization fallback:", err);
      }
    };

    initScene();

    // ── 6. TIMED STAGES FOR HTML / TYPOGRAPHY OVERLAYS ──
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Stage 1: Atmosphere -> Travel (at 800ms)
    timers.push(
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setPhase("travel");
      }, INTRO_TIMING.atmosphereEnd)
    );

    // Stage 2: Light Sweep trigger for CSS overlay (at 2100ms)
    timers.push(
      setTimeout(() => {
        if (!isMountedRef.current) return;
        const sweepEl = sweepRef.current;
        if (sweepEl) {
          sweepEl.style.transition = "transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.9s ease";
          sweepEl.style.transform = "translateX(120%)";
          sweepEl.style.opacity = "1";
          setTimeout(() => {
            if (sweepEl) sweepEl.style.opacity = "0";
          }, 600);
        }
      }, INTRO_TIMING.lightSweepStart)
    );

    // Stage 3: Title & Season Reveal (at 2400ms)
    timers.push(
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setPhase("reveal");
        const stage = titleStageRef.current;
        if (stage) {
          stage.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
          stage.style.opacity = "1";
          stage.style.transform = "translateY(0) scale(1)";
        }
      }, INTRO_TIMING.titleRevealStart)
    );

    // Stage 4: Title Hold with Organizer Tagline (at 3400ms)
    timers.push(
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setPhase("hold");
      }, 3400)
    );

    // Stage 5: Exit Crossfade Initiation (at 4600ms)
    timers.push(
      setTimeout(() => {
        if (!isMountedRef.current) return;
        setPhase("exit");
        const container = containerRef.current;
        if (container) {
          container.style.transition = `opacity ${INTRO_TIMING.exitFadeDuration}ms ease, transform ${INTRO_TIMING.exitFadeDuration}ms ease`;
          container.style.opacity = "0";
          container.style.transform = "scale(1.04)";
        }
      }, INTRO_TIMING.exitFadeStart)
    );

    // Stage 6: Final Sequence Complete (at 5200ms)
    timers.push(
      setTimeout(() => {
        if (!isMountedRef.current) return;
        handleComplete();
      }, INTRO_TIMING.totalDuration)
    );

    return () => {
      isMountedRef.current = false;
      timers.forEach(clearTimeout);
      if (cleanupThree) cleanupThree();
    };
  }, [handleComplete, onDone]);

  return (
    <div
      ref={containerRef}
      className="intro-container"
      role="region"
      aria-label="TechFlix Season 3 Introduction"
      aria-modal="true"
    >
      {/* 3D WebGL Moving Tunnel Scene */}
      <canvas ref={canvasRef} className="intro-canvas-layer" aria-hidden="true" />

      {/* Screen Sweep Flash Overlay */}
      <div ref={sweepRef} className="intro-light-sweep-overlay" aria-hidden="true" />

      {/* Radial Vignette */}
      <div className="intro-vignette" aria-hidden="true" />

      {/* Subtle Scan Line */}
      <div className="intro-scan-line" aria-hidden="true" style={{ opacity: 0.35, zIndex: 4 }} />

      {/* Visible Skip Button */}
      <button
        onClick={handleSkip}
        className="intro-skip-btn"
        aria-label="Skip introduction animation"
      >
        <span>Skip Intro</span>
        <span aria-hidden="true">⏭</span>
      </button>

      {/* Center Stage: Organizer + Title + Season 3 + Tagline */}
      <div
        ref={titleStageRef}
        className="intro-title-stage"
        style={{
          opacity: 0,
          transform: "translateY(18px) scale(0.97)",
        }}
      >
        {/* Organizer Badge */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="intro-organizer-chip">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--red-500)",
                boxShadow: "0 0 8px var(--red-500)",
                display: "inline-block",
              }}
              aria-hidden="true"
            />
            {FESTIVAL.organizerShort} PRESENTS
          </div>
        </div>

        {/* Brand Display: TECHFLIX */}
        <h1 className="intro-main-title">
          {FESTIVAL.name}
        </h1>

        {/* Season 3 Display */}
        <div className="intro-season-subtitle">
          {FESTIVAL.season}
        </div>

        {/* Short Tagline */}
        <p className="intro-tagline">
          {FESTIVAL.tagline}
        </p>

        {/* Glowing Accent Bar */}
        <div className="intro-accent-bar" aria-hidden="true" />
      </div>
    </div>
  );
}
