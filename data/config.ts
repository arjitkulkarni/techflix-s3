/**
 * ============================================================
 * TECHFLIX SEASON 3 — EDITABLE CONFIGURATION FILE
 * ============================================================
 * Update this file when Season 3 details are confirmed.
 * Fields marked with [PLACEHOLDER] must be replaced before launch.
 * Fields marked with [S2 HISTORICAL] are Season 2 data kept for reference.
 * ============================================================
 */

// ─── FESTIVAL META ────────────────────────────────────────────
export const FESTIVAL = {
  name: "TechFlix",
  season: "Season 3",
  tagline: "The Next Episode Begins.",
  description:
    "A multi-day innovation festival where developers, designers and creators come together to build, compete and share ideas. Hosted by DSU-ACM and the Department of Computer Science & Engineering, Dayananda Sagar University.",
  organizer: "DSU-ACM Student Chapter & Department of CSE, Dayananda Sagar University",
  organizerShort: "DSU-ACM × DSU CSE",
  dates: null as string | null,
  datesLabel: "Dates coming soon",
  venue: null as string | null,
  venueLabel: "Venue to be announced",
  prizePool: null as string | null,
  prizePoolLabel: "Prize pool to be announced",
  registrationUrl: null as string | null,
  logoPath: null as string | null,
  siteUrl: "https://techflix-s3.vercel.app",
};

export const SEASON2_STATS = [
  { label: "Events", value: "7", note: "Source: Season 2 website. Event count vs visible lineup may differ — please review.", confirmed: false },
  { label: "Festival Days", value: "3", note: "Source: Season 2 website.", confirmed: true },
  { label: "Prize Pool", value: "₹2.5 Lakh+", note: "Source: Season 2 website headline figure.", confirmed: false },
  { label: "Participants", value: null as string | null, note: "Not published on Season 2 site. Awaiting organizer confirmation.", confirmed: false },
];

export const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export type EventCategory = "Hackathon" | "AI/ML" | "Cybersecurity" | "Creative" | "Workshop" | "Symposium" | "Forum" | "Physical";

export interface TechFlixEvent {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: EventCategory;
  day: string | null;
  time: string | null;
  teamSize: string | null;
  prize: string | null;
  registrationUrl: string | null;
  accentColor: string;
  isPlaceholder: boolean;
  isConfirmed: boolean;
}

