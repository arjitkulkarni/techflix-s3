"use client";

import { useState, useEffect, useRef } from "react";
import { SCHEDULE } from "@/data/config";

const TYPE_CONFIG: Record<string, { label: string; color: string; badgeClass: string; icon: string }> = {
  event: {
    label: "Festival Event",
    color: "#E50914",
    badgeClass: "sched-badge-event",
    icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  activity: {
    label: "Program Activity",
    color: "#A3A3A3",
    badgeClass: "sched-badge-activity",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  break: {
    label: "Break & Hospitality",
    color: "#737373",
    badgeClass: "sched-badge-break",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
};

export default function Schedule() {
  return (
    <section
      id="schedule"
      aria-labelledby="schedule-title"
      style={{
        paddingBlock: "var(--section-py)",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header - Left Aligned to Container */}
        <div style={{ maxWidth: 680, marginBottom: "2rem" }}>
          <div className="section-label" id="schedule-title">Programming Guide</div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            Festival Schedule
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
            The premiere timeline for TechFlix Season 3. Dates, session times and venues below are representative placeholders and will be finalized prior to the event.
          </p>
        </div>

        {SCHEDULE.length === 0 ? <ScheduleComingSoon /> : <PremiereTimeline />}
      </div>
    </section>
  );
}

/* ─── COMING SOON SKELETON ─────────────────────────────────── */
function ScheduleComingSoon() {
  return (
    <div style={{ display: "grid", gap: "1.25rem" }}>
      {["Day 1", "Day 2", "Day 3"].map((day) => (
        <div
          key={day}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "var(--text-muted)" }}>
              {day}
            </span>
            <span className="placeholder-notice">Schedule TBA</span>
          </div>
          <div style={{ width: "45%", height: 12, background: "rgba(255,255,255,0.05)", borderRadius: 4 }} />
        </div>
      ))}
    </div>
  );
}

/* ─── PREMIERE TIMELINE COMPONENT ───────────────────────────── */
function PremiereTimeline() {
  const [activeDayIdx, setActiveDayIdx] = useState(0);
  const daySectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useRef(false);

  useEffect(() => {
    prefersReduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Day scroll-spy
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    daySectionRefs.current.forEach((el, idx) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveDayIdx(idx);
          }
        },
        { threshold: 0.25, rootMargin: "-10% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Panel scroll-in reveal
  useEffect(() => {
    if (prefersReduced.current) {
      document.querySelectorAll(".sched-entry").forEach((el) => el.classList.add("revealed"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.01, rootMargin: "350px 0px 300px 0px" }
    );
    document.querySelectorAll(".sched-entry").forEach((el) => obs.observe(el));

    // Safety fallback: ensure all entries are revealed if scroll observer doesn't trigger
    const timer = setTimeout(() => {
      document.querySelectorAll(".sched-entry").forEach((el) => el.classList.add("revealed"));
    }, 1200);

    return () => {
      obs.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const scrollToDay = (idx: number) => {
    setActiveDayIdx(idx);
    const target = daySectionRefs.current[idx];
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <div className="sched-wrapper">
      {/* ── Day Navigation Bar (Left aligned with container) ── */}
      <nav aria-label="Festival Days" className="sched-day-nav">
        {SCHEDULE.map((day, idx) => {
          const isActive = activeDayIdx === idx;
          return (
            <button
              key={day.id}
              onClick={() => scrollToDay(idx)}
              aria-current={isActive ? "true" : undefined}
              className={`sched-day-btn ${isActive ? "active" : ""}`}
            >
              <div className="sched-day-btn-top">
                <span className="sched-day-btn-name">{day.day}</span>
                <span className="sched-day-btn-badge">{day.items.length} sessions</span>
              </div>
              <span className="sched-day-btn-theme">{day.dayLabel}</span>
              {day.date && <span className="sched-day-btn-date">{day.date}</span>}
              {!day.date && <span className="sched-day-btn-date">Date TBA</span>}
            </button>
          );
        })}
      </nav>

      {/* ── Days Program Flow ── */}
      <div className="sched-days-flow">
        {SCHEDULE.map((day, dayIdx) => (
          <div
            key={day.id}
            ref={(el) => { daySectionRefs.current[dayIdx] = el; }}
            className="sched-day-block"
            id={`schedule-${day.id}`}
          >
            {/* Left-Aligned Clean Day Header */}
            <div className="sched-day-heading">
              <div className="sched-day-heading-left">
                <span className="sched-day-pill">{day.day}</span>
                <h3 className="sched-day-title">{day.dayLabel}</h3>
              </div>
              <div className="sched-day-heading-meta">
                <span className="sched-status-tag">
                  {day.date ? day.date : "Date TBA · Season 3"}
                </span>
                <span className="sched-meta-divider" aria-hidden="true">•</span>
                <span className="sched-count-tag">{day.items.length} scheduled sessions</span>
              </div>
            </div>

            {/* Left-Anchored Timeline Stream */}
            <div className="sched-stream">
              {/* Continuous vertical red line with moving pulse */}
              <div className="sched-track-spine" aria-hidden="true">
                <div className="sched-track-line" />
                <div className="sched-travel-pulse" />
              </div>

              {/* Sessions List */}
              <div className="sched-items-column">
                {day.items.map((item, itemIdx) => {
                  const tc = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.activity;
                  const isBreak = item.type === "break";

                  return (
                    <div
                      key={itemIdx}
                      className={`sched-entry sched-entry--${item.type}`}
                      style={{ "--accent-color": tc.color } as React.CSSProperties}
                    >
                      {/* Left Anchor: Time Stamp */}
                      <div className="sched-time-slot">
                        <time className="sched-time-text">{item.time ?? "TBA"}</time>
                      </div>

                      {/* Middle Anchor: Node on the Spine */}
                      <div className="sched-node-slot" aria-hidden="true">
                        <div className={`sched-node sched-node--${item.type}`}>
                          <div className="sched-node-core" />
                        </div>
                      </div>

                      {/* Right Area: Session Card */}
                      <div className="sched-card-slot">
                        <article className={`sched-card sched-card--${item.type}`} data-time={item.time ?? "TBA"}>
                          {/* Card Header Tags */}
                          <div className="sched-card-top">
                            <div className="sched-card-badges">
                              <span className={`sched-type-tag ${tc.badgeClass}`}>
                                <svg
                                  className="sched-type-icon"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  aria-hidden="true"
                                >
                                  <path d={tc.icon} />
                                </svg>
                                {tc.label}
                              </span>

                              {item.eventId && (
                                <span className="sched-event-tag">
                                  Linked Episode
                                </span>
                              )}
                            </div>

                            {item.location && (
                              <div className="sched-location-tag">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  aria-hidden="true"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{item.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Session Title */}
                          <h4 className="sched-card-heading">
                            {item.title}
                          </h4>

                          {/* Session Description */}
                          {item.description && (
                            <p className="sched-card-desc">{item.description}</p>
                          )}

                          {/* Quick Link to Events Section if linked */}
                          {item.eventId && (
                            <div className="sched-card-actions">
                              <a href="#events" className="sched-card-link">
                                <span>View in Episodes Lineup</span>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </article>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* ── Wrapper & Layout ── */
        .sched-wrapper {
          width: 100%;
        }

        /* ── Day Navigation Bar ── */
        .sched-day-nav {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.875rem;
          margin-bottom: 3.5rem;
          max-width: 900px;
        }

        .sched-day-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.25rem;
          padding: 0.875rem 1.25rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          position: relative;
          overflow: hidden;
        }
        .sched-day-btn:hover {
          border-color: rgba(229, 9, 20, 0.45);
          background: #1c1c1c;
          transform: translateY(-2px);
        }
        .sched-day-btn.active {
          border-color: var(--red-500);
          background: rgba(229, 9, 20, 0.08);
          box-shadow: 0 4px 20px rgba(229, 9, 20, 0.2);
        }
        .sched-day-btn.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--red-500);
          box-shadow: 0 0 8px var(--red-500);
        }

        .sched-day-btn-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .sched-day-btn-name {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.0625rem;
          color: #ffffff;
        }
        .sched-day-btn.active .sched-day-btn-name {
          color: var(--red-400);
        }
        .sched-day-btn-badge {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-muted);
          background: rgba(255,255,255,0.05);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }
        .sched-day-btn-theme {
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-secondary);
        }
        .sched-day-btn-date {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }

        /* ── Day Block ── */
        .sched-days-flow {
          display: flex;
          flex-direction: column;
          gap: 4.5rem;
        }

        .sched-day-block {
          scroll-margin-top: 5rem;
        }

        /* ── Clean Left-Aligned Day Header ── */
        .sched-day-heading {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .sched-day-heading-left {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        .sched-day-pill {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(229, 9, 20, 0.16);
          color: var(--red-400);
          border: 1px solid rgba(229, 9, 20, 0.35);
          padding: 0.25rem 0.7rem;
          border-radius: 100px;
        }

        .sched-day-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          letter-spacing: -0.01em;
        }

        .sched-day-heading-meta {
          display: flex;
          align-items: center;
          gap: 0.625rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .sched-status-tag {
          color: var(--text-secondary);
        }
        .sched-meta-divider {
          color: rgba(255,255,255,0.2);
        }
        .sched-count-tag {
          color: var(--text-muted);
        }

        /* ── Left-Anchored Timeline Stream ── */
        .sched-stream {
          position: relative;
          padding-left: 0;
        }

        /* Continuous Spine Line positioned left */
        .sched-track-spine {
          position: absolute;
          left: 110px; /* Aligned with node column */
          top: 18px;
          bottom: 24px;
          width: 28px;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 1;
        }

        .sched-track-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(
            to bottom,
            rgba(229, 9, 20, 0.7) 0%,
            rgba(229, 9, 20, 0.3) 15%,
            rgba(229, 9, 20, 0.3) 85%,
            rgba(229, 9, 20, 0.1) 100%
          );
        }

        /* Gentle traveling pulse down the timeline */
        .sched-travel-pulse {
          position: absolute;
          left: 50%;
          top: 0%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 36px;
          border-radius: 3px;
          background: linear-gradient(to bottom, transparent, #e50914, transparent);
          box-shadow: 0 0 12px 2px rgba(229, 9, 20, 0.65);
          animation: travel-down 6.5s ease-in-out infinite;
        }

        @keyframes travel-down {
          0% {
            top: 2%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 98%;
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sched-travel-pulse {
            display: none !important;
            animation: none !important;
          }
        }

        /* ── Items Column ── */
        .sched-items-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          z-index: 2;
        }

        /* ── Individual Session Row ── */
        .sched-entry {
          display: grid;
          grid-template-columns: 96px 28px 1fr;
          align-items: flex-start;
          gap: 0;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sched-entry.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .sched-entry {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        /* Time slot (Left column) */
        .sched-time-slot {
          padding-top: 1rem;
          padding-right: 1.25rem;
          text-align: right;
        }
        .sched-time-text {
          font-family: var(--font-mono);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .sched-entry--event .sched-time-text {
          color: #f5f5f1;
        }

        /* Node slot (Middle spine column) */
        .sched-node-slot {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 1.125rem;
          position: relative;
          z-index: 2;
        }
        .sched-node {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--bg-base);
          border: 2px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .sched-node-core {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
        }

        .sched-node--event {
          border-color: var(--red-500);
          box-shadow: 0 0 10px rgba(229, 9, 20, 0.5);
        }
        .sched-node--event .sched-node-core {
          background: var(--red-500);
        }

        .sched-entry:hover .sched-node {
          transform: scale(1.25);
          border-color: var(--red-400);
          box-shadow: 0 0 14px rgba(229, 9, 20, 0.7);
        }

        /* Card slot (Right column filling remaining width) */
        .sched-card-slot {
          padding-left: 1.25rem;
        }

        .sched-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 1.125rem 1.375rem;
          transition: border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      background-color 0.2s ease,
                      box-shadow 0.2s ease,
                      transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .sched-card:hover {
          border-color: rgba(229, 9, 20, 0.4);
          background: #1a1a1a;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45), 0 0 16px rgba(229, 9, 20, 0.08);
          transform: translateX(4px);
        }

        .sched-card--break {
          background: rgba(255, 255, 255, 0.015);
          border-style: dashed;
        }
        .sched-card--break:hover {
          border-color: rgba(255, 255, 255, 0.15);
          transform: none;
          box-shadow: none;
        }

        /* Card Header & Badges */
        .sched-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.625rem;
        }
        .sched-card-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .sched-type-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
        }
        .sched-type-icon {
          width: 10px;
          height: 10px;
        }

        .sched-badge-event {
          background: rgba(229, 9, 20, 0.14);
          color: var(--red-400);
          border: 1px solid rgba(229, 9, 20, 0.3);
        }
        .sched-badge-activity {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-secondary);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .sched-badge-break {
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-muted);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .sched-event-tag {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          font-weight: 600;
          color: rgba(229, 9, 20, 0.8);
          background: rgba(229, 9, 20, 0.06);
          border: 1px solid rgba(229, 9, 20, 0.2);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .sched-location-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        /* Card Content */
        .sched-card-heading {
          font-family: var(--font-display);
          font-size: 1.0625rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.4rem 0;
          line-height: 1.35;
        }
        .sched-card--break .sched-card-heading {
          font-size: 0.9375rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .sched-card-desc {
          font-size: 0.84375rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
          max-width: 820px;
        }

        .sched-card-actions {
          margin-top: 0.75rem;
          padding-top: 0.625rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .sched-card-link {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          font-weight: 600;
          color: var(--red-400);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: gap 0.15s ease, color 0.15s ease;
        }
        .sched-card-link:hover {
          color: var(--red-300);
          gap: 0.6rem;
        }

        /* ── Mobile Responsive (< 768px) ── */
        @media (max-width: 768px) {
          .sched-day-nav {
            grid-template-columns: 1fr;
            gap: 0.625rem;
            margin-bottom: 2.5rem;
          }

          .sched-day-heading {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .sched-track-spine {
            left: 12px;
          }

          .sched-entry {
            grid-template-columns: 24px 1fr;
            grid-template-rows: auto;
            position: relative;
          }

          .sched-time-slot {
            display: none; /* Time will be displayed inside card top on mobile */
          }

          .sched-node-slot {
            grid-column: 1;
            padding-top: 0.875rem;
          }

          .sched-card-slot {
            grid-column: 2;
            padding-left: 0.75rem;
          }

          .sched-card {
            padding: 0.875rem 1rem;
          }

          .sched-card-heading {
            font-size: 0.9375rem;
          }

          /* In mobile, inject the time clearly above the card heading */
          .sched-card::before {
            content: attr(data-time);
            display: block;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            font-weight: 700;
            color: var(--red-400);
            margin-bottom: 0.35rem;
            letter-spacing: 0.04em;
          }
        }
      `}</style>
    </div>
  );
}
