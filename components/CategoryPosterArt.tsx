"use client";

import React from "react";
import { EventCategory } from "@/data/config";

interface CategoryPosterArtProps {
  category: EventCategory;
  accentColor: string;
}

export default function CategoryPosterArt({ category, accentColor }: CategoryPosterArtProps) {
  switch (category) {
    case "Hackathon":
      return <CodeCubeMotif color={accentColor} />;
    case "AI/ML":
      return <NeuralNetworkMotif color={accentColor} />;
    case "Cybersecurity":
      return <CyberShieldMotif color={accentColor} />;
    case "Physical":
      return <TreasureMapMotif color={accentColor} />;
    case "Creative":
      return <FilmFrameMotif color={accentColor} />;
    case "Symposium":
      return <SymposiumHologramMotif color={accentColor} />;
    case "Forum":
      return <ForumNexusMotif color={accentColor} />;
    case "Workshop":
      return <WorkshopMatrixMotif color={accentColor} />;
    default:
      return <CodeCubeMotif color={accentColor} />;
  }
}

// ── 1. HACKATHON: GLOWING CODE CUBE / HYPERCUBE ──
function CodeCubeMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="cubeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient background grid lines */}
        <line x1="20" y1="80" x2="180" y2="80" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
        <line x1="100" y1="20" x2="100" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

        {/* Outer rotating isometric wireframe cube */}
        <g className="anim-float-gentle">
          {/* Top Face */}
          <polygon
            points="100,32 144,56 100,80 56,56"
            fill="url(#cubeGlow)"
            stroke={color}
            strokeWidth="1.75"
            strokeLinejoin="round"
            opacity="0.85"
          />
          {/* Left Face */}
          <polygon
            points="56,56 100,80 100,132 56,108"
            fill="rgba(10,5,6,0.6)"
            stroke={color}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <polygon
            points="100,80 144,56 144,108 100,132"
            fill="rgba(25,8,10,0.5)"
            stroke={color}
            strokeWidth="1.75"
            strokeLinejoin="round"
          />

          {/* Internal floating core bracket < / > */}
          <text
            x="100"
            y="100"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="var(--font-mono)"
            fontSize="15"
            fontWeight="bold"
            filter="url(#glowFilter)"
            opacity="0.95"
          >
            &lt;/&gt;
          </text>

          {/* Circuit vertices dots */}
          <circle cx="100" cy="32" r="3" fill="#ffffff" filter="url(#glowFilter)" />
          <circle cx="144" cy="56" r="2.5" fill={color} />
          <circle cx="56" cy="56" r="2.5" fill={color} />
          <circle cx="100" cy="80" r="3" fill="#ffffff" />
          <circle cx="100" cy="132" r="2.5" fill={color} />
          <circle cx="144" cy="108" r="2.5" fill={color} />
          <circle cx="56" cy="108" r="2.5" fill={color} />
        </g>
      </svg>
    </div>
  );
}

// ── 2. AI/ML: NEURAL NETWORK / SYNAPSE NEXUS ──
function NeuralNetworkMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        <defs>
          <filter id="neuralGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric neural resonance circles */}
        <circle cx="100" cy="80" r="54" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 6" opacity="0.3" className="anim-spin-very-slow" />
        <circle cx="100" cy="80" r="32" fill="none" stroke={color} strokeWidth="1" opacity="0.2" />

        {/* Synaptic connection paths */}
        <g stroke={color} strokeWidth="1.5" opacity="0.65">
          <line x1="45" y1="55" x2="80" y2="70" />
          <line x1="45" y1="105" x2="80" y2="90" />
          <line x1="80" y1="70" x2="100" y2="80" strokeWidth="2" stroke="#ffffff" opacity="0.8" />
          <line x1="80" y1="90" x2="100" y2="80" strokeWidth="2" stroke="#ffffff" opacity="0.8" />
          <line x1="100" y1="80" x2="125" y2="65" strokeWidth="2" stroke="#ffffff" opacity="0.8" />
          <line x1="100" y1="80" x2="125" y2="95" strokeWidth="2" stroke="#ffffff" opacity="0.8" />
          <line x1="125" y1="65" x2="155" y2="50" />
          <line x1="125" y1="65" x2="155" y2="80" />
          <line x1="125" y1="95" x2="155" y2="110" />
          <line x1="80" y1="70" x2="80" y2="90" strokeDasharray="2 2" opacity="0.4" />
        </g>

        {/* Neural Nodes */}
        <circle cx="45" cy="55" r="4" fill={color} />
        <circle cx="45" cy="105" r="4" fill={color} />
        <circle cx="80" cy="70" r="5" fill="#ffffff" filter="url(#neuralGlow)" />
        <circle cx="80" cy="90" r="5" fill={color} />
        
        {/* Core central brain neuron */}
        <circle cx="100" cy="80" r="9" fill={color} filter="url(#neuralGlow)" />
        <circle cx="100" cy="80" r="4.5" fill="#ffffff" />

        <circle cx="125" cy="65" r="5" fill={color} />
        <circle cx="125" cy="95" r="5" fill="#ffffff" filter="url(#neuralGlow)" />
        <circle cx="155" cy="50" r="4" fill={color} />
        <circle cx="155" cy="80" r="4" fill={color} />
        <circle cx="155" cy="110" r="4" fill={color} />
      </svg>
    </div>
  );
}

