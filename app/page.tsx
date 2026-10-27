"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RedCurrentTransition from "@/components/RedCurrentTransition";
import Season2Glance from "@/components/Season2Glance";
import Events from "@/components/Events";
import Schedule from "@/components/Schedule";
import Sponsors from "@/components/Sponsors";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Lineup, { LineupFAB } from "@/components/Lineup";

const Intro = dynamic(() => import("@/components/Intro"), { ssr: false });
const WorldCanvas = dynamic(() => import("@/components/WorldCanvas"), { ssr: false });

const LINEUP_STORAGE_KEY = "techflix_s3_lineup";

function useLineup() {
  const [lineup, setLineup] = useState<string[]>([]);
  const loaded = useRef(false);

  useEffect(() => {
    if (!loaded.current) {
      try {
        const stored = localStorage.getItem(LINEUP_STORAGE_KEY);
        if (stored) setLineup(JSON.parse(stored));
      } catch {}
      loaded.current = true;
    }
  }, []);

  const save = useCallback((next: string[]) => {
    setLineup(next);
    try { localStorage.setItem(LINEUP_STORAGE_KEY, JSON.stringify(next)); } catch {}
  }, []);

  const toggle = useCallback(
    (id: string) => save(lineup.includes(id) ? lineup.filter((x) => x !== id) : [...lineup, id]),
    [lineup, save]
  );

  const clear = useCallback(() => save([]), [save]);

  return { lineup, toggle, clear };
}

// Intersection observer for fade-up sections
function useSectionObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".fade-up-section");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [lineupOpen, setLineupOpen] = useState(false);

  const { lineup, toggle: toggleLineup, clear: clearLineup } = useLineup();
  useSectionObserver();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const isPreview = params.get("intro") === "1" || params.get("intro") === "true";
      const alreadySeen = sessionStorage.getItem("techflix_s3_intro_seen");

      if (alreadySeen && !isPreview) {
        setShowIntro(false);
        setIntroDone(true);
      } else {
        setShowIntro(true);
      }
    } catch {
      setShowIntro(false);
      setIntroDone(true);
    }
  }, []);

  const handleIntroDone = useCallback(() => {
    setShowIntro(false);
    setIntroDone(true);
  }, []);

  return (
    <>
      {/* ── Cinematic 3D Intro ── */}
      {showIntro === true && <Intro onDone={handleIntroDone} />}

      {/* ── Main Site ── */}
      <div
        style={{
          opacity: introDone || showIntro === false ? 1 : 0,
          transition: "opacity 0.6s ease",
          minHeight: "100vh",
          position: "relative",
        }}
        aria-hidden={showIntro === true}
      >
        <WorldCanvas />
        <Navbar />

        <main id="main-content">
          {/* ① Hero */}
          <Hero />

          {/* ② The Red Current: First scroll transition with TF mark reveal */}
          <div className="fade-up-section">
            <RedCurrentTransition />
          </div>

          {/* ③ Season 2 at a Glance */}
          <div className="fade-up-section">
            <Season2Glance />
          </div>

          {/* ③ Events */}
          <div className="fade-up-section">
            <Events lineup={lineup} onToggleLineup={toggleLineup} />
          </div>

          {/* ④ Schedule */}
          <div className="fade-up-section">
            <Schedule />
          </div>

          {/* ⑤ Sponsors */}
          <div className="fade-up-section">
            <Sponsors />
          </div>

          {/* ⑥ About */}
          <div className="fade-up-section">
            <About />
          </div>

          {/* ⑦ FAQ */}
          <div className="fade-up-section">
            <FAQ />
          </div>

          {/* ⑧ Contact */}
          <div className="fade-up-section">
            <Contact />
          </div>
        </main>

        <Footer />

        {/* ── Lineup FAB + Panel ── */}
        <LineupFAB count={lineup.length} onClick={() => setLineupOpen((v) => !v)} />
        <Lineup
          lineup={lineup}
          onToggle={toggleLineup}
          onClear={clearLineup}
          open={lineupOpen}
          onClose={() => setLineupOpen(false)}
        />

        {/* Backdrop for lineup panel */}
        {lineupOpen && (
          <div
            onClick={() => setLineupOpen(false)}
            aria-hidden="true"
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
              zIndex: 799, backdropFilter: "blur(2px)",
            }}
          />
        )}
      </div>

      {/* Skip to main content link */}
      <a
        href="#main-content"
        style={{
          position: "fixed", top: "-100%", left: "1rem", zIndex: 9999,
          background: "var(--red-500)", color: "white", padding: "0.75rem 1.25rem",
          borderRadius: "var(--radius-md)", fontWeight: 700, textDecoration: "none",
          transition: "top 0.2s",
        }}
        onFocus={(e) => (e.currentTarget.style.top = "1rem")}
        onBlur={(e) => (e.currentTarget.style.top = "-100%")}
      >
        Skip to main content
      </a>
    </>
  );
}
