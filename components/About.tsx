"use client";

import { useState } from "react";
import { ABOUT, FESTIVAL } from "@/data/config";

const NARRATIVE_SCENES = [
  {
    id: "scene-1",
    num: "01",
    title: "24-Hour Innovation Marathon",
    subtitle: "La Casa De Code",
    desc: "Builders and engineers lock into an all-night prototype sprint. Ideas turn into working products before sunrise.",
    icon: "⚡",
    tag: "Flagship Sprint",
  },
  {
    id: "scene-2",
    num: "02",
    title: "Capture The Flag Arena",
    subtitle: "CYBERANARCHY",
    desc: "Security analysts, reverse engineers, and ethical hackers compete live on real jeopardy exploitation vectors.",
    icon: "🔐",
    tag: "Live CTF Arena",
  },
  {
    id: "scene-3",
    num: "03",
    title: "Prompt Engineering & AI Agents",
    subtitle: "PromptWars & Build with AI",
    desc: "Live algorithmic prompts and zero-to-deployed AI agent workshops. Exploring autonomy and generative intelligence.",
    icon: "🤖",
    tag: "AI Sandbox",
  },
  {
    id: "scene-4",
    num: "04",
    title: "Research & Cinema Showcase",
    subtitle: "Future Front & Hellfire Reels",
    desc: "Student research presentations alongside fast-turnaround AI-assisted short film premieres on the auditorium screen.",
    icon: "🎬",
    tag: "Symposium & Reels",
  },
];

