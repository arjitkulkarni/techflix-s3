"use client";

import { SEASON2_STATS } from "@/data/config";

export default function Season2Glance() {
  return (
    <section
      aria-labelledby="s2-glance-title"
      style={{
        paddingBlock: "clamp(3rem, 5vw, 4.5rem)",
        position: "relative",
        background: "transparent",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1.75rem",
          }}
        >
          <div>
            <div className="section-label" id="s2-glance-title">
              Historical Reference
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                color: "white",
              }}
            >
              Season 2 Benchmark
            </h2>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-muted)",
                marginTop: "0.25rem",
                maxWidth: 520,
              }}
            >
              Historical figures from Season 2 provided for context. Confirmed Season 3 metrics will be announced closer to the festival.
            </p>
          </div>
          <span className="placeholder-notice" style={{ marginTop: "0.25rem" }}>
            ⚠ Season 2 Archive
          </span>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {SEASON2_STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "rgba(24, 24, 24, 0.85)",
                backdropFilter: "blur(10px)",
                border: `1px solid ${
                  stat.confirmed ? "var(--border)" : "rgba(251, 191, 36, 0.2)"
                }`,
                borderRadius: "var(--radius-lg)",
                padding: "1.25rem",
                position: "relative",
                transition: "transform 0.22s ease, border-color 0.22s ease",
              }}
            >
              {!stat.confirmed && (
                <span
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    fontSize: "0.5625rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#fbbf24",
                    background: "rgba(251, 191, 36, 0.12)",
                    border: "1px solid rgba(251, 191, 36, 0.25)",
                    padding: "0.125rem 0.375rem",
                    borderRadius: 100,
                  }}
                >
                  Review
                </span>
              )}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: stat.value ? "clamp(1.5rem, 3.5vw, 2.125rem)" : "1rem",
                  color: stat.value ? "white" : "var(--text-muted)",
                  lineHeight: 1.1,
                  marginBottom: "0.375rem",
                }}
              >
                {stat.value ?? "To be confirmed"}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: "0.6875rem",
                  color: "var(--text-muted)",
                  marginTop: "0.5rem",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                }}
              >
                {stat.note}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          Source: techflix-s2.vercel.app — Organizers should review all figures marked &quot;Review&quot; before publishing Season 3 site publicly.
        </p>
      </div>
    </section>
  );
}
