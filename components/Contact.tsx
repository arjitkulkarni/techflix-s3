"use client";

import { useState, useCallback } from "react";
import { CONTACT, FESTIVAL } from "@/data/config";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(CONTACT.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  }, []);

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{
        paddingBlock: "var(--section-py)",
        position: "relative",
        background: "transparent",
      }}
    >
      <div className="container" style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ maxWidth: 600, marginBottom: "2.75rem" }}>
          <div className="section-label" id="contact-title">
            Transmission Channel
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            Connect with TechFlix
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
            }}
          >
            Have inquiries regarding event registrations, keynote submissions, or festival participation? Transmit your dispatch to the Season 3 organizing committee.
          </p>
        </div>

        {/* Transmission Station Enclosure */}
        <div className="contact-station-window">
          {/* Telemetry Header Bar */}
          <div className="contact-telemetry-header">
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--red-500)",
                  boxShadow: "0 0 10px var(--red-500)",
                }}
              />
              <span style={{ fontWeight: 700, color: "white" }}>TECHFLIX DISPATCH STATION</span>
              <span>· BROADCAST: S3-LIVE</span>
            </div>
            <div style={{ display: "none", alignItems: "center", gap: "1rem" }} className="md-flex">
              <span>LAT: 12.6715° N</span>
              <span>LON: 77.4243° E</span>
            </div>
          </div>

          {/* Station Body */}
          <div className="contact-station-body">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              {/* Channel 1: Email Transmission */}
              <div className="contact-channel-card">
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-md)",
                        background: "rgba(229, 9, 20, 0.12)",
                        border: "1px solid rgba(229, 9, 20, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--red-400)",
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Primary Channel
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Direct Dispatch
                  </div>
                  <div
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "white",
                      fontFamily: "var(--font-mono)",
                      wordBreak: "break-all",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {CONTACT.email}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  <a
                    href={`mailto:${CONTACT.email}?subject=TechFlix%20Season%203%20Inquiry`}
                    className="btn btn-primary"
                    style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem", flex: 1, justifyContent: "center" }}
                  >
                    Send Email
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="btn btn-secondary"
                    style={{ padding: "0.5rem 0.85rem", fontSize: "0.8125rem" }}
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Channel 2: Physical HQ */}
              <div className="contact-channel-card">
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-md)",
                        background: "rgba(229, 9, 20, 0.12)",
                        border: "1px solid rgba(229, 9, 20, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--red-400)",
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Campus Coordinates
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Festival Ground
                  </div>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "white",
                      lineHeight: 1.5,
                      marginBottom: "1.25rem",
                    }}
                  >
                    {CONTACT.address}
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Dayananda+Sagar+University+Harohalli+Bengaluru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: "0.5rem 1rem", fontSize: "0.8125rem", justifyContent: "center" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  Navigate Campus
                </a>
              </div>

              {/* Channel 3: Social Radar */}
              <div className="contact-channel-card">
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "var(--radius-md)",
                        background: "rgba(229, 9, 20, 0.12)",
                        border: "1px solid rgba(229, 9, 20, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--red-400)",
                      }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="m4.93 4.93 4.24 4.24" />
                        <path d="m14.83 9.17 4.24-4.24" />
                        <path d="m14.83 14.83 4.24 4.24" />
                        <path d="m9.17 14.83-4.24 4.24" />
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.625rem",
                        color: "var(--text-muted)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      Broadcast Radar
                    </span>
                  </div>

                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Social Feeds
                  </div>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "white",
                      lineHeight: 1.5,
                      marginBottom: "1.25rem",
                    }}
                  >
                    Follow live reel drops, rulebook releases & contestant teasers.
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {CONTACT.social.instagram && (
                    <a
                      href={CONTACT.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.8125rem", justifyContent: "center" }}
                      aria-label="Instagram profile"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                      </svg>
                      Instagram
                    </a>
                  )}

                  {CONTACT.social.linkedin && (
                    <a
                      href={CONTACT.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: "0.5rem 0.75rem", fontSize: "0.8125rem", justifyContent: "center" }}
                      aria-label="LinkedIn profile"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Official Season 3 Credits Node */}
            <div className="contact-credits-station">
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(229, 9, 20, 0.15)",
                    border: "1px solid rgba(229, 9, 20, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "0.9375rem",
                    color: "var(--red-400)",
                    flexShrink: 0,
                  }}
                >
                  TF3
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "white" }}>
                    {FESTIVAL.name} — {FESTIVAL.season}
                  </div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)", marginTop: 2 }}>
                    Presented by {FESTIVAL.organizer}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.45rem 0.85rem",
                  borderRadius: 100,
                  background: "rgba(229, 9, 20, 0.08)",
                  border: "1px solid rgba(229, 9, 20, 0.25)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--red-400)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--red-500)",
                  }}
                />
                Official Chapter Production
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
