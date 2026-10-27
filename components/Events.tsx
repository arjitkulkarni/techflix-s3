"use client";

import { useState, useCallback, useMemo } from "react";
import { EVENTS, TechFlixEvent, EventCategory } from "@/data/config";
import dynamic from "next/dynamic";
import CategoryPosterArt from "./CategoryPosterArt";

const EventDetail = dynamic(() => import("./EventDetail"), { ssr: false });

interface EventsProps {
  lineup: string[];
  onToggleLineup: (id: string) => void;
}

const ALL = "All";
const CATEGORIES: (EventCategory | typeof ALL)[] = [
  ALL,
  "Hackathon",
  "AI/ML",
  "Cybersecurity",
  "Creative",
  "Workshop",
  "Symposium",
  "Forum",
  "Physical",
];

const CATEGORY_COLORS: Record<string, string> = {
  Hackathon: "#ff3847",
  "AI/ML": "#b794f4",
  Cybersecurity: "#f6ad55",
  Creative: "#ed8936",
  Workshop: "#68d391",
  Symposium: "#63b3ed",
  Forum: "#4fd1c5",
  Physical: "#48bb78",
};

export default function Events({ lineup, onToggleLineup }: EventsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<EventCategory | typeof ALL>(ALL);
  const [selected, setSelected] = useState<TechFlixEvent | null>(null);

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const matchCat = category === ALL || e.category === category;
      const q = query.toLowerCase().trim();
      const matchQ =
        !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.tagline.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  const featuredEvent = filtered.length > 0 ? filtered[0] : null;
  const lineupEvents = filtered.length > 1 ? filtered.slice(1) : [];

  const handleCardClick = useCallback((ev: TechFlixEvent) => setSelected(ev), []);

  return (
    <section
      id="events"
      aria-labelledby="events-title"
      style={{
        paddingBlock: "var(--section-py)",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* ── Cohesive Content Layer (Centered Container) ── */}
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        
        {/* ── 1. EPISODE GUIDE HEADER ── */}
        <div style={{ marginBottom: "2.25rem" }}>
          <div className="section-label" id="events-title">
            Episode Guide
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "0.75rem",
            }}
          >
            <h2 className="section-title">Events Lineup</h2>
            
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span className="placeholder-notice">
                Sample content — S3 events TBA
              </span>
              
              {/* Compact, useful catalog status badge */}
              <div className="events-compact-status" aria-label="Catalog status">
                <span className="status-live-dot" aria-hidden="true" />
                <span>8 Episodes Cataloged</span>
                {lineup.length > 0 && (
                  <span className="status-lineup-pill">· {lineup.length} in Lineup</span>
                )}
              </div>
            </div>
          </div>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
              maxWidth: 640,
            }}
          >
            Stream upcoming episodes of TechFlix Season 3. Compete in 24-hour hackathons, solve AI prompts, capture flags, and share breakthroughs with creators across universities.
          </p>
        </div>

        {/* ── 2. FILTER CONSOLE (Search + Category Filter Controls) ── */}
        <div style={{ marginBottom: "2.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Search Bar + Matching Count Indicator */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--red-500)",
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="search"
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search episodes by title, track, or keywords…"
                aria-label="Search events by title or category"
                id="events-search"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search query"
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.12)",
                    border: "none",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Count Feedback */}
            <div
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-mono)",
                background: "var(--bg-card)",
                padding: "0.45rem 0.85rem",
                borderRadius: 100,
                border: "1px solid var(--border)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: filtered.length > 0 ? "var(--red-500)" : "var(--text-muted)",
                }}
              />
              <span>
                Showing <strong>{filtered.length}</strong> of {EVENTS.length} episodes
                {query ? ` for "${query}"` : ""}
                {category !== ALL ? ` in ${category}` : ""}
              </span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
            role="group"
            aria-label="Filter events by category"
          >
            {CATEGORIES.map((cat) => {
              const count =
                cat === ALL
                  ? EVENTS.length
                  : EVENTS.filter((e) => e.category === cat).length;
              const isSelected = category === cat;

              return (
                <button
                  key={cat}
                  className={`filter-chip${isSelected ? " active" : ""}`}
                  onClick={() => setCategory(cat)}
                  aria-pressed={isSelected}
                >
                  {cat !== ALL && (
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: CATEGORY_COLORS[cat] ?? "var(--red-400)",
                        display: "inline-block",
                      }}
                      aria-hidden="true"
                    />
                  )}
                  <span>{cat}</span>
                  <span
                    style={{
                      opacity: isSelected ? 0.9 : 0.65,
                      fontSize: "0.6875rem",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 3. FEATURED EPISODE SPOTLIGHT (Cohesive TechFlix Card) ── */}
        {featuredEvent && (
          <div style={{ marginBottom: "3rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.875rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--red-400)",
                fontWeight: 700,
              }}
            >
              <span style={{ width: 14, height: 1, background: "var(--red-500)" }} />
              Featured Episode
            </div>

            <article
              className="featured-episode-spotlight"
              aria-label={`Featured Episode: ${featuredEvent.title} — ${featuredEvent.category}`}
            >
              {/* Left: Poster Artwork with Dark Charcoal Background */}
              <div
                className="spotlight-poster-pane"
                onClick={() => handleCardClick(featuredEvent)}
                role="button"
                tabIndex={0}
                aria-label={`Open details for ${featuredEvent.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(featuredEvent);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <CategoryPosterArt
                  category={featuredEvent.category}
                  accentColor={featuredEvent.accentColor}
                />
                <div className="poster-shimmer-sweep" aria-hidden="true" />

                {/* Category Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.875rem",
                    left: "0.875rem",
                    background: "rgba(18, 18, 18, 0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    padding: "0.25rem 0.65rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: CATEGORY_COLORS[featuredEvent.category] ?? "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    zIndex: 3,
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: CATEGORY_COLORS[featuredEvent.category] ?? "var(--red-500)",
                      boxShadow: `0 0 6px ${CATEGORY_COLORS[featuredEvent.category] ?? "var(--red-500)"}`,
                    }}
                    aria-hidden="true"
                  />
                  {featuredEvent.category}
                </div>

                {/* S3 TBA Badge */}
                {featuredEvent.isPlaceholder && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.875rem",
                      right: "0.875rem",
                      background: "rgba(251, 191, 36, 0.14)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(251, 191, 36, 0.35)",
                      borderRadius: 100,
                      padding: "0.25rem 0.55rem",
                      fontSize: "0.5625rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#fbbf24",
                      zIndex: 3,
                    }}
                  >
                    S3 TBA
                  </div>
                )}
              </div>

              {/* Right: Mission Briefing Content */}
              <div className="spotlight-body-pane">
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.6875rem",
                          fontFamily: "var(--font-mono)",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--red-400)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        Spotlight Track
                      </div>
                      <h3
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                          color: "white",
                          lineHeight: 1.2,
                        }}
                      >
                        {featuredEvent.title}
                      </h3>
                    </div>

                    <button
                      className={`bookmark-btn${lineup.includes(featuredEvent.id) ? " saved" : ""}`}
                      onClick={() => onToggleLineup(featuredEvent.id)}
                      aria-label={
                        lineup.includes(featuredEvent.id)
                          ? `Remove ${featuredEvent.title} from lineup`
                          : `Save ${featuredEvent.title} to lineup`
                      }
                      aria-pressed={lineup.includes(featuredEvent.id)}
                      style={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        background: lineup.includes(featuredEvent.id)
                          ? "rgba(229, 9, 20, 0.22)"
                          : "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${
                          lineup.includes(featuredEvent.id)
                            ? "rgba(229, 9, 20, 0.5)"
                            : "var(--border)"
                        }`,
                        color: lineup.includes(featuredEvent.id) ? "var(--red-400)" : "var(--text-muted)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill={lineup.includes(featuredEvent.id) ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                  </div>

                  {/* Tagline */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      fontWeight: 500,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {featuredEvent.tagline}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {featuredEvent.longDescription || featuredEvent.description}
                  </p>

                  {/* Metadata Chips */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <MetaChip icon="📅" text={featuredEvent.day || "Day TBA"} />
                    <MetaChip icon="👥" text={featuredEvent.teamSize || "Teams TBA"} />
                    <MetaChip icon="🏆" text={featuredEvent.prize || "Prize TBA"} accent />
                  </div>
                </div>

                {/* Action Button Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCardClick(featuredEvent)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.65rem 1.5rem",
                      fontSize: "0.875rem",
                    }}
                  >
                    <span>View Mission Details</span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => onToggleLineup(featuredEvent.id)}
                    style={{
                      fontSize: "0.875rem",
                      padding: "0.65rem 1.25rem",
                    }}
                  >
                    {lineup.includes(featuredEvent.id) ? "✓ In Lineup" : "+ Add to Lineup"}
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ── 4. EPISODE LINEUP GALLERY (Remaining Events) ── */}
        {lineupEvents.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                  fontWeight: 700,
                }}
              >
                <span style={{ width: 14, height: 1, background: "var(--red-500)" }} />
                <span>Episode Lineup</span>
                <span
                  style={{
                    background: "rgba(229, 9, 20, 0.12)",
                    border: "1px solid rgba(229, 9, 20, 0.3)",
                    color: "var(--red-400)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: 100,
                    fontSize: "0.6875rem",
                  }}
                >
                  {lineupEvents.length} Episodes
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
                gap: "1.5rem",
              }}
            >
              {lineupEvents.map((ev, idx) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  index={idx + 1}
                  inLineup={lineup.includes(ev.id)}
                  onToggleLineup={onToggleLineup}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="coming-soon-state" style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{ opacity: 0.4, margin: "0 auto 1rem", display: "block" }}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" strokeDasharray="2 2" />
            </svg>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
              No episodes found
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem" }}>
              No missions found matching your filter criteria. Try adjusting your search term.
            </p>
            <button
              className="btn btn-secondary"
              style={{ marginTop: "1.25rem" }}
              onClick={() => {
                setQuery("");
                setCategory(ALL);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ── Event Detail Modal ── */}
      {selected && (
        <EventDetail
          event={selected}
          onClose={() => setSelected(null)}
          inLineup={lineup.includes(selected.id)}
          onToggleLineup={onToggleLineup}
        />
      )}
    </section>
  );
}

// ─── EVENT CARD COMPONENT ───────────────────────────────────────
interface EventCardProps {
  event: TechFlixEvent;
  index: number;
  inLineup: boolean;
  onToggleLineup: (id: string) => void;
  onClick: (ev: TechFlixEvent) => void;
}

function EventCard({ event, index, inLineup, onToggleLineup, onClick }: EventCardProps) {
  const catColor = CATEGORY_COLORS[event.category] ?? "#fff";

  return (
    <article
      className="event-card"
      onClick={() => onClick(event)}
      style={{
        animationDelay: `${Math.min(index, 8) * 45}ms`,
      } as React.CSSProperties}
      aria-label={`${event.title} — ${event.category}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(event);
        }
      }}
    >
      {/* ── Poster Area: Distinct Geometric Motif + Shimmer ── */}
      <div className="event-card-poster">
        {/* Generative Category Vector Art */}
        <CategoryPosterArt category={event.category} accentColor={event.accentColor} />

        {/* Diagonal Shimmer Sweep Light */}
        <div className="poster-shimmer-sweep" aria-hidden="true" />

        {/* Category Pill Tag */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            background: "rgba(18, 18, 18, 0.88)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--border)",
            borderRadius: 100,
            padding: "0.25rem 0.65rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: catColor,
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            zIndex: 3,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: catColor,
              boxShadow: `0 0 6px ${catColor}`,
            }}
            aria-hidden="true"
          />
          {event.category}
        </div>

        {/* S3 TBA Badge */}
        {event.isPlaceholder && (
          <div
            style={{
              position: "absolute",
              top: "0.75rem",
              right: "0.75rem",
              background: "rgba(251, 191, 36, 0.14)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(251, 191, 36, 0.35)",
              borderRadius: 100,
              padding: "0.25rem 0.55rem",
              fontSize: "0.5625rem",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fbbf24",
              zIndex: 3,
            }}
          >
            S3 TBA
          </div>
        )}

        {/* Hover Action Cue Overlay */}
        <div
          className="event-play-overlay"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(2px)",
            opacity: 0,
            transition: "opacity 0.25s ease",
            zIndex: 4,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              background: "rgba(229, 9, 20, 0.9)",
              borderRadius: 100,
              color: "white",
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            View Episode
          </div>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="event-card-body">
        {/* Title + Bookmark Button */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "0.35rem",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.125rem",
              color: "white",
              lineHeight: 1.25,
              flex: 1,
            }}
          >
            {event.title}
          </h3>

          <button
            className={`bookmark-btn${inLineup ? " saved" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleLineup(event.id);
            }}
            aria-label={inLineup ? `Remove ${event.title} from lineup` : `Save ${event.title} to lineup`}
            aria-pressed={inLineup}
            style={{
              flexShrink: 0,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              background: inLineup ? "rgba(229, 9, 20, 0.2)" : "rgba(255, 255, 255, 0.05)",
              border: `1px solid ${inLineup ? "rgba(229, 9, 20, 0.5)" : "var(--border)"}`,
              color: inLineup ? "var(--red-400)" : "var(--text-muted)",
              transition: "all 0.2s ease",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={inLineup ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            fontWeight: 500,
            marginBottom: "0.6rem",
          }}
        >
          {event.tagline}
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            marginBottom: "1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.description}
        </p>

        {/* Bottom Meta & Action */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            paddingTop: "0.875rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", alignItems: "center" }}>
            <MetaChip icon="📅" text={event.day || "Day TBA"} />
            <MetaChip icon="👥" text={event.teamSize || "Teams"} />
            <MetaChip icon="🏆" text={event.prize || "Prize TBA"} accent />
          </div>

          <span
            style={{
              color: catColor,
              fontSize: "0.8125rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              whiteSpace: "nowrap",
            }}
          >
            Details →
          </span>
        </div>
      </div>

      <style>{`
        .event-card:hover .event-play-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </article>
  );
}

function MetaChip({ icon, text, accent }: { icon: string; text: string; accent?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        fontSize: "0.6875rem",
        color: accent ? "#fbbf24" : "var(--text-muted)",
        fontFamily: "var(--font-mono)",
        fontWeight: accent ? 700 : 500,
      }}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{text}</span>
    </span>
  );
}
