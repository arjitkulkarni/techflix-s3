"use client";

import { SPONSORS, SPONSOR_INQUIRY_EMAIL, SponsorTier } from "@/data/config";

const TIER_ORDER: SponsorTier[] = ["Title", "Gold", "Silver", "Bronze", "Partner"];
const TIER_SIZES: Record<SponsorTier, number> = {
  Title: 220,
  Gold: 170,
  Silver: 140,
  Bronze: 120,
  Partner: 110,
};

const TIER_DESCRIPTIONS: Record<SponsorTier, string> = {
  Title: "Premier festival headline presenting partner",
  Gold: "Flagship track patron & arena sponsor",
  Silver: "Keynote & innovation stage partner",
  Bronze: "Workshop & technical breakout affiliate",
  Partner: "Ecosystem, community & media collaborator",
};

export default function Sponsors() {
  const confirmedSponsors = SPONSORS.filter((s) => s.confirmed && !s.isHistorical);
  const hasSponsor = confirmedSponsors.length > 0;
  const tiersUsed = TIER_ORDER.filter((t) => confirmedSponsors.some((s) => s.tier === t));

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-title"
      style={{
        paddingBlock: "var(--section-py)",
        position: "relative",
        background: "transparent",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ maxWidth: 640, marginBottom: "2.75rem" }}>
          <div className="section-label" id="sponsors-title">
            Industry Alliances
          </div>
          <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>
            Sponsors & Partners
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9375rem",
              lineHeight: 1.6,
            }}
          >
            Season 3 sponsorship negotiations and tier allocations are underway. Confirmed partners will be illuminated on the premiere stage below.
          </p>
        </div>

        {/* Cinematic Spotlight Wall */}
        <div className="spotlight-stage">
          <div className="spotlight-cone-overhead" aria-hidden="true" />

          {hasSponsor ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
              {tiersUsed.map((tier) => {
                const tierSponsors = confirmedSponsors.filter((s) => s.tier === tier);
                const tierClass = `tier-${tier.toLowerCase()}`;

                return (
                  <div key={tier} className="sponsor-tier-podium">
                    <div className="sponsor-tier-header">
                      <div className={`sponsor-tier-badge ${tierClass}`}>
                        <span className="sponsor-beam-indicator" aria-hidden="true" />
                        <span>{tier} Tier</span>
                        <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.6875rem" }}>
                          — {TIER_DESCRIPTIONS[tier]}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6875rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {tierSponsors.length} Partner{tierSponsors.length !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div
                      className="sponsor-pedestal-grid"
                      style={{
                        gridTemplateColumns: `repeat(auto-fill, minmax(${TIER_SIZES[tier]}px, 1fr))`,
                      }}
                    >
                      {tierSponsors.map((s) => (
                        <a
                          key={s.id}
                          href={s.websiteUrl ?? "#"}
                          target={s.websiteUrl ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="sponsor-pedestal-card"
                          aria-label={`${s.name} — ${tier} sponsor`}
                          onClick={!s.websiteUrl ? (e) => e.preventDefault() : undefined}
                        >
                          {s.logoPath ? (
                            <img
                              src={s.logoPath}
                              alt={s.name}
                              style={{
                                maxHeight: tier === "Title" ? 72 : 52,
                                maxWidth: "85%",
                                objectFit: "contain",
                                filter: "brightness(0) invert(1)",
                                opacity: 0.9,
                                transition: "opacity 0.2s ease",
                              }}
                            />
                          ) : (
                            <span
                              style={{
                                color: "white",
                                fontSize: "1rem",
                                fontWeight: 600,
                                letterSpacing: "0.02em",
                              }}
                            >
                              {s.name}
                            </span>
                          )}
                          <span
                            style={{
                              position: "absolute",
                              bottom: "0.5rem",
                              fontSize: "0.625rem",
                              fontFamily: "var(--font-mono)",
                              color: "var(--text-muted)",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            Confirmed
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <SponsorSpotlightStaging />
          )}

          {/* Executive Sponsorship Terminal */}
          {SPONSOR_INQUIRY_EMAIL && (
            <div className="sponsor-terminal-banner">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1.75rem",
                }}
              >
                <div style={{ maxWidth: 540 }}>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--red-400)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "0.625rem",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "var(--red-500)",
                        boxShadow: "0 0 8px var(--red-500)",
                      }}
                    />
                    Partnership Docket · Season 3
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                      color: "white",
                      marginBottom: "0.625rem",
                    }}
                  >
                    Partner with TechFlix Season 3
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                    }}
                  >
                    Showcase your brand before 1,000+ high-caliber developers, AI researchers, and student creators. Access dedicated recruiting channels, product demo stages, and hackathon challenge tracks.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: 220 }}>
                  <a
                    href={`mailto:${SPONSOR_INQUIRY_EMAIL}?subject=TechFlix%20Season%203%20Sponsorship%20Inquiry`}
                    className="btn btn-primary"
                    aria-label={`Email ${SPONSOR_INQUIRY_EMAIL} about sponsorship`}
                    style={{ justifyContent: "center", padding: "0.875rem 1.75rem" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Request Prospectus
                  </a>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--text-muted)",
                      textAlign: "center",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    Direct: {SPONSOR_INQUIRY_EMAIL}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SponsorSpotlightStaging() {
  const spotlightTiers: { tier: SponsorTier; count: number; label: string; minW: number }[] = [
    { tier: "Title", count: 1, label: "Title Presenting Partner", minW: 240 },
    { tier: "Gold", count: 2, label: "Gold Track Sponsors", minW: 180 },
    { tier: "Silver", count: 3, label: "Silver Stage Partners", minW: 140 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.75rem" }}>
      {spotlightTiers.map(({ tier, count, label, minW }) => {
        const tierClass = `tier-${tier.toLowerCase()}`;
        return (
          <div key={tier} className="sponsor-tier-podium">
            <div className="sponsor-tier-header">
              <div className={`sponsor-tier-badge ${tierClass}`}>
                <span className="sponsor-beam-indicator" aria-hidden="true" />
                <span>{tier} Podium</span>
                <span
                  style={{
                    color: "var(--text-muted)",
                    fontWeight: 400,
                    fontSize: "0.6875rem",
                    letterSpacing: "normal",
                  }}
                >
                  — {label}
                </span>
              </div>
              <span className="placeholder-notice" style={{ fontSize: "0.625rem" }}>
                Allocation in Progress
              </span>
            </div>

            <div
              className="sponsor-pedestal-grid"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(${minW}px, 1fr))`,
              }}
            >
              {[...Array(count)].map((_, i) => (
                <div key={i} className="sponsor-placeholder-pedestal">
                  <div
                    style={{
                      width: tier === "Title" ? 52 : 42,
                      height: tier === "Title" ? 52 : 42,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width={tier === "Title" ? 22 : 18}
                      height={tier === "Title" ? 22 : 18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={tier === "Title" ? "rgba(229, 9, 20, 0.6)" : "rgba(255, 255, 255, 0.2)"}
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        color: "var(--text-secondary)",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tier} Slot #{i + 1}
                    </div>
                    <div
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--text-muted)",
                        marginTop: 2,
                      }}
                    >
                      Partner Reveal TBA
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