// ── 3. CYBERSECURITY: CYBER SHIELD & CRYPTO MATRIX ──
function CyberShieldMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        <defs>
          <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Matrix background circuit grid */}
        <path
          d="M30 40 L60 40 L70 50 M170 40 L140 40 L130 50 M30 120 L60 120 L70 110 M170 120 L140 120 L130 110"
          stroke={color}
          strokeWidth="1.2"
          fill="none"
          opacity="0.3"
        />

        {/* Outer biometric shield */}
        <path
          d="M100 28 L142 46 C142 90 120 122 100 134 C80 122 58 90 58 46 Z"
          fill="rgba(18,10,12,0.7)"
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
          filter="url(#shieldGlow)"
        />

        {/* Inner shield inset */}
        <path
          d="M100 38 L132 52 C132 86 116 110 100 122 C84 110 68 86 68 52 Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.65"
        />

        {/* Central Cryptographic Lock Symbol */}
        <rect x="91" y="76" width="18" height="15" rx="3" fill={color} />
        <path
          d="M94 76 V69 C94 65.7 96.7 63 100 63 C103.3 63 106 65.7 106 69 V76"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="100" cy="83.5" r="2" fill="#ffffff" />
      </svg>
    </div>
  );
}

// ── 4. PHYSICAL: TREASURE-MAP GRID & RADAR COMPASS ──
function TreasureMapMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="radarSweepGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Topo map contour paths */}
        <ellipse cx="100" cy="80" rx="65" ry="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 4" />
        <ellipse cx="100" cy="80" rx="45" ry="32" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
        <ellipse cx="100" cy="80" rx="22" ry="16" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />

        {/* Crosshair axis */}
        <line x1="30" y1="80" x2="170" y2="80" stroke={color} strokeWidth="1" opacity="0.35" />
        <line x1="100" y1="25" x2="100" y2="135" stroke={color} strokeWidth="1" opacity="0.35" />

        {/* Radar sweep wedge */}
        <g className="anim-radar-spin" style={{ transformOrigin: "100px 80px" }}>
          <path d="M100 80 L145 48 A65 46 0 0 1 155 70 Z" fill="url(#radarSweepGradient)" />
          <line x1="100" y1="80" x2="155" y2="70" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
        </g>

        {/* Waypoint Beacon Pin */}
        <g className="anim-pulse-waypoint">
          <circle cx="128" cy="62" r="4.5" fill="#ffffff" />
          <circle cx="128" cy="62" r="10" fill="none" stroke={color} strokeWidth="1.5" opacity="0.8" />
          <text x="128" y="52" fill={color} fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold" textAnchor="middle">
            KEY#03
          </text>
        </g>

        {/* Compass Cardinal Marks */}
        <text x="100" y="20" fill="rgba(255,255,255,0.4)" fontFamily="var(--font-mono)" fontSize="9" textAnchor="middle">N</text>
      </svg>
    </div>
  );
}

// ── 5. CREATIVE: CINEMATIC FILM FRAME & PRISM LENS ──
function FilmFrameMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="filmGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.7" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* 2.39:1 Anamorphic Frame */}
        <rect x="36" y="38" width="128" height="84" rx="6" fill="rgba(12,6,8,0.75)" stroke={color} strokeWidth="2" />

        {/* Sprocket Holes */}
        <g fill="rgba(255,255,255,0.18)">
          <rect x="42" y="44" width="7" height="6" rx="1.5" />
          <rect x="56" y="44" width="7" height="6" rx="1.5" />
          <rect x="70" y="44" width="7" height="6" rx="1.5" />
          <rect x="84" y="44" width="7" height="6" rx="1.5" />
          <rect x="98" y="44" width="7" height="6" rx="1.5" />
          <rect x="112" y="44" width="7" height="6" rx="1.5" />
          <rect x="126" y="44" width="7" height="6" rx="1.5" />
          <rect x="140" y="44" width="7" height="6" rx="1.5" />
          <rect x="151" y="44" width="7" height="6" rx="1.5" />

          <rect x="42" y="110" width="7" height="6" rx="1.5" />
          <rect x="56" y="110" width="7" height="6" rx="1.5" />
          <rect x="70" y="110" width="7" height="6" rx="1.5" />
          <rect x="84" y="110" width="7" height="6" rx="1.5" />
          <rect x="98" y="110" width="7" height="6" rx="1.5" />
          <rect x="112" y="110" width="7" height="6" rx="1.5" />
          <rect x="126" y="110" width="7" height="6" rx="1.5" />
          <rect x="140" y="110" width="7" height="6" rx="1.5" />
          <rect x="151" y="110" width="7" height="6" rx="1.5" />
        </g>

        {/* Center Iris Play Icon */}
        <circle cx="100" cy="80" r="22" fill="none" stroke="url(#filmGlow)" strokeWidth="1.75" />
        <polygon points="94,70 112,80 94,90" fill={color} />

        {/* Optical flare streak */}
        <line x1="20" y1="80" x2="180" y2="80" stroke="url(#filmGlow)" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

