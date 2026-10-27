"use client";

import { TechFlixEvent } from "@/data/config";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CategoryPosterArt from "./CategoryPosterArt";

const CATEGORY_COLORS: Record<string, string> = {
  Hackathon: "#ff3847",
  "AI/ML": "#a855f7",
  Cybersecurity: "#f97316",
  Creative: "#ec4899",
  Workshop: "#10b981",
  Symposium: "#3b82f6",
  Forum: "#06b6d4",
  Physical: "#eab308",
};

interface EventDetailProps {
  event: TechFlixEvent;
  onClose: () => void;
  inLineup: boolean;
  onToggleLineup: (id: string) => void;
}

export default function EventDetail({ event, onClose, inLineup, onToggleLineup }: EventDetailProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard escape & body scroll lock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!mounted) return null;

  const catColor = CATEGORY_COLORS[event.category] ?? event.accentColor ?? "#E50914";

  return createPortal(
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-detail-title"
    >
      <div className="modal-panel" tabIndex={-1}>
        {/* Poster Top Banner with Generative Art & Atmosphere */}
        <div
          style={{
            position: "relative",
            height: 180,
            overflow: "hidden",
            background: `radial-gradient(ellipse at center, ${catColor}25 0%, #101010 100%)`,
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Generative Category Vector Art in poster background */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.85 }}>
            <CategoryPosterArt category={event.category} accentColor={catColor} />
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #141414 0%, transparent 70%)",
            }}
          />

          {/* Close button with prominent contrast */}
          <button
            onClick={onClose}
            aria-label="Close event details"
            className="modal-close-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* S3 TBA Badge */}
          {event.isPlaceholder && (
            <span
              style={{
                position: "absolute",
                top: "1rem",
                left: "1.25rem",
                background: "rgba(251, 191, 36, 0.15)",
                color: "#fbbf24",
                border: "1px solid rgba(251, 191, 36, 0.35)",
                padding: "0.25rem 0.65rem",
                borderRadius: 100,
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                backdropFilter: "blur(6px)",
              }}
            >
              Sample — S3 details TBA
            </span>
          )}
        </div>

        {/* Modal Scrollable Content Body */}
        <div style={{ padding: "1.75rem 2rem", flex: 1, overflowY: "auto" }}>
          {/* Category Tag */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem" }}>
            <span
              style={{
                background: `${catColor}18`,
                color: catColor,
                border: `1px solid ${catColor}44`,
                padding: "0.25rem 0.75rem",
                borderRadius: 100,
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: catColor,
                  boxShadow: `0 0 6px ${catColor}`,
                }}
                aria-hidden="true"
              />
              {event.category}
            </span>

            {event.id === "la-casa-de-code" && (
              <span
                style={{
                  background: "rgba(229, 9, 20, 0.12)",
                  color: "var(--red-400)",
                  border: "1px solid rgba(229, 9, 20, 0.3)",
                  padding: "0.25rem 0.65rem",
                  borderRadius: 100,
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Featured Premiere
              </span>
            )}
          </div>

          {/* Title */}
          <h2
            id="event-detail-title"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
              color: "#ffffff",
              margin: "0 0 0.35rem 0",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            {event.title}
          </h2>

          {/* Tagline */}
          <p
            style={{
              color: catColor,
              fontSize: "1rem",
              fontWeight: 600,
              margin: "0 0 1.25rem 0",
            }}
          >
            {event.tagline}
          </p>

          {/* Long Description */}
          <p
            style={{
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              fontSize: "0.9375rem",
              margin: "0 0 1.75rem 0",
            }}
          >
            {event.longDescription}
          </p>

          {/* Meta Fields Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
          >
            <MetaField label="Schedule Day" value={event.day} icon="📅" />
            <MetaField label="Timing" value={event.time} icon="⏰" />
            <MetaField label="Team Size" value={event.teamSize} icon="👥" />
            <MetaField label="Prize Pool" value={event.prize} icon="🏆" />
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              gap: "0.875rem",
              flexWrap: "wrap",
              alignItems: "center",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ flex: "1 1 200px" }}
              >
                Register for this event
              </a>
            ) : (
              <div
                className="btn btn-secondary"
                style={{
                  flex: "1 1 200px",
                  cursor: "default",
                  opacity: 0.7,
                  justifyContent: "center",
                }}
                aria-disabled="true"
              >
                Registration opens soon
              </div>
            )}

            <button
              onClick={() => onToggleLineup(event.id)}
              className={`btn ${inLineup ? "btn-primary" : "btn-secondary"}`}
              style={{ flex: "1 1 160px", gap: "0.5rem" }}
              aria-label={inLineup ? "Remove from my festival lineup" : "Add to my festival lineup"}
              aria-pressed={inLineup}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={inLineup ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span>{inLineup ? "In My Lineup" : "Add to Lineup"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function MetaField({ label, value, icon }: { label: string; value: string | null; icon: string }) {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "0.75rem 0.875rem",
      }}
    >
      <div
        style={{
          fontSize: "0.6875rem",
          color: "var(--text-muted)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "0.25rem",
          display: "flex",
          alignItems: "center",
          gap: "0.35rem",
        }}
      >
        <span>{icon}</span>
        <span>{label}</span>
      </div>
      <div
        style={{
          fontSize: "0.875rem",
          color: value ? "#ffffff" : "var(--text-muted)",
          fontWeight: value ? 600 : 400,
        }}
      >
        {value ?? "TBA"}
      </div>
    </div>
  );
}