export const EVENTS: TechFlixEvent[] = [
  { id: "la-casa-de-code", title: "La Casa De Code", tagline: "Build something that matters — in 24 hours.", description: "A 24-hour innovation marathon where teams race to build working prototypes from scratch.", longDescription: "Teams lock in for 24 hours, pick a problem statement and emerge with a working prototype. Mentors, workshops and lightning talks run throughout the night. The ultimate test of endurance, creativity and execution.", category: "Hackathon", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#e53e3e", isPlaceholder: true, isConfirmed: false },
  { id: "promptwars", title: "PromptWars", tagline: "The new frontier of building — one prompt at a time.", description: "A high-energy AI prompting hackathon. Solve surprise problem statements using only prompts.", longDescription: "Participants face live, surprise problem statements and must build working solutions using AI prompts alone — no manual coding. Fast-paced rounds test creativity, clarity and prompt engineering skills.", category: "AI/ML", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#805ad5", isPlaceholder: true, isConfirmed: false },
  { id: "keys-of-the-unknown", title: "The Keys of the Unknown", tagline: "Decode. Discover. Dominate.", description: "A multi-round team treasure hunt testing logic, observation and teamwork.", longDescription: "Six elimination rounds push teams to crack cryptic clues, solve physical puzzles and race against the clock across the campus. Equal parts brains and strategy.", category: "Physical", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#38a169", isPlaceholder: true, isConfirmed: false },
  { id: "cyberanarchy", title: "CYBERANARCHY", tagline: "Capture the flag. Rule the network.", description: "A Capture The Flag cybersecurity challenge for ethical hackers and security enthusiasts.", longDescription: "Jeopardy-style CTF with challenges spanning web exploitation, reverse engineering, forensics, cryptography and OSINT. Open to individuals and small teams.", category: "Cybersecurity", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#dd6b20", isPlaceholder: true, isConfirmed: false },
  { id: "future-front", title: "Future Front", tagline: "Ideas that push the horizon.", description: "A student symposium showcasing technical research, projects and emerging technologies.", longDescription: "Participants present papers, demos and project showcases to an expert jury. Topics span AI, systems, sustainability and beyond. The best presentations are eligible for publication opportunities.", category: "Symposium", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#3182ce", isPlaceholder: true, isConfirmed: false },
  { id: "hellfire-reels", title: "Hellfire Reels", tagline: "Create. Prompt. Roll.", description: "An AI-assisted creative film-making competition. Concept to cut in hours.", longDescription: "Teams receive a theme and must produce a short film — screenplay, visuals and editing — using AI tools as creative co-pilots. Judged on originality, narrative and technical craft.", category: "Creative", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#c05621", isPlaceholder: true, isConfirmed: false },
  { id: "reflection-of-future", title: "Reflection of Future", tagline: "Conversations that shape tomorrow.", description: "An interactive forum where students and industry voices discuss the future of technology.", longDescription: "Panel discussions, open Q&A sessions and interactive activities exploring where technology is headed and what it means for the next generation of engineers and creators.", category: "Forum", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#2b6cb0", isPlaceholder: true, isConfirmed: false },
  { id: "build-with-ai", title: "Build with AI", tagline: "Zero to deployed. In one session.", description: "An intensive hands-on workshop: build and deploy a live AI agent from scratch.", longDescription: "A guided, project-based workshop taking participants from zero to a fully deployed AI agent. Mentors provide step-by-step support. No prior AI experience required — curiosity is the only prerequisite.", category: "Workshop", day: null, time: null, teamSize: null, prize: null, registrationUrl: null, accentColor: "#2f855a", isPlaceholder: true, isConfirmed: false },
];

export interface ScheduleItem {
  id: string;
  day: string;
  date: string | null;
  dayLabel: string;
  items: {
    time: string | null;
    eventId: string | null;
    title: string;
    description: string;
    location: string | null;
    type: "event" | "activity" | "break";
  }[];
}

export const SCHEDULE: ScheduleItem[] = [
  {
    id: "day-1",
    day: "Day 1",
    date: null,
    dayLabel: "Opening Day",
    items: [
      { time: "09:00 AM", eventId: null, title: "Registration & Check-in", description: "Collect your participant kit, badge and get settled. Grab complimentary breakfast.", location: "Main Atrium, Block A", type: "activity" },
      { time: "10:30 AM", eventId: null, title: "Opening Ceremony", description: "Welcome address by the Head of CSE and DSU-ACM President. Festival kickoff.", location: "Auditorium, Block A", type: "activity" },
      { time: "11:30 AM", eventId: "build-with-ai", title: "Build with AI — Workshop", description: "Hands-on session: build and deploy your first AI agent from scratch with live mentor support.", location: "Lab 3, Block B", type: "event" },
      { time: "01:00 PM", eventId: null, title: "Lunch Break", description: "Catered lunch provided for all registered participants.", location: "Cafeteria, Ground Floor", type: "break" },
      { time: "02:00 PM", eventId: "promptwars", title: "PromptWars — Round 1", description: "Qualifier round: AI prompt challenges with surprise problem statements. Top teams advance.", location: "Lab 1, Block B", type: "event" },
      { time: "02:00 PM", eventId: "future-front", title: "Future Front — Paper Presentations", description: "First session of student research presentations across AI, sustainability and systems.", location: "Seminar Hall, Block C", type: "event" },
      { time: "05:00 PM", eventId: "reflection-of-future", title: "Reflection of Future — Panel Discussion", description: "Industry voices and faculty discuss how emerging technology shapes the careers of the next generation.", location: "Auditorium, Block A", type: "event" },
      { time: "07:00 PM", eventId: null, title: "Networking Mixer", description: "Informal mixer with food stalls, music and a chance to meet participants from other colleges.", location: "Open Lawn, Block A", type: "activity" },
    ],
  },
  {
    id: "day-2",
    day: "Day 2",
    date: null,
    dayLabel: "Hackathon Day",
    items: [
      { time: "08:00 AM", eventId: "la-casa-de-code", title: "La Casa De Code — Hackathon Begins", description: "24-hour innovation marathon starts. Teams lock in their problem statements and start building.", location: "Innovation Hub, Block B", type: "event" },
      { time: "09:30 AM", eventId: "cyberanarchy", title: "CYBERANARCHY — CTF Opens", description: "Jeopardy-style Capture The Flag challenges go live. Web, reverse engineering, forensics and crypto.", location: "Lab 2, Block B", type: "event" },
      { time: "11:00 AM", eventId: "keys-of-the-unknown", title: "Keys of the Unknown — Round 1", description: "Teams navigate the first elimination round: cryptic clues across campus locations.", location: "Campus-wide", type: "event" },
      { time: "01:00 PM", eventId: null, title: "Lunch Break", description: "Lunch provided. Hackathon teams may continue building.", location: "Cafeteria, Ground Floor", type: "break" },
      { time: "02:00 PM", eventId: "hellfire-reels", title: "Hellfire Reels — Theme Reveal & Production Begins", description: "Theme announced. Teams begin producing their AI-assisted short film. 4-hour production window.", location: "Media Lab, Block C", type: "event" },
      { time: "02:30 PM", eventId: "promptwars", title: "PromptWars — Semi-Final Round", description: "Shortlisted teams face a harder set of prompts. Real-time scoring on the leaderboard.", location: "Lab 1, Block B", type: "event" },
      { time: "06:00 PM", eventId: "hellfire-reels", title: "Hellfire Reels — Final Cut Submission", description: "All films must be submitted by 6 PM. Screening and judging session to follow.", location: "Media Lab, Block C", type: "event" },
      { time: "08:00 PM", eventId: "hellfire-reels", title: "Hellfire Reels — Screening Night", description: "Watch all finalist entries on the big screen. Audience vote + jury deliberation.", location: "Auditorium, Block A", type: "event" },
    ],
  },
  {
    id: "day-3",
    day: "Day 3",
    date: null,
    dayLabel: "Finals & Closing",
    items: [
      { time: "08:00 AM", eventId: "la-casa-de-code", title: "La Casa De Code — Hackathon Final Hour", description: "Last hour of the hackathon. Teams finalise prototypes and prepare demos.", location: "Innovation Hub, Block B", type: "event" },
      { time: "09:00 AM", eventId: "la-casa-de-code", title: "La Casa De Code — Demo Presentations", description: "Teams pitch their prototypes to the jury. 5 minutes per team, Q&A follows.", location: "Innovation Hub, Block B", type: "event" },
      { time: "10:00 AM", eventId: "cyberanarchy", title: "CYBERANARCHY — CTF Closes & Scoreboard Freeze", description: "CTF platform closes. Final leaderboard revealed live.", location: "Lab 2, Block B", type: "event" },
      { time: "11:00 AM", eventId: "keys-of-the-unknown", title: "Keys of the Unknown — Grand Finale", description: "Surviving teams compete in the final physical puzzle round across the campus.", location: "Campus-wide", type: "event" },
      { time: "12:00 PM", eventId: "promptwars", title: "PromptWars — Grand Final", description: "Top 3 teams face off in the live grand final round in front of the audience.", location: "Auditorium, Block A", type: "event" },
      { time: "01:30 PM", eventId: null, title: "Lunch Break", description: "Closing day lunch for all participants.", location: "Cafeteria, Ground Floor", type: "break" },
      { time: "03:00 PM", eventId: "future-front", title: "Future Front — Best Paper Awards", description: "Top papers announced and awarded. Brief presentation by the best-paper winner.", location: "Seminar Hall, Block C", type: "event" },
      { time: "04:30 PM", eventId: null, title: "Valedictory & Prize Distribution", description: "Winners announced across all events. Prize distribution, photo sessions and closing address.", location: "Auditorium, Block A", type: "activity" },
    ],
  },
];

export type SponsorTier = "Title" | "Gold" | "Silver" | "Bronze" | "Partner";

export interface Sponsor {
  id: string;
  name: string;
  tier: SponsorTier;
  logoPath: string | null;
  websiteUrl: string | null;
  confirmed: boolean;
  isHistorical?: boolean;
}

export const SPONSORS: Sponsor[] = [];

export const SPONSOR_INQUIRY_EMAIL: string | null = "techflix@dsuacm.com";

export const FAQ_ITEMS = [
  { id: "who-can-attend", question: "Who can attend TechFlix Season 3?", answer: "TechFlix is open to students from all disciplines and colleges. Whether you're a coder, designer, filmmaker or just curious — there's something for you. Specific eligibility rules per event will be announced when events are confirmed." },
  { id: "how-to-register", question: "How do I register?", answer: "Registration details will be announced soon. Follow our official channels and check this page for updates. We'll link directly to the registration form once it's open." },
  { id: "need-team", question: "Do I need a team?", answer: "It depends on the event. Some events are open to solo participants, others require teams. Specific team-size requirements will be listed on each event card once Season 3 details are confirmed." },
  { id: "venue", question: "Where will TechFlix Season 3 take place?", answer: "The venue will be announced soon. Season 2 was held at DSU Harohalli campus. Stay tuned for official venue confirmation." },
  { id: "schedule-release", question: "When will the full schedule be released?", answer: "The complete schedule — including dates, times and event locations — will be released once Season 3 is officially announced. Subscribe to updates to be the first to know." },
  { id: "prize", question: "What are the prizes?", answer: "Prize details are yet to be confirmed for Season 3. Season 2 had a ₹2.5 Lakh+ prize pool across events. Stay tuned for Season 3 announcements." },
  { id: "cost", question: "Is there a participation fee?", answer: "Participation fee details have not been announced yet. This information will be shared when registration opens." },
  { id: "accommodation", question: "Is accommodation available?", answer: "Accommodation availability will be communicated closer to the event date. Please contact us for specific queries." },
];

export const ABOUT = {
  headline: "Where technology meets ambition.",
  body: "TechFlix is an annual technology and innovation festival organised by the DSU-ACM Student Chapter and the Department of Computer Science & Engineering at Dayananda Sagar University.\n\nEach season brings together students, builders, designers and creators for days of competitive events, hands-on workshops, open discussions and creative challenges — all centred on the belief that the best ideas emerge when curious people get together.\n\nFrom 24-hour hackathons to AI challenges, cybersecurity battles and creative competitions, TechFlix is a stage for the next generation of technologists to build, compete and inspire.",
  teamTitle: "DSU-ACM Student Chapter",
  teamDescription: "The ACM Student Chapter at Dayananda Sagar University drives technical culture on campus through events, workshops and industry connects.",
};

export const CONTACT = {
  email: "techflix@dsuacm.com",
  social: {
    instagram: "https://instagram.com/dsuacm",
    linkedin: null as string | null,
    twitter: null as string | null,
    github: null as string | null,
  },
  address: "Dayananda Sagar University, Harohalli, Kanakapura Road, Ramanagara District, Karnataka — 562112",
};

export const SITE_META = {
  title: "TechFlix Season 3 — DSU Innovation Festival",
  description: "TechFlix Season 3: The flagship technology festival by DSU-ACM and Department of CSE, Dayananda Sagar University. Hackathons, AI events, CTF, creative competitions and more. Coming soon.",
  ogImage: "/og-image.png",
  themeColor: "#e53e3e",
  keywords: "TechFlix, TechFlix Season 3, DSU ACM, Dayananda Sagar University, Tech Fest, Hackathon, CTF, AI, Innovation Festival",
};