// ── 6. SYMPOSIUM: HOLOGRAPHIC POLYHEDRAL MONOLITH ──
function SymposiumHologramMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        <defs>
          <filter id="holoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Hologram Projector Platform */}
        <ellipse cx="100" cy="128" rx="48" ry="12" fill="rgba(10,5,8,0.7)" stroke={color} strokeWidth="1.5" />
        <ellipse cx="100" cy="128" rx="28" ry="7" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

        {/* Light emission projection rays */}
        <polygon points="100,42 62,126 138,126" fill={color} opacity="0.08" />

        {/* Floating 3D Octahedral Crystal */}
        <g className="anim-float-gentle">
          <polygon points="100,38 128,72 100,98 72,72" fill="rgba(255,255,255,0.06)" stroke={color} strokeWidth="1.8" filter="url(#holoGlow)" />
          <line x1="100" y1="38" x2="100" y2="98" stroke="#ffffff" strokeWidth="1.5" opacity="0.9" />
          <line x1="72" y1="72" x2="128" y2="72" stroke={color} strokeWidth="1.5" />
          <circle cx="100" cy="72" r="3.5" fill="#ffffff" filter="url(#holoGlow)" />
        </g>

        {/* Orbiting data rings */}
        <ellipse cx="100" cy="72" rx="42" ry="14" fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 4" opacity="0.5" className="anim-spin-very-slow" />
      </svg>
    </div>
  );
}

// ── 7. FORUM: CONVERGING ACOUSTIC MATRIX ──
function ForumNexusMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        <circle cx="100" cy="80" r="50" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.25" />
        <circle cx="100" cy="80" r="36" fill="none" stroke={color} strokeWidth="1.2" opacity="0.45" />
        <circle cx="100" cy="80" r="22" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.75" />

        {/* Dialogue soundwave bars */}
        <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
          <line x1="82" y1="74" x2="82" y2="86" />
          <line x1="88" y1="68" x2="88" y2="92" />
          <line x1="94" y1="60" x2="94" y2="100" stroke="#ffffff" />
          <line x1="100" y1="54" x2="100" y2="106" stroke="#ffffff" />
          <line x1="106" y1="60" x2="106" y2="100" stroke="#ffffff" />
          <line x1="112" y1="68" x2="112" y2="92" />
          <line x1="118" y1="74" x2="118" y2="86" />
        </g>
      </svg>
    </div>
  );
}

// ── 8. WORKSHOP: MODULAR AI LOGIC MATRIX ──
function WorkshopMatrixMotif({ color }: { color: string }) {
  return (
    <div className="poster-art-wrapper">
      <svg
        viewBox="0 0 200 160"
        className="poster-svg-art"
        aria-hidden="true"
      >
        {/* Terminal Window Header */}
        <rect x="42" y="38" width="116" height="84" rx="6" fill="rgba(12,6,8,0.75)" stroke={color} strokeWidth="1.8" />
        <line x1="42" y1="56" x2="158" y2="56" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="52" cy="47" r="2.5" fill="#fc8181" />
        <circle cx="60" cy="47" r="2.5" fill="#f6e05e" />
        <circle cx="68" cy="47" r="2.5" fill="#68d391" />

        {/* Terminal commands and pipeline bricks */}
        <g fill="none" stroke={color} strokeWidth="1.5">
          <rect x="52" y="66" width="30" height="18" rx="3" stroke="#ffffff" />
          <rect x="94" y="66" width="30" height="18" rx="3" />
          <line x1="82" y1="75" x2="94" y2="75" stroke="#ffffff" strokeWidth="2" />
          <polygon points="90,72 94,75 90,78" fill="#ffffff" />

          {/* Deployed node */}
          <rect x="73" y="94" width="30" height="18" rx="3" fill="rgba(104,211,145,0.15)" stroke="#68d391" />
          <line x1="109" y1="84" x2="109" y2="94" />
        </g>

        <text x="56" y="79" fill="#ffffff" fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">INPUT</text>
        <text x="98" y="79" fill={color} fontFamily="var(--font-mono)" fontSize="9" fontWeight="bold">AGENT</text>
        <text x="77" y="107" fill="#68d391" fontFamily="var(--font-mono)" fontSize="8" fontWeight="bold">DEPLOY</text>
      </svg>
    </div>
  );
}