export default function About() {
  const [activeScene, setActiveScene] = useState(0);

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      style={{
        paddingBlock: "var(--section-py)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="about-grid">
          {/* Left Column: Narrative Headline & Mission */}
          <div style={{ maxWidth: 580 }}>
            <div className="section-label" id="about-title">About the Festival</div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.1rem, 4.5vw, 3.5rem)",
                lineHeight: 1.08,
                color: "white",
                marginBottom: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              {ABOUT.headline}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {ABOUT.body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  style={{
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                    fontSize: "0.98rem",
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Organizer Credential Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1rem",
                marginTop: "2.5rem",
              }}
            >
              <OrgCard
                icon="⚡"
                badge="Student Body"
                title="DSU-ACM Student Chapter"
                desc="The official ACM Student Chapter at Dayananda Sagar University driving technical culture, hackathons, and industry mentorship."
              />
              <OrgCard
                icon="🎓"
                badge="Academic Patron"
                title="Dept. of CSE, DSU"
                desc="Department of Computer Science & Engineering at Dayananda Sagar University, Harohalli — fostering engineering excellence and applied research."
              />
            </div>
          </div>

          {/* Right Column: Interactive Visual Story Reel */}
          <div>
            <div className="story-reel-card">
              {/* Card Header: Live Transmission Reel Header */}
              <div className="story-reel-header">
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span className="story-reel-live-dot" aria-hidden="true" />
                  <span className="story-reel-label">TechFlix Transmission Storyboard</span>
                </div>
                <span className="story-reel-season">Season 3 Chronicle</span>
              </div>

              {/* Scene Display Window */}
              <div className="story-reel-screen">
                <div className="story-scene-badge">
                  <span>{NARRATIVE_SCENES[activeScene].tag}</span>
                </div>

                <div className="story-scene-emblem" aria-hidden="true">
                  <span>{NARRATIVE_SCENES[activeScene].icon}</span>
                </div>

                <div className="story-scene-meta">
                  <div className="story-scene-num">Scene {NARRATIVE_SCENES[activeScene].num}</div>
                  <h3 className="story-scene-title">{NARRATIVE_SCENES[activeScene].title}</h3>
                  <div className="story-scene-sub">{NARRATIVE_SCENES[activeScene].subtitle}</div>
                  <p className="story-scene-desc">{NARRATIVE_SCENES[activeScene].desc}</p>
                </div>
              </div>

              {/* Scene Navigation Strip */}
              <div className="story-reel-strip" role="tablist" aria-label="TechFlix story scenes">
                {NARRATIVE_SCENES.map((scene, idx) => {
                  const isSelected = activeScene === idx;
                  return (
                    <button
                      key={scene.id}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveScene(idx)}
                      className={`story-strip-btn ${isSelected ? "active" : ""}`}
                    >
                      <span className="story-strip-num">{scene.num}</span>
                      <span className="story-strip-title">{scene.subtitle}</span>
                      {isSelected && <span className="story-strip-indicator" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: center;
        }
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 1.1fr 0.9fr;
          }
        }

        /* ── Storyboard Reel Card ── */
        .story-reel-card {
          background: #141414;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(229, 9, 20, 0.08);
          position: relative;
        }

        .story-reel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background: rgba(20, 10, 12, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .story-reel-live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--red-500);
          box-shadow: 0 0 8px var(--red-500);
          animation: pulse-dot 2s infinite;
        }

        .story-reel-label {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #ffffff;
        }

        .story-reel-season {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--red-400);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .story-reel-screen {
          padding: 2.25rem 2rem;
          position: relative;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          background: radial-gradient(circle at 80% 20%, rgba(229, 9, 20, 0.12) 0%, transparent 65%), #111111;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
        }

        .story-scene-badge {
          position: absolute;
          top: 1.25rem;
          left: 1.5rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--red-400);
          background: rgba(229, 9, 20, 0.14);
          border: 1px solid rgba(229, 9, 20, 0.3);
          padding: 0.25rem 0.6rem;
          border-radius: 100px;
        }

        .story-scene-emblem {
          position: absolute;
          top: 1.25rem;
          right: 1.5rem;
          font-size: 2.5rem;
          opacity: 0.35;
          filter: drop-shadow(0 0 12px rgba(229, 9, 20, 0.4));
          transition: transform 0.3s ease;
        }
        .story-reel-card:hover .story-scene-emblem {
          transform: scale(1.15) rotate(5deg);
          opacity: 0.7;
        }

        .story-scene-meta {
          position: relative;
          z-index: 2;
        }

        .story-scene-num {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.1em;
          margin-bottom: 0.35rem;
        }

        .story-scene-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .story-scene-sub {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          color: var(--red-400);
          margin-bottom: 0.65rem;
          font-weight: 600;
        }

        .story-scene-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
          max-width: 480px;
        }

        /* ── Scene Navigation Strip ── */
        .story-reel-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          background: rgba(14, 14, 14, 0.95);
        }

        .story-strip-btn {
          padding: 0.875rem 0.75rem;
          background: transparent;
          border: none;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
          position: relative;
          transition: background-color 0.2s ease;
          text-align: left;
        }
        .story-strip-btn:last-child {
          border-right: none;
        }
        .story-strip-btn:hover {
          background: rgba(255, 255, 255, 0.04);
        }
        .story-strip-btn.active {
          background: rgba(229, 9, 20, 0.08);
        }

        .story-strip-num {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          color: var(--text-muted);
        }
        .story-strip-btn.active .story-strip-num {
          color: var(--red-400);
        }

        .story-strip-title {
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .story-strip-btn.active .story-strip-title {
          color: #ffffff;
        }

        .story-strip-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--red-500);
          box-shadow: 0 0 8px var(--red-500);
        }
      `}</style>
    </section>
  );
}

function OrgCard({ icon, badge, title, desc }: { icon: string; badge: string; title: string; desc: string }) {
  return (
    <div
      style={{
        background: "#181818",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "1.25rem",
        transition: "border-color 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.22s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(229, 9, 20, 0.4)";
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(229, 9, 20, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <span style={{ fontSize: "1.5rem" }} aria-hidden="true">{icon}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--red-400)",
            background: "rgba(229, 9, 20, 0.1)",
            border: "1px solid rgba(229, 9, 20, 0.25)",
            padding: "0.15rem 0.45rem",
            borderRadius: 100,
          }}
        >
          {badge}
        </span>
      </div>
      <h3 style={{ fontWeight: 700, fontSize: "0.9375rem", color: "white", marginBottom: "0.35rem" }}>
        {title}
      </h3>
      <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>
        {desc}
      </p>
    </div>
  );
}
