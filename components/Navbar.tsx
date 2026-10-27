"use client";

import { useState, useEffect, useCallback } from "react";
import { NAV_ITEMS, FESTIVAL } from "@/data/config";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Close menu on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
          background: scrolled ? "rgba(6,4,4,0.92)" : "linear-gradient(to bottom, rgba(6,4,4,0.85), transparent)",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
        }}
        role="banner"
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 64, paddingBlock: "0.5rem" }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            style={{ display: "flex", alignItems: "center", gap: "0.625rem", background: "none", border: "none", cursor: "pointer", padding: "0.375rem", borderRadius: 8, minHeight: 44 }}
            aria-label="TechFlix — back to top"
          >
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(229,62,62,0.15)", border: "1.5px solid rgba(229,62,62,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(229,62,62,0.2)",
            }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.875rem", color: "var(--red-500)" }}>TF</span>
            </div>
            <div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.125rem", color: "white", letterSpacing: "-0.01em" }}>{FESTIVAL.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--red-400)", marginLeft: 6, letterSpacing: "0.15em", textTransform: "uppercase", verticalAlign: "middle" }}>S3</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="desktop-nav">
            <div className="nav-pill-track">
              {NAV_ITEMS.map(({ label, href }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className={`nav-link${isActive ? " active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="nav-link-text">{label}</span>
                    {isActive && <span className="nav-light-sweep" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            style={{
              background: "none", border: "none", cursor: "pointer", padding: "0.625rem",
              color: "white", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center",
              borderRadius: 8,
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <nav
        id="mobile-nav"
        className={`mobile-nav${menuOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
      >
        <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem" }}>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: "0.5rem", minWidth: 44, minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <div style={{ marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.5rem", color: "white" }}>{FESTIVAL.name}</span>
          <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--red-400)", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.25rem" }}>{FESTIVAL.season}</span>
        </div>
        {NAV_ITEMS.map(({ label, href }, i) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            className="mobile-nav-link"
            style={{
              animationDelay: `${i * 50}ms`,
              background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left",
              color: activeSection === href.slice(1) ? "white" : "var(--text-secondary)",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--red-500)", minWidth: 28 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {label}
          </button>
        ))}
      </nav>

      <style>{`
        @media (min-width: 768px) { .mobile-menu-btn { display: none !important; } }
        @media (max-width: 767px) { .desktop-nav { display: none !important; } }
      `}</style>
    </>
  );
}
