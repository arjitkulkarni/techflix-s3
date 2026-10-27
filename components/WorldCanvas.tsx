"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";

export default function WorldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const mountedRef = useRef(true);
  const [supported, setSupported] = useState(true);

  const init = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      if (!mountedRef.current) return;

      const isMobile = window.innerWidth < 768;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x0a0507, 0);

      const scene = new THREE.Scene();
      // Subtle cinema fog: clear near the camera, deep charcoal at distance
      scene.fog = new THREE.FogExp2(0x0a0507, isMobile ? 0.024 : 0.018);

      const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 260);
      camera.position.set(0, 16, 26);

      // ─── 1. CINEMATIC PREMIERE LIGHTING ───
      const ambientLight = new THREE.AmbientLight(0x180406, 1.8);
      scene.add(ambientLight);

      // Primary tracking red light that accompanies the camera
      const trackingRedLight = new THREE.PointLight(0xe50914, 3.5, 75);
      trackingRedLight.position.set(0, 15, 20);
      scene.add(trackingRedLight);

      // Rim light for depth
      const rimLight = new THREE.PointLight(0xff3344, 1.6, 55);
      rimLight.position.set(-15, 0, 10);
      scene.add(rimLight);

      // Spotlight for Sponsors stage
      const sponsorSpotlight = new THREE.SpotLight(0xffffff, 0, 45, Math.PI / 4, 0.4, 1.2);
      sponsorSpotlight.position.set(0, -56, 12);
      const sponsorTarget = new THREE.Object3D();
      sponsorTarget.position.set(0, -68, -5);
      scene.add(sponsorTarget);
      sponsorSpotlight.target = sponsorTarget;
      scene.add(sponsorSpotlight);

      // ─── 2. SPLINE PATH: "THE RED CURRENT" ───
      // Smooth continuous 3D path traveling from Hero down to Contact
      const splinePoints = [
        // Zone 0: Hero background (Y: 22 to 14)
        new THREE.Vector3(-14, 22, -18),
        new THREE.Vector3(6, 15, -14),

        // Zone 1: First scroll below Hero (Transition zone with TF Mark, Y: 6 to -6)
        // Sweeps across the screen, curving close to camera at (0, 0, -2.8)
        new THREE.Vector3(-18, 5, -8),
        new THREE.Vector3(0, 0, -2.8),      // APEX: right in front of camera, frames the TF mark
        new THREE.Vector3(16, -4, -6.5),

        // Zone 2: Events section (Y: -12 to -28)
        // Passes behind event artwork like a 35mm film rail
        new THREE.Vector3(-12, -14, -5.5),
        new THREE.Vector3(10, -21, -5.0),
        new THREE.Vector3(-8, -28, -5.5),

        // Zone 3: Schedule section (Y: -36 to -52)
        // Straightens into a clean rail connecting timeline moments
        new THREE.Vector3(-7, -37, -4.5),
        new THREE.Vector3(-6, -45, -4.5),
        new THREE.Vector3(-5, -53, -4.8),

        // Zone 4: Sponsors section (Y: -62 to -74)
        // Loops to frame a simple spotlight stage under sponsors
        new THREE.Vector3(9, -63, -5.5),
        new THREE.Vector3(0, -68, -4.5),    // Central stage framing loop
        new THREE.Vector3(-9, -73, -6.0),

        // Zone 5: About, FAQ and Contact (Y: -84 to -125)
        // Recedes smoothly into deep background to quietly support content
        new THREE.Vector3(8, -85, -16),
        new THREE.Vector3(-6, -98, -22),
        new THREE.Vector3(4, -112, -26),
        new THREE.Vector3(0, -125, -30),
      ];

      const currentSpline = new THREE.CatmullRomCurve3(splinePoints, false, "catmullrom", 0.5);

      // ─── 3. PROCEDURAL FILM STRIP RIBBON GEOMETRY ───
      // We generate a flat twisting 3D ribbon with physical width, Frenet frames, and film perforations
      const sampleCount = isMobile ? 180 : 340;
      const ribbonWidth = isMobile ? 1.7 : 2.5;

      // Generate points and frames along curve
      const ribbonGeo = new THREE.BufferGeometry();
      const positions = new Float32Array((sampleCount + 1) * 2 * 3);
      const uvs = new Float32Array((sampleCount + 1) * 2 * 2);
      const indices: number[] = [];

      // Create a smooth frame orientation along spline
      let prevNormal = new THREE.Vector3(0, 0, 1);

      for (let i = 0; i <= sampleCount; i++) {
        const t = i / sampleCount;
        const pt = currentSpline.getPointAt(t);
        const tangent = currentSpline.getTangentAt(t).normalize();

        // Calculate a stable perpendicular normal
        let normal = new THREE.Vector3().crossVectors(tangent, prevNormal).normalize();
        if (normal.lengthSq() < 0.001) {
          normal = new THREE.Vector3(0, 1, 0).cross(tangent).normalize();
        }
        const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();
        prevNormal.copy(normal);

        // Subtle dynamic banking / tilt along the ribbon for a fluid film strip feel
        const bankAngle = Math.sin(t * Math.PI * 4) * 0.25;
        const tiltedBinormal = binormal.clone().applyAxisAngle(tangent, bankAngle);

        const halfW = ribbonWidth * 0.5;
        const vLeft = pt.clone().addScaledVector(tiltedBinormal, -halfW);
        const vRight = pt.clone().addScaledVector(tiltedBinormal, halfW);

        const vIdx = i * 2;
        // Left vertex
        positions[vIdx * 3]     = vLeft.x;
        positions[vIdx * 3 + 1] = vLeft.y;
        positions[vIdx * 3 + 2] = vLeft.z;

        // Right vertex
        positions[(vIdx + 1) * 3]     = vRight.x;
        positions[(vIdx + 1) * 3 + 1] = vRight.y;
        positions[(vIdx + 1) * 3 + 2] = vRight.z;

        // UVs: U repeats 42 times along length (for film sprocket & frame division pattern)
        const uCoord = t * 42.0;
        uvs[vIdx * 2]     = uCoord;
        uvs[vIdx * 2 + 1] = 0.0;

        uvs[(vIdx + 1) * 2]     = uCoord;
        uvs[(vIdx + 1) * 2 + 1] = 1.0;

        if (i < sampleCount) {
          const a = vIdx;
          const b = vIdx + 1;
          const c = vIdx + 2;
          const d = vIdx + 3;
          indices.push(a, b, c);
          indices.push(b, d, c);
        }
      }

      ribbonGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      ribbonGeo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
      ribbonGeo.setIndex(indices);
      ribbonGeo.computeVertexNormals();

      // ─── 4. HIGH-END CINEMATIC "RED CURRENT" SHADER MATERIAL ───
      // Custom shader with:
      // - Glowing crimson/ruby gradient
      // - Twin intense neon edge rails
      // - Authentic 35mm film perforations (sprocket holes along both margins)
      // - Moving energy pulses along the current
      const ribbonUniforms = {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uPulsePos: { value: 0 },
        uEdgeColor: { value: new THREE.Color(0xff2233) },
        uBodyColor: { value: new THREE.Color(0x9a0710) },
        uCoreColor: { value: new THREE.Color(0x2a0408) },
      };

      const ribbonMaterial = new THREE.ShaderMaterial({
        uniforms: ribbonUniforms,
        side: THREE.DoubleSide,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            vViewPosition = -mvPosition.xyz;
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uScroll;
          uniform float uPulsePos;
          uniform vec3 uEdgeColor;
          uniform vec3 uBodyColor;
          uniform vec3 uCoreColor;

          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vViewPosition;

          void main() {
            float v = vUv.y;
            float u = vUv.x;

            // Distance from center across ribbon width (0 at center, 1 at edges)
            float distFromCenter = abs(v - 0.5) * 2.0;

            // 1. Dual Glowing Neon Edge Rails
            // Intense bright laser line along the outer 10% on each side
            float edgeDist = min(v, 1.0 - v);
            float edgeGlow = smoothstep(0.12, 0.0, edgeDist);
            float hotEdge = smoothstep(0.04, 0.0, edgeDist);

            // 2. 35mm Film Perforations (Sprocket Holes)
            // Authentic rectangular sprocket holes along both margins (edgeDist between 0.04 and 0.14)
            float sprocketRepeat = fract(u * 2.0);
            float isSprocketU = step(0.28, sprocketRepeat) * step(sprocketRepeat, 0.72);
            float isSprocketV = step(0.035, edgeDist) * step(edgeDist, 0.125);
            float isHole = isSprocketU * isSprocketV;

            // 3. Film Frame Divider Lines
            float frameDivider = smoothstep(0.04, 0.0, abs(fract(u) - 0.5));

            // 4. Traveling Light Current Pulses (moving along ribbon length)
            float wave1 = sin(u * 0.35 - uTime * 2.2);
            float pulseWave = smoothstep(0.65, 1.0, wave1);

            float wave2 = sin(u * 0.2 + uTime * 1.5 + 1.2);
            float pulseWave2 = smoothstep(0.75, 1.0, wave2) * 0.6;

            // 5. Fresnel rim highlight
            vec3 normal = normalize(vNormal);
            vec3 viewDir = normalize(vViewPosition);
            float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.0);

            // Color Composition
            vec3 baseCol = mix(uCoreColor, uBodyColor, distFromCenter * 0.85);
            baseCol += uEdgeColor * edgeGlow * 1.35;
            baseCol += vec3(1.0, 0.5, 0.5) * hotEdge * 1.8;
            baseCol += uEdgeColor * (pulseWave + pulseWave2) * 0.75;
            baseCol += vec3(0.9, 0.1, 0.15) * fresnel * 0.4;
            baseCol += vec3(0.4, 0.05, 0.08) * frameDivider * 0.35;

            // Sprocket hole transparency: holes let the dark cinema background show through
            float alpha = mix(0.72, 0.98, edgeGlow);
            if (isHole > 0.5) {
              alpha = 0.06; // transparent hole
            }

            gl_FragColor = vec4(baseCol, alpha);
          }
        `,
      });

      const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMaterial);
      scene.add(ribbonMesh);

      // ─── 5. ORIGINAL 3D TECHFLIX "TF" MARK EMBLEM ───
      // Revealed smoothly on first scroll below hero as the ribbon sweeps across
      const tfGroup = new THREE.Group();
      // Positioned at the apex of the transition sweep
      tfGroup.position.set(0, 0, -2.8);
      scene.add(tfGroup);

      // Emblem Material: Brushed dark obsidian metal with luminous red neon beveled edges
      const tfMat = new THREE.MeshStandardMaterial({
        color: 0x180507,
        emissive: 0xe50914,
        emissiveIntensity: 0.5,
        roughness: 0.25,
        metalness: 0.9,
      });

      const neonMat = new THREE.MeshBasicMaterial({
        color: 0xff2535,
        wireframe: true,
      });

      // Construct 3D Monogram TF
      // 'T' top crossbar
      const tTopGeo = new THREE.BoxGeometry(2.8, 0.45, 0.3);
      const tTop = new THREE.Mesh(tTopGeo, tfMat);
      tTop.position.set(-0.35, 1.1, 0);
      tfGroup.add(tTop);

      // 'T' vertical stem
      const tStemGeo = new THREE.BoxGeometry(0.5, 2.4, 0.3);
      const tStem = new THREE.Mesh(tStemGeo, tfMat);
      tStem.position.set(-0.35, 0, 0);
      tfGroup.add(tStem);

      // 'F' horizontal upper wing (merges seamlessly with T top bar)
      const fUpperGeo = new THREE.BoxGeometry(1.6, 0.45, 0.3);
      const fUpper = new THREE.Mesh(fUpperGeo, tfMat);
      fUpper.position.set(0.7, 1.1, 0.05);
      tfGroup.add(fUpper);

      // 'F' horizontal middle bar
      const fMidGeo = new THREE.BoxGeometry(1.2, 0.38, 0.3);
      const fMid = new THREE.Mesh(fMidGeo, tfMat);
      fMid.position.set(0.65, 0.2, 0.05);
      tfGroup.add(fMid);

      // Neon Wireframe outline overlay for razor-sharp edge radiance
      const wireT = new THREE.LineSegments(new THREE.EdgesGeometry(tTopGeo), neonMat);
      tTop.add(wireT);
      const wireStem = new THREE.LineSegments(new THREE.EdgesGeometry(tStemGeo), neonMat);
      tStem.add(wireStem);
      const wireFUpper = new THREE.LineSegments(new THREE.EdgesGeometry(fUpperGeo), neonMat);
      fUpper.add(wireFUpper);
      const wireFMid = new THREE.LineSegments(new THREE.EdgesGeometry(fMidGeo), neonMat);
      fMid.add(wireFMid);

      // Circular Framing Ring (representing a premiere lens aperture around the TF mark)
      const apertureRingGeo = new THREE.TorusGeometry(2.5, 0.035, 8, 48);
      const apertureRingMat = new THREE.MeshBasicMaterial({
        color: 0xff1e2b,
        transparent: true,
        opacity: 0.35,
      });
      const apertureRing = new THREE.Mesh(apertureRingGeo, apertureRingMat);
      tfGroup.add(apertureRing);

      // Light flash flare on the TF mark
      const tfFlash = new THREE.PointLight(0xff3344, 0, 25);
      tfFlash.position.set(0, 0, 1.5);
      tfGroup.add(tfFlash);

      // ─── 6. SPONSORS SPOTLIGHT STAGE ACCENT RING ───
      // A luminous circular pedestal rail that frames the sponsors section
      const stageRingGeo = new THREE.TorusGeometry(8.5, 0.06, 8, 64);
      const stageRingMat = new THREE.MeshBasicMaterial({
        color: 0xe50914,
        transparent: true,
        opacity: 0.4,
      });
      const stageRing = new THREE.Mesh(stageRingGeo, stageRingMat);
      stageRing.position.set(0, -68, -5);
      stageRing.rotation.x = Math.PI / 2.3;
      scene.add(stageRing);

      // ─── 7. CINEMATIC DUST MOTES (Minimal Projector Dust, not a storm) ───
      // Subtle ambient projector dust floating peacefully in light beams
      const dustCount = isMobile ? 60 : 120;
      const dustGeo = new THREE.BufferGeometry();
      const dustPos = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPos[i * 3]     = (Math.random() - 0.5) * 50;
        dustPos[i * 3 + 1] = 20 - Math.random() * 150;
        dustPos[i * 3 + 2] = -25 + Math.random() * 35;
      }
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
      const dustMat = new THREE.PointsMaterial({
        color: 0xff5566,
        size: isMobile ? 0.16 : 0.22,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);

      // ─── 8. RESIZE & SCROLL LOGIC ───
      let scrollProgress = 0;
      let targetScrollProgress = 0;
      let mouseX = 0, mouseY = 0;
      let targetMouseX = 0, targetMouseY = 0;

      const onScroll = () => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        if (docH > 0) {
          targetScrollProgress = Math.min(Math.max(window.scrollY / docH, 0), 1);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const onMouseMove = (e: MouseEvent) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (!isMobile) {
        window.addEventListener("mousemove", onMouseMove, { passive: true });
      }

      const onResize = () => {
        if (!renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize, { passive: true });

      // ─── 9. VISIBILITY & ANIMATION LOOP ───
      let isVisible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.01 }
      );
      observer.observe(canvas);

      let t = 0;

      const animate = () => {
        if (!mountedRef.current) return;

        if (document.hidden || !isVisible) {
          animFrameRef.current = requestAnimationFrame(animate);
          return;
        }

        if (prefersReduced) {
          renderer.render(scene, camera);
          return;
        }

        t += 0.008;

        // Smooth spring damping for scroll and mouse
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.055;
        mouseX += (targetMouseX - mouseX) * 0.035;
        mouseY += (targetMouseY - mouseY) * 0.035;

        // Update shader uniforms
        ribbonUniforms.uTime.value = t;
        ribbonUniforms.uScroll.value = scrollProgress;

        // ── Camera Position along The Red Current Journey ──
        // Samples spline curve based on scrollProgress
        const clampedScroll = Math.min(Math.max(scrollProgress, 0), 1);
        const curveT = Math.min(Math.max(clampedScroll * 0.95, 0), 1);
        const lookT = Math.min(Math.max(clampedScroll * 0.95 + 0.05, 0), 1);

        const currentPt = currentSpline.getPointAt(curveT);
        const lookTarget = currentSpline.getPointAt(lookT);

        // Dynamic camera offsets per section
        // Hero (scroll < 0.08): high overview
        // Transition (0.08 - 0.22): close-up on ribbon sweep & TF mark
        // Events (0.22 - 0.45): elevated view framing ribbon behind cards
        // Schedule (0.45 - 0.65): tracking vertical rail
        // Sponsors (0.65 - 0.80): viewing spotlight stage
        // About / FAQ / Contact (> 0.80): wide perspective
        let zOffset = 18;
        let yOffset = 1.5;

        if (scrollProgress >= 0.06 && scrollProgress <= 0.22) {
          // Transition zone: camera draws intimate and cinematic
          const transP = Math.sin(((scrollProgress - 0.06) / 0.16) * Math.PI);
          zOffset = 18 - transP * 9; // zooms in toward TF mark
          yOffset = 1.5 - transP * 1.0;
        } else if (scrollProgress > 0.75) {
          // Deep content sections: camera pulls back for readability
          zOffset = 18 + (scrollProgress - 0.75) * 14;
        }

        camera.position.x = currentPt.x * 0.45 + mouseX * 1.2;
        camera.position.y = currentPt.y + yOffset + mouseY * 0.8;
        camera.position.z = currentPt.z + zOffset;
        camera.lookAt(lookTarget.x * 0.35, lookTarget.y, lookTarget.z);

        // Keep tracking lights accompanying camera
        trackingRedLight.position.set(camera.position.x + 5, camera.position.y + 6, camera.position.z - 5);
        rimLight.position.set(camera.position.x - 12, camera.position.y - 8, camera.position.z - 8);

        // ── "TF" Mark Reveal Behavior on First Scroll Below Hero ──
        // Active between scroll 0.05 and 0.25
        if (scrollProgress >= 0.04 && scrollProgress <= 0.25) {
          const tfProg = (scrollProgress - 0.04) / 0.21;
          const tfEnv = Math.sin(tfProg * Math.PI); // 0 -> 1 -> 0

          tfGroup.visible = true;
          const scale = 0.85 + tfEnv * 0.35;
          tfGroup.scale.set(scale, scale, scale);

          // Gentle majestic yaw
          tfGroup.rotation.y = (tfProg - 0.5) * 0.6 + mouseX * 0.15;
          tfGroup.rotation.x = Math.sin(t * 0.8) * 0.08;

          tfMat.emissiveIntensity = 0.4 + tfEnv * 2.2;
          neonMat.color.setRGB(1.0, 0.15 + tfEnv * 0.4, 0.2 + tfEnv * 0.3);
          apertureRingMat.opacity = 0.2 + tfEnv * 0.65;
          apertureRing.rotation.z = t * 0.5;

          // Flare flash peak around scroll 0.12
          const flashPeak = Math.max(0, 1.0 - Math.abs(scrollProgress - 0.12) / 0.05);
          tfFlash.intensity = flashPeak * 4.5;
        } else {
          // Park mark when out of transition
          tfGroup.visible = false;
          tfFlash.intensity = 0;
        }

        // ── Sponsors Spotlight Stage Activation ──
        if (scrollProgress >= 0.60 && scrollProgress <= 0.82) {
          const spEnv = Math.sin(((scrollProgress - 0.60) / 0.22) * Math.PI);
          sponsorSpotlight.intensity = spEnv * 3.8;
          stageRingMat.opacity = 0.25 + spEnv * 0.55;
          stageRing.rotation.z = t * 0.2;
        } else {
          sponsorSpotlight.intensity = 0;
        }

        // Gentle dust drift
        const dPos = dustGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < dustCount; i++) {
          dPos[i * 3 + 1] += 0.015;
          if (dPos[i * 3 + 1] > 25) {
            dPos[i * 3 + 1] = -125;
          }
        }
        dustGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
        animFrameRef.current = requestAnimationFrame(animate);
      };

      animFrameRef.current = requestAnimationFrame(animate);

      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        if (!isMobile) window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        cancelAnimationFrame(animFrameRef.current);
        renderer.dispose();
        scene.clear();
      };
    } catch (e) {
      console.warn("The Red Current WebGL failed to initialize:", e);
      setSupported(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const cleanup = init();
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
      cleanup?.then((fn) => fn?.());
    };
  }, [init]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      {supported ? (
        <canvas
          ref={canvasRef}
          id="red-current-canvas"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />
      ) : (
        /* Static CSS Cinematic Fallback for reduced motion / unsupported WebGL */
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 65% 55% at 50% 20%, rgba(229, 9, 20, 0.09) 0%, transparent 70%), #0a0507",
          }}
        />
      )}
    </div>
  );
}
