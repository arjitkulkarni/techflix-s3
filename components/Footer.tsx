"use client";

import { FESTIVAL, NAV_ITEMS, CONTACT } from "@/data/config";

export default function Footer() {
  const year = 2026;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const quickLinks = NAV_ITEMS.filter((n) =>
    ["#events", "#schedule", "#sponsors", "#faq"].includes(n.href)
  );

  return (
    <footer
      style={{
        background: "#040202",
        borderTop: "1px solid var(--border)",
        paddingBlock: "clamp(2.5rem, 5vw, 4rem)",
      }}
      role="contentinfo"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "0.875rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: "rgba(229,62,62,0.12)", border: "1.5px solid rgba(229,62,62,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: "var(--red-500)" }}>TF</span>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "white" }}>{FESTIVAL.name}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--red-400)", marginLeft: 6, letterSpacing: "0.15em", textTransform: "uppercase" }}>S3</span>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 280 }}>
              The flagship tech festival by DSU-ACM & Department of CSE, Dayananda Sagar University.
            </p>

            {/* Social links */}
            <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              {CONTACT.social.instagram && (
                <SocialIcon href={CONTACT.social.instagram} label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                </SocialIcon>
              )}
              {CONTACT.social.linkedin && (
                <SocialIcon href={CONTACT.social.linkedin} label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10V9h4v2" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </SocialIcon>
              )}
              {CONTACT.social.github && (
                <SocialIcon href={CONTACT.social.github} label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </SocialIcon>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-muted)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Quick Links
            </h3>
            <nav aria-label="Footer navigation">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {NAV_ITEMS.map(({ label, href }) => (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      style={{
                        background: "none", border: "none", cursor: "pointer", padding: 0,
                        color: "var(--text-muted)", fontSize: "0.875rem", textAlign: "left",
                        transition: "color var(--transition)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--text-muted)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contact
            </h3>
            <a
              href={`mailto:${CONTACT.email}`}
              style={{ color: "var(--red-400)", fontSize: "0.875rem", textDecoration: "none", display: "block", marginBottom: "0.75rem" }}
            >
              {CONTACT.email}
            </a>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
              {CONTACT.address}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            © {year} {FESTIVAL.name} · {FESTIVAL.organizer}
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.15)" }}>
            Season 3 · All details are subject to confirmation
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "rgba(255,255,255,0.06)", border: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "var(--text-muted)", transition: "all var(--transition)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(229,62,62,0.12)";
        e.currentTarget.style.borderColor = "rgba(229,62,62,0.3)";
        e.currentTarget.style.color = "var(--red-400)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.color = "var(--text-muted)";
      }}
    >
      {children}
    </a>
  );
}
