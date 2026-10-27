"use client";

import { useEffect, useRef, useState } from "react";

export default function RedCurrentTransition() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="red-current-transition"
      aria-label="The Red Current Transition to Season 3 Events"
      style={{
        position: "relative",
        paddingBlock: "clamp(3.5rem, 7vw, 6rem)",
        overflow: "hidden",
      }}
    >
      {/* Subtle cinema vignette and beam flare */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 900,
          height: 180,
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(229,9,20,0.14) 0%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Monospace Indicator */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.625rem",
            padding: "0.35rem 1rem",
            background: "rgba(229, 9, 20, 0.08)",
            border: "1px solid rgba(229, 9, 20, 0.25)",
            borderRadius: 100,
            marginBottom: "1rem",
            fontSize: "0.6875rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--red-400)",
          }}
        >
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
          <span>THE RED CURRENT • PREMIERE RAIL</span>
        </div>

        {/* Transition Header */}
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.01em",
            marginBottom: "0.75rem",
            textTransform: "uppercase",
          }}
        >
          Stream The Festival Lineup
        </h2>

        <p
          style={{
            maxWidth: 620,
            marginInline: "auto",
            fontSize: "clamp(0.875rem, 1.8vw, 1rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
          }}
        >
          Follow the continuous red current into the Season 3 arenas. Explore hackathons, AI prompt duels, cybersecurity CTFs, and keynote stages.
        </p>

        {/* Animated down-rail chevron */}
        <div
          aria-hidden="true"
          style={{
            marginTop: "1.75rem",
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.25rem",
            opacity: inView ? 0.8 : 0.3,
            transition: "opacity 0.5s ease",
          }}
        >
          <div
            style={{
              width: 1,
              height: 32,
              background: "linear-gradient(to bottom, var(--red-500), transparent)",
            }}
          />
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--red-400)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
