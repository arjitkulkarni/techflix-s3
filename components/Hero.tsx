"use client";

import { useEffect, useRef } from "react";
import { FESTIVAL, EVENTS } from "@/data/config";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Entrance transition
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, []);

  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Sample flagship events for provisional showcase
  const flagship = EVENTS[0] || {
    title: "La Casa De Code",
    category: "Hackathon",
    tagline: "Build something that matters — in 24 hours.",
    description: "A 24-hour innovation marathon where teams race to build working prototypes from scratch.",
    prize: "To be announced",
  };

  const secondaryFeatured = EVENTS[1] || {
    title: "PromptWars",
    category: "AI/ML",
    tagline: "The new frontier of building — one prompt at a time.",
    description: "A high-energy AI prompting hackathon. Solve surprise problem statements using only prompts.",
    prize: "To be announced",
  };

  return (
    <section
      id="home"
      className="hero-section"
      aria-label="TechFlix Season 3 — Hero Section"
    >
      {/* Atmospheric Streaming Gradients (WorldCanvas renders behind) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 75% 65% at 75% 30%, rgba(229,9,20,0.12) 0%, transparent 70%), radial-gradient(ellipse 55% 55% at 20% 80%, rgba(184,7,16,0.08) 0%, transparent 65%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Subtle Scan Line Effect */}
      <div
        aria-hidden="true"
        className="intro-scan-line"
        style={{ opacity: 0.25, zIndex: 2 }}
      />

      {/* Grid Pattern Overlay */}
      <div
        aria-hidden="true"
        className="grid-bg"
        style={{ position: "absolute", inset: 0, zIndex: 1, opacity: 0.03, pointerEvents: "none" }}
      />

      {/* Main Hero Container with Balanced 2-Column Grid */}
      <div
        ref={contentRef}
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          opacity: 0,
          transform: "translateY(18px)",
          transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="hero-grid">
          {/* ─── LEFT COLUMN: CORE BRANDING & PRIMARY ACTIONS ─── */}
          <div>
            {/* Live Broadcast Badge */}
            <div className="hero-broadcast-badge">
              <span className="live-pulse-dot" aria-hidden="true" />
              <span>SEASON 3 BROADCAST • {FESTIVAL.organizerShort}</span>
            </div>

            {/* Main Festival Title in bold futuristic Oxanium */}
            <h1 className="hero-title-main">
              {FESTIVAL.name}
            </h1>

            {/* Season Badge */}
            <div className="hero-season-badge" aria-label={FESTIVAL.season}>
              {FESTIVAL.season}
            </div>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(0.75rem, 1.8vw, 0.9375rem)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--red-500)",
                marginBottom: "1.25rem",
                fontWeight: 600,
              }}
            >
              {FESTIVAL.tagline}
            </p>

            {/* Descriptive Synopsis */}
            <p className="hero-synopsis">
              The flagship annual technology festival by the{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Department of Computer Science & Engineering
              </strong>{" "}
              and the{" "}
              <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                DSU-ACM Student Chapter
              </strong>
              . A multi-day innovation experience bringing together developers, designers and creators to build, compete and share ideas.
            </p>

            {/* Verified / Status Console (No invented numbers or dates) */}
            <div
              style={{
                background: "rgba(24, 24, 24, 0.8)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "1rem 1.25rem",
                marginBottom: "1.75rem",
                maxWidth: 520,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                  gap: "0.875rem",
                }}
              >
                <div>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
                    Festival Dates
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 600 }}>
                    {FESTIVAL.dates || "To be announced"}
                  </span>
                </div>
                <div>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
                    Festival Venue
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 600 }}>
                    {FESTIVAL.venue || "DSU Campus (TBA)"}
                  </span>
                </div>
                <div>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
                    Prize Pool
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--text-primary)", fontWeight: 600 }}>
                    {FESTIVAL.prizePool || "To be announced"}
                  </span>
                </div>
                <div>
                  <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>
                    Registration
                  </span>
                  <span style={{ fontSize: "0.875rem", color: "var(--red-400)", fontWeight: 600 }}>
                    Opening Soon
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons: Explore Events (primary) + About (secondary) */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
              <button
                onClick={scrollToEvents}
                className="btn btn-primary"
                style={{
                  fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
                  padding: "0.875rem 1.75rem",
                }}
                aria-label="Explore Season 3 events"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Explore Events
              </button>

              <button
                onClick={scrollToAbout}
                className="btn btn-secondary"
                style={{
                  fontSize: "clamp(0.9375rem, 2vw, 1.0625rem)",
                  padding: "0.875rem 1.5rem",
                }}
                aria-label="Learn more about TechFlix"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                About TechFlix
              </button>
            </div>

            {/* Metric Highlights Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              <MetricPill icon="⚡" label="Provisional S2 Tracks Listed" />
              <MetricPill icon="🎓" label="Dept. of CSE & DSU-ACM" />
              <MetricPill icon="📢" label="S3 Details Releasing Soon" />
            </div>
          </div>

          {/* ─── RIGHT COLUMN: STREAMING SHOWCASE HOLO-CARD ─── */}
          <div>
            <div className="hero-showcase-card">
              {/* Card Header: Stream status + Live Audio Equalizer */}
              <div className="showcase-header">
                <div className="showcase-stream-pill">
                  <span className="live-pulse-dot" aria-hidden="true" />
                  <span>STREAM PREVIEW • PROVISIONAL TRACKS</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div className="equalizer" aria-hidden="true" title="Audio frequency visualization">
                    <div className="eq-bar" />
                    <div className="eq-bar" />
                    <div className="eq-bar" />
                    <div className="eq-bar" />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    SAMPLE S2
                  </span>
                </div>
              </div>

              {/* Sample Event 1 */}
              <div
                className="showcase-event-card"
                onClick={scrollToEvents}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") scrollToEvents(); }}
                aria-label={`Sample event: ${flagship.title}. Click to view details.`}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--red-400)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    SAMPLE TRACK • {flagship.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#fbbf24",
                      background: "rgba(251,191,36,0.12)",
                      border: "1px solid rgba(251,191,36,0.25)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: 4,
                    }}
                  >
                    S3 TBA
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {flagship.title}
                </h3>

                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    marginBottom: "0.75rem",
                  }}
                >
                  {flagship.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.625rem",
                    borderTop: "1px solid var(--border)",
                    fontSize: "0.8125rem",
                  }}
                >
                  <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
                    Source: Season 2
                  </span>
                  <span style={{ color: "var(--red-400)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                    View Event Guide →
                  </span>
                </div>
              </div>

              {/* Sample Event 2 */}
              <div
                className="showcase-event-card"
                onClick={scrollToEvents}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") scrollToEvents(); }}
                aria-label={`Sample event: ${secondaryFeatured.title}. Click to view details.`}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "var(--red-400)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    SAMPLE TRACK • {secondaryFeatured.category}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#fbbf24",
                      background: "rgba(251,191,36,0.12)",
                      border: "1px solid rgba(251,191,36,0.25)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: 4,
                    }}
                  >
                    S3 TBA
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.125rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {secondaryFeatured.title}
                </h4>

                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  {secondaryFeatured.description}
                </p>
              </div>

              {/* Showcase Card Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "0.75rem",
                  fontSize: "0.8125rem",
                  color: "var(--text-muted)",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Provisional Listings
                </span>
                <button
                  onClick={scrollToEvents}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--red-500)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Browse Lineup →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Scroll Down Indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.35rem",
          zIndex: 10,
          opacity: 0.5,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Scroll Down
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ animation: "float 2s ease-in-out infinite" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}

function MetricPill({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.4rem 0.875rem",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: 100,
        fontSize: "0.8125rem",
        color: "var(--text-secondary)",
        fontWeight: 500,
      }}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </div>
  );
}
