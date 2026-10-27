"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/data/config";

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      style={{
        paddingBlock: "var(--section-py)",
        background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(229, 9, 20, 0.04) 0%, transparent 70%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        position: "relative",
      }}
    >
      <div className="container" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="section-label" id="faq-title">Common Questions</div>
        <h2 className="section-title" style={{ marginBottom: "0.75rem" }}>FAQ</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "2rem" }}>
          Answers to common questions. More details will be added as Season 3 is announced.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} role="list">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="accordion-item" role="listitem">
                <button
                  className="accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <span>{item.question}</span>
                  <svg className="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${item.id}`}
                  className={`accordion-content${isOpen ? " open" : ""}`}
                  role="region"
                  aria-labelledby={`faq-question-${item.id}`}
                >
                  <div className="accordion-content-inner">{item.answer}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9375rem", marginBottom: "1rem" }}>
            Can&apos;t find your answer?
          </p>
          <a href="#contact" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Contact us →
          </a>
        </div>
      </div>
    </section>
  );
}
