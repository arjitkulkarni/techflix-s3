"use client";

import { useEffect } from "react";
import { EVENTS } from "@/data/config";

interface LineupProps {
  lineup: string[];
  onToggle: (id: string) => void;
  onClear: () => void;
  open: boolean;
  onClose: () => void;
}

export default function Lineup({ lineup, onToggle, onClear, open, onClose }: LineupProps) {
  const savedEvents = EVENTS.filter((e) => lineup.includes(e.id));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (open && e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Check for schedule conflicts (simple: same day, both have days)
  const conflicts: string[] = [];
  for (let i = 0; i < savedEvents.length; i++) {
    for (let j = i + 1; j < savedEvents.length; j++) {
      const a = savedEvents[i], b = savedEvents[j];
      if (a.day && b.day && a.day === b.day && a.time && b.time && a.time === b.time) {
        if (!conflicts.includes(a.id)) conflicts.push(a.id);
        if (!conflicts.includes(b.id)) conflicts.push(b.id);
      }
    }
  }

  return (
    <>
      {/* FAB */}
      <button
        className="lineup-fab"
        onClick={open ? onClose : () => {}}
        aria-label={`My lineup — ${lineup.length} event${lineup.length !== 1 ? "s" : ""} saved`}
        aria-expanded={open}
        aria-controls="lineup-panel"
        style={{ display: "none" }}
      />

      {/* Panel */}
      <div
        id="lineup-panel"
        className={`lineup-panel${open ? " open" : ""}`}
        role="region"
        aria-label="My lineup"
        aria-hidden={!open}
      >
        <div style={{ padding: "1.5rem", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.25rem", color: "white" }}>
                My Lineup
              </h2>
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                Saved on your device · {savedEvents.length} event{savedEvents.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {savedEvents.length > 0 && (
                <button className="btn btn-ghost" style={{ fontSize: "0.8125rem", padding: "0.5rem 1rem", minHeight: 40 }} onClick={onClear} aria-label="Clear all saved events">
                  Clear all
                </button>
              )}
              <button onClick={onClose} aria-label="Close lineup panel" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
          </div>

          {/* About this feature */}
          <div style={{ marginTop: "0.75rem", padding: "0.625rem 0.875rem", background: "rgba(229,62,62,0.06)", border: "1px solid rgba(229,62,62,0.15)", borderRadius: "var(--radius-sm)", fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginTop: 1, flexShrink: 0, color: "var(--red-400)" }} aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
            Your lineup is saved in your browser only — no account or personal data is collected.
          </div>
        </div>

        <div style={{ padding: "1rem 1.5rem" }}>
          {savedEvents.length === 0 ? (
            <div className="coming-soon-state" style={{ padding: "2rem" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ opacity: 0.3, margin: "0 auto 0.75rem", display: "block" }} aria-hidden="true">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <h3 style={{ fontSize: "1rem" }}>No events saved yet</h3>
              <p>Tap the bookmark icon on any event card to add it to your lineup.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {savedEvents.map((ev) => {
                const isConflict = conflicts.includes(ev.id);
                return (
                  <div
                    key={ev.id}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.875rem",
                      padding: "0.875rem", borderRadius: "var(--radius-md)",
                      background: isConflict ? "rgba(239,68,68,0.07)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isConflict ? "rgba(239,68,68,0.3)" : "var(--border)"}`,
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: "var(--radius-sm)",
                      background: `${ev.accentColor}22`, border: `1px solid ${ev.accentColor}33`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.125rem", flexShrink: 0,
                    }}>
                      {({ Hackathon: "⚡", "AI/ML": "🤖", Cybersecurity: "🔐", Creative: "🎬", Workshop: "🛠", Symposium: "📊", Forum: "💬", Physical: "🗺" } as Record<string, string>)[ev.category] ?? "✦"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "white", fontSize: "0.9375rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                        {ev.day ?? "Day TBA"} {ev.time ? `· ${ev.time}` : ""}
                      </div>
                      {isConflict && (
                        <div style={{ fontSize: "0.6875rem", color: "#fc8181", marginTop: "0.25rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                          ⚠ Schedule conflict
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onToggle(ev.id)}
                      aria-label={`Remove ${ev.title} from lineup`}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: "0.375rem", color: "var(--text-muted)", transition: "color var(--transition)", borderRadius: 4 }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

interface LineupFABProps {
  count: number;
  onClick: () => void;
}
export function LineupFAB({ count, onClick }: LineupFABProps) {
  return (
    <button
      className="lineup-fab"
      onClick={onClick}
      aria-label={`Open my lineup — ${count} event${count !== 1 ? "s" : ""} saved`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill={count > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {count > 0 && <span className="lineup-count" aria-hidden="true">{count}</span>}
    </button>
  );
}
