# TechFlix Season 3 — DSU Innovation Festival

> **The Red Current** — Cinematic Next.js web experience for TechFlix Season 3, the annual technology festival by the Department of Computer Science & Engineering and the DSU-ACM Student Chapter.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.2-black?logo=next.js)](https://nextjs.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-red?logo=three.js)](https://threejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)

---

## ✨ Visual Concept — "The Red Current"

A continuous 3D ribbon of red light that travels through a dark cinema-like space, inspired by a strip of film moving through a premiere environment. Built with **Three.js** for the ribbon geometry, camera movement, and depth.

- **Custom film-strip shader** with dual neon edge rails, authentic 35mm sprocket holes, and traveling energy pulses
- **Original TF monogram** 3D mark revealed on first scroll below the hero
- **Scroll-driven camera** that follows the ribbon path through every section
- **Netflix-inspired palette** — near-black `#141414`, charcoal surfaces, Netflix red `#E50914`
- **Cinematic lighting** — dynamic tracking red light, rim fills, and a sponsors spotlight stage

---

## 🗂️ Project Structure

```
techflix-s3-app/
├── app/
│   ├── page.tsx          # Main page — section orchestration
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Design system, tokens, animations
├── components/
│   ├── Intro.tsx         # Cinematic landing animation (preserved)
│   ├── WorldCanvas.tsx   # 🔴 The Red Current — Three.js ribbon engine
│   ├── Hero.tsx          # Hero section (landing animation target)
│   ├── RedCurrentTransition.tsx  # First-scroll ribbon reveal transition
│   ├── Season2Glance.tsx # Historical Season 2 benchmark stats
│   ├── Events.tsx        # Episode Guide — event cards with poster art
│   ├── Schedule.tsx      # Festival timeline / premiere schedule
│   ├── Sponsors.tsx      # Sponsor spotlight stage
│   ├── About.tsx         # Narrative scenes / festival story
│   ├── FAQ.tsx           # Accordion FAQ
│   ├── Contact.tsx       # Transmission / contact form
│   ├── Navbar.tsx        # Fixed navigation bar
│   ├── Footer.tsx        # Footer
│   ├── Lineup.tsx        # My Lineup slide-over panel
│   ├── EventDetail.tsx   # Event detail modal
│   └── CategoryPosterArt.tsx  # Per-category SVG poster artwork
└── data/
    └── config.ts         # Festival data, events, schedule, sponsors
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Tip:** Append `?intro=1` to replay the cinematic intro animation: `http://localhost:3000/?intro=1`

### Build for Production

```bash
npm run build
npm run start
```

---

## 🎬 Key Features

| Feature | Description |
|---|---|
| **The Red Current** | Continuous Three.js 3D ribbon with film-strip shader, scroll-driven camera |
| **Cinematic Intro** | 5.2s Three.js tunnel animation with timed title reveal (preserved exactly) |
| **TF Mark Reveal** | 3D TechFlix monogram revealed on first scroll below hero |
| **Event Cards** | Poster artwork per category, lift + parallax on hover, red edge-light |
| **Red Button Sweep** | Light sweep animation on all primary/secondary buttons |
| **My Lineup** | Persistent bookmark system — save events to a personal lineup |
| **Episode Guide** | Filterable event grid with search, category chips, featured spotlight |
| **Schedule** | Day-by-day premiere timeline with scroll-spy navigation |
| **Sponsors Stage** | Spotlight cone + Three.js aperture ring for sponsor section |
| **Responsive** | Mobile-first, reduced-motion support, 3D pauses when offscreen |
| **Accessibility** | Skip-to-content, ARIA labels, keyboard navigation, focus styles |

---

## 🖌️ Design System

All tokens are defined in `app/globals.css`:

```css
--bg-base:    #141414   /* Primary background */
--bg-card:    #181818   /* Card surfaces */
--red-500:    #E50914   /* Netflix Red — primary accent */
--red-400:    #FF2B37   /* Brighter red — CTAs and active states */
--text-primary:   #F5F5F1
--text-secondary: #A3A3A3
--font-display: 'Oxanium'  /* Display headings */
--font-body:    'Inter'    /* Body copy */
--font-mono:    'JetBrains Mono'  /* Labels, badges, data */
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `next` 16.4.2 | React framework |
| `react` 19.3.0 | UI library |
| `three` 0.186 | 3D ribbon, camera, shader engine |
| `@types/three` | TypeScript types for Three.js |
| `typescript` 5 | Type safety |

---

## 🌿 Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable production baseline |
| `Aditya` | Active development — "The Red Current" visual rework |

---

## 👥 Contributing

This is a student-run festival project by **DSU-ACM × DSU CSE**.

1. Work on the `Aditya` branch for active development
2. Keep all content honest — do not invent festival dates, prize pools or participant counts
3. Run `npm run build` and confirm zero TypeScript errors before pushing
4. Test at mobile (375px) and laptop (1280px) widths

---

## 🏫 Organiser

**DSU-ACM Student Chapter × Department of Computer Science & Engineering, Dayananda Sagar University**

---

*TechFlix Season 3 — The Next Episode Begins.*
