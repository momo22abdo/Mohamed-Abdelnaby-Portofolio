import React, { useState, useEffect, useRef } from 'react';
// ============================================================
// DESIGN SYSTEM — Cinematic Dark "Prestige Drama" Aesthetic
// Fonts: Playfair Display (display) + IBM Plex Mono (code/accent)
// Colors: Jet Black bg, Muted Gold accent, Silver/Electric Blue
// ============================================================

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=IBM+Plex+Mono:wght@300;400;500&family=Crimson+Pro:ital,wght@0,300;0,400;1,300&display=swap');

  :root {
    --bg-void: #080808;
    --bg-deep: #0e0e0e;
    --bg-surface: #141414;
    --bg-raised: #1a1a1a;
    --gold: #c9a84c;
    --gold-dim: #8a6e2f;
    --gold-glow: rgba(201, 168, 76, 0.15);
    --silver: #9ba5b0;
    --silver-dim: #5c6470;
    --electric: #2a6fdb;
    --electric-glow: rgba(42, 111, 219, 0.2);
    --text-primary: #e8e0d0;
    --text-secondary: #8a8078;
    --text-muted: #4a4440;
    --border: rgba(201, 168, 76, 0.12);
    --border-subtle: rgba(255,255,255,0.05);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg-void);
    color: var(--text-primary);
    font-family: 'Crimson Pro', Georgia, serif;
    overflow-x: hidden;
    cursor: default;
  }

  /* ─── Scrollbar ─── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg-void); }
  ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 2px; }

  /* ─── Selection ─── */
  ::selection { background: var(--gold-dim); color: var(--bg-void); }

  /* ─── Noise texture overlay ─── */
  .noise::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 9999; opacity: 0.4;
  }

  /* ─── Typography ─── */
  .font-display { font-family: 'Playfair Display', Georgia, serif; }
  .font-mono { font-family: 'IBM Plex Mono', monospace; }

  /* ─── Glow effects ─── */
  .glow-gold { box-shadow: 0 0 40px var(--gold-glow), 0 0 80px rgba(201,168,76,0.05); }
  .glow-electric { box-shadow: 0 0 30px var(--electric-glow); }
  .text-glow { text-shadow: 0 0 30px rgba(201,168,76,0.4); }

  /* ─── Glass morphism ─── */
  .glass {
    background: rgba(20, 20, 20, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border);
  }

  /* ─── Animations ─── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 20px var(--gold-glow); }
    50%       { box-shadow: 0 0 50px rgba(201,168,76,0.3), 0 0 80px rgba(201,168,76,0.1); }
  }
  @keyframes scanline {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; } 50% { opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
  .animate-fadeIn { animation: fadeIn 1s ease forwards; }
  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-pulse-gold { animation: pulse-gold 3s ease-in-out infinite; }

  .delay-100 { animation-delay: 0.1s; }
  .delay-200 { animation-delay: 0.2s; }
  .delay-300 { animation-delay: 0.3s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-500 { animation-delay: 0.5s; }
  .delay-600 { animation-delay: 0.6s; }

  /* ─── Shimmer text ─── */
  .shimmer-text {
    background: linear-gradient(90deg, var(--gold) 0%, #f0d890 40%, var(--gold) 60%, #8a6e2f 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear infinite;
  }

  /* ─── Horizontal rule ─── */
  .hr-gold {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
  }

  /* ─── Nav ─── */
  .nav-link {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--silver);
    transition: color 0.3s, text-shadow 0.3s;
    cursor: pointer;
    text-decoration: none;
  }
  .nav-link:hover { color: var(--gold); text-shadow: 0 0 20px var(--gold-glow); }

  /* ─── Buttons ─── */
  .btn-primary {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 14px 32px;
    background: var(--gold);
    color: var(--bg-void);
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.5s;
  }
  .btn-primary:hover::after { transform: translateX(100%); }
  .btn-primary:hover { background: #d4b660; box-shadow: 0 8px 30px rgba(201,168,76,0.4); transform: translateY(-1px); }

  .btn-secondary {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 13px 32px;
    background: transparent;
    color: var(--gold);
    border: 1px solid var(--gold-dim);
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 400;
  }
  .btn-secondary:hover {
    background: var(--gold-glow);
    border-color: var(--gold);
    box-shadow: 0 0 30px var(--gold-glow), inset 0 0 20px var(--gold-glow);
    transform: translateY(-1px);
  }

  /* ─── Project cards ─── */
  .project-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  .project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold-dim), transparent);
    transform: scaleX(0);
    transition: transform 0.4s;
  }
  .project-card:hover {
    border-color: var(--border);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 40px var(--gold-glow);
  }
  .project-card:hover::before { transform: scaleX(1); }

  /* ─── Skill badges ─── */
  .skill-badge {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    padding: 6px 14px;
    background: var(--bg-raised);
    border: 1px solid var(--border-subtle);
    color: var(--silver);
    transition: all 0.25s;
    cursor: default;
  }
  .skill-badge:hover {
    background: var(--gold-glow);
    border-color: var(--gold-dim);
    color: var(--gold);
    box-shadow: 0 0 20px var(--gold-glow);
    transform: translateY(-2px) scale(1.02);
  }

  /* ─── Timeline ─── */
  .timeline-dot {
    width: 10px; height: 10px;
    background: var(--gold);
    border-radius: 50%;
    border: 2px solid var(--bg-void);
    box-shadow: 0 0 15px var(--gold-glow);
    flex-shrink: 0;
  }

  /* ─── Contact inputs ─── */
  .form-input {
    width: 100%;
    background: var(--bg-raised);
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    font-family: 'Crimson Pro', serif;
    font-size: 16px;
    padding: 14px 18px;
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .form-input::placeholder { color: var(--text-muted); font-style: italic; }
  .form-input:focus {
    border-color: var(--gold-dim);
    box-shadow: 0 0 20px var(--gold-glow);
  }

  /* ─── Section headings ─── */
  .section-label {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.1;
  }

  /* ─── Stat counter ─── */
  .stat-counter {
    font-family: 'Playfair Display', serif;
    font-size: 56px;
    font-weight: 900;
    line-height: 1;
    color: var(--gold);
  }

  /* ─── MLOps diagram area ─── */
  .diagram-node {
    background: var(--bg-raised);
    border: 1px solid var(--border);
    padding: 10px 20px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: var(--silver);
    letter-spacing: 0.05em;
    white-space: nowrap;
  }
  .diagram-arrow {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    color: var(--gold-dim);
  }

  /* ─── Responsive ─── */
  @media (max-width: 768px) {
    .stat-counter { font-size: 38px; }
    .hero-name { font-size: 52px !important; }
  }
`;

// ─── Animated Counter Hook ───────────────────────────────────
function useCounter(target, duration = 2000, suffix = '') {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// ─── Nav Component ──────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Lab', 'About', 'Stack', 'Timeline', 'Contact'];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '20px 48px',
        background: scrolled ? 'rgba(8,8,8,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.08)' : 'none',
        transition: 'all 0.4s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.2em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
        }}
      >
        MA
        <span style={{ color: 'var(--silver-dim)', marginLeft: 8 }}>
          / AI Engineer
        </span>
      </div>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">
            {l}
          </a>
        ))}
        <a
          href="#contact"
          className="btn-primary"
          style={{ padding: '10px 24px', textDecoration: 'none', fontSize: 10 }}
        >
          Hire Me
        </a>
      </div>
    </nav>
  );
}

// ─── Hero Section ───────────────────────────────────────────
function Hero() {
  const exp = useCounter(2, 1500);
  const acc = useCounter(92, 2000);
  const users = useCounter(500, 2200);

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 48px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `
          linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)
        `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial glow center-left */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: 600,
          height: 600,
          background:
            'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* ── Left: Text ── */}
          <div>
            {/* Label */}
            <div className="animate-fadeUp" style={{ marginBottom: 24 }}>
              <span className="section-label">
                &#11835; Cairo, Egypt &nbsp;·&nbsp; Available for opportunities
                &#11835;
              </span>
            </div>

            {/* Name */}
            <h1
              className="animate-fadeUp delay-100 font-display hero-name"
              style={{
                fontSize: 72,
                fontWeight: 900,
                lineHeight: 1.0,
                marginBottom: 16,
                letterSpacing: '-0.02em',
              }}
            >
              <span className="shimmer-text">Mohamed</span>
              <br />
              <span style={{ color: 'var(--text-primary)' }}>Abdelnaby</span>
            </h1>

            {/* Title */}
            <div
              className="animate-fadeUp delay-200 font-mono"
              style={{
                fontSize: 13,
                letterSpacing: '0.15em',
                color: 'var(--silver)',
                textTransform: 'uppercase',
                marginBottom: 32,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 1,
                  background: 'var(--gold-dim)',
                  display: 'inline-block',
                }}
              />
              AI / Machine Learning Engineer
            </div>

            {/* Bio */}
            <p
              className="animate-fadeUp delay-300"
              style={{
                fontSize: 19,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: 540,
                marginBottom: 48,
              }}
            >
              Building production-grade AI systems that scale. From zero-shot
              semantic search to multilingual NLP pipelines—I engineer
              intelligence that ships.
            </p>

            {/* CTAs */}
            <div
              className="animate-fadeUp delay-400"
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
            >
              {/* ↓ Replace href with your actual CV link */}
              <a
                href="#"
                download
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                ↓ &nbsp;Download CV
              </a>
              <a
                href="#lab"
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                Explore My AI Lab →
              </a>
            </div>

            {/* Stats */}
            <div
              className="animate-fadeUp delay-500"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 32,
                marginTop: 64,
                paddingTop: 48,
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {[
                {
                  counter: exp,
                  suffix: '+',
                  label: 'Years Experience',
                  note: 'yrs',
                },
                {
                  counter: acc,
                  suffix: '%',
                  label: 'Model Accuracy',
                  note: 'peak',
                },
                {
                  counter: users,
                  suffix: '+',
                  label: 'Daily Users Served',
                  note: 'avg/day',
                },
              ].map(({ counter, suffix, label, note }, i) => (
                <div key={i} ref={counter.ref}>
                  <div
                    style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}
                  >
                    <span className="stat-counter">{counter.count}</span>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 32,
                        color: 'var(--gold)',
                        fontWeight: 700,
                      }}
                    >
                      {suffix}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginTop: 4,
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Profile Picture ── */}
          <div
            className="animate-fadeIn delay-300"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative' }} className="animate-float">
              {/* Outer glow ring */}
              <div
                className="animate-pulse-gold"
                style={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.15)',
                  zIndex: 0,
                }}
              />

              {/* Corner brackets — top-left */}
              <div
                style={{
                  position: 'absolute',
                  top: -12,
                  left: -12,
                  width: 28,
                  height: 28,
                  borderTop: '2px solid var(--gold)',
                  borderLeft: '2px solid var(--gold)',
                  zIndex: 2,
                }}
              />
              {/* Corner brackets — bottom-right */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -12,
                  right: -12,
                  width: 28,
                  height: 28,
                  borderBottom: '2px solid var(--gold)',
                  borderRight: '2px solid var(--gold)',
                  zIndex: 2,
                }}
              />

              {/* ────────────────────────────────────────────────
                  PROFILE PHOTO PLACEHOLDER
                  Replace the div below with:
                  <img src="/your-photo.jpg" alt="Mohamed Abdelnaby"
                    style={{ width: 340, height: 420, objectFit: "cover", display: "block",
                             filter: "grayscale(20%) contrast(1.05)" }} />
                ──────────────────────────────────────────────── */}
              <div
                style={{
                  width: 340,
                  height: 420,
                  background:
                    'linear-gradient(145deg, var(--bg-raised) 0%, var(--bg-surface) 100%)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Avatar icon placeholder */}
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: 'var(--gold-glow)',
                    border: '1px solid var(--gold-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="#c9a84c"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M4 20c0-4 3.582-7 8-7s8 3 8 7"
                      stroke="#c9a84c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  [ Add Photo Here ]
                </span>
              </div>

              {/* Floating tag */}
              <div
                className="glass"
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: -32,
                  padding: '10px 16px',
                  zIndex: 3,
                }}
              >
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 9,
                    color: 'var(--gold)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: 2,
                  }}
                >
                  Status
                </div>
                <div
                  style={{
                    fontFamily: "'Crimson Pro', serif",
                    fontSize: 14,
                    color: 'var(--text-primary)',
                  }}
                >
                  Open to Work ✦
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── AI Lab / Projects ──────────────────────────────────────
function Lab() {
  const projects = [
    {
      id: 'cinebrain',
      name: 'CineBrain',
      subtitle: 'Hybrid AI Movie Recommendation Engine',
      tag: 'NLP · Retrieval · RAG',
      color: '#2a6fdb',
      description:
        "Zero-shot semantic search using SBERT and FAISS. Hybrid ranking blends plot embeddings, metadata similarity, and Bayesian-adjusted ratings. Powered by Groq's Llama 3 API for real-time RAG explanations.",
      tech: ['SBERT', 'FAISS', 'FastAPI', 'Groq / Llama 3', 'Streamlit'],
      icon: '🎬',
    },
    {
      id: 'hatespeech',
      name: 'Hate Speech Bot',
      subtitle: 'Multilingual NLP Detection System',
      tag: 'NLP · Classification · XAI',
      color: '#8b3a62',
      description:
        'Multilingual Telegram bot (SVM, TF-IDF) processing 500+ daily messages across 5 languages with 88% F1-score. Integrated LIME for explainability and engineered SQLite analytics backend with rate-limiting.',
      tech: ['SVM', 'TF-IDF', 'LIME', 'Telegram API', 'SQLite'],
      icon: '🛡️',
    },
    {
      id: 'career',
      name: 'Career Assistant',
      subtitle: 'AI-Powered Career Intelligence Platform',
      tag: 'NER · Knowledge Graphs · NLP',
      color: '#2d7a5a',
      description:
        'AI career platform featuring spaCy/NER resume parser that reduced screening time by 60% for 200+ users. Skill-matching and gap analysis engine using NLP and knowledge graphs improved alignment by 35%.',
      tech: ['spaCy', 'NER', 'Knowledge Graphs', 'Streamlit', 'NLP'],
      icon: '🎯',
    },
  ];

  return (
    <section id="lab" style={{ padding: '120px 48px', position: 'relative' }}>
      {/* Section header */}
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <span className="section-label">02. Projects</span>
          <h2
            className="section-title"
            style={{ fontSize: 52, marginTop: 12, marginBottom: 20 }}
          >
            The AI Lab
          </h2>
          <p
            style={{
              fontSize: 18,
              color: 'var(--text-secondary)',
              maxWidth: 560,
              lineHeight: 1.6,
            }}
          >
            Production-grade systems built end-to-end. Each card below hosts an
            embedded live demo zone— inject your Streamlit or FastAPI widgets
            directly.
          </p>
        </div>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 24,
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ padding: 0, transition: 'all 0.4s' }}
    >
      {/* Card header */}
      <div
        style={{
          padding: '28px 28px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          background: hovered
            ? `rgba(${
                p.color === '#2a6fdb'
                  ? '42,111,219'
                  : p.color === '#8b3a62'
                  ? '139,58,98'
                  : '45,122,90'
              },0.05)`
            : 'transparent',
          transition: 'background 0.4s',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 28 }}>{p.icon}</span>
          <span
            className="font-mono"
            style={{
              fontSize: 9,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              border: `1px solid ${p.color}33`,
              color: p.color,
              background: `${p.color}11`,
            }}
          >
            {p.tag}
          </span>
        </div>
        <h3
          className="font-display"
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 6,
          }}
        >
          {p.name}
        </h3>
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {p.subtitle}
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: '20px 28px' }}>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
          }}
        >
          {p.description}
        </p>
      </div>

      {/* ────────────────────────────────────────────────────────
          LIVE DEMO EMBED ZONE
          Replace this <div> with:
          <iframe
            src="https://your-streamlit-app.streamlit.app/?embedded=true"
            width="100%" height="300" frameBorder="0"
            style={{ display: "block" }} />
          Or inject a FastAPI-powered React widget component here.
        ──────────────────────────────────────────────────────── */}
      <div
        style={{
          margin: '0 28px 20px',
          height: 180,
          background: 'var(--bg-void)',
          border: '1px dashed rgba(201,168,76,0.2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Scanline effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${p.color}44, transparent)`,
            animation: hovered ? 'scanline 2s linear infinite' : 'none',
          }}
        />
        <div
          className="font-mono"
          style={{
            fontSize: 10,
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          [ Interactive Demo Zone ]
        </div>
        <div
          className="font-mono"
          style={{ fontSize: 9, color: 'var(--text-muted)', opacity: 0.6 }}
        >
          Inject Streamlit · FastAPI · iframe
        </div>
      </div>

      {/* Tech stack */}
      <div
        style={{
          padding: '0 28px 20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        {p.tech.map((t) => (
          <span key={t} className="skill-badge" style={{ fontSize: 9 }}>
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          padding: '16px 28px 28px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: 12,
        }}
      >
        {/* Replace href with your live demo URL */}
        <a
          href="#"
          className="btn-primary"
          style={{
            textDecoration: 'none',
            fontSize: 10,
            padding: '10px 20px',
            flex: 1,
            textAlign: 'center',
          }}
        >
          ▶ Run Live Demo
        </a>
        {/* Replace href with your GitHub repo URL */}
        <a
          href="#"
          className="btn-secondary"
          style={{ textDecoration: 'none', fontSize: 10, padding: '10px 20px' }}
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

// ─── About + Now ─────────────────────────────────────────────
function About() {
  const nows = [
    {
      icon: '⚗️',
      text: 'Deepening expertise in Advanced Generative AI & LLM fine-tuning',
    },
    {
      icon: '🏛️',
      text: 'ITI Business Intelligence Development — Power BI & SQL Server',
    },
    {
      icon: '📐',
      text: 'Architecting scalable MLOps pipelines with Docker & CI/CD',
    },
    {
      icon: '🎓',
      text: 'B.Sc. Computer Science, Zagazig University (GPA: 3.7 / 4.0)',
    },
  ];

  return (
    <section
      id="about"
      style={{ padding: '120px 48px', background: 'var(--bg-deep)' }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* Left: About */}
        <div>
          <span className="section-label">03. About</span>
          <h2
            className="section-title"
            style={{ fontSize: 48, marginTop: 12, marginBottom: 32 }}
          >
            Continuous
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
              Evolution
            </em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}
            >
              I'm an AI/ML Engineer with 2+ years building scalable intelligent
              systems in Python— from full end-to-end ML pipelines to
              production-deployed NLP applications serving real users.
            </p>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}
            >
              My engineering philosophy:{' '}
              <em style={{ color: 'var(--text-primary)' }}>
                ship models that matter
              </em>
              . Not just notebooks—real, deployed, monitored systems with MLOps
              rigor. 92% accuracy means nothing if it never reaches production.
            </p>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}
            >
              I blend deep ML fundamentals (from Stanford's supervised learning
              curriculum) with hands-on deployment experience across Docker,
              REST APIs, and cloud infrastructure.
            </p>
          </div>

          {/* Certs */}
          <div
            style={{
              marginTop: 40,
              paddingTop: 32,
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            <div className="section-label" style={{ marginBottom: 16 }}>
              Certifications
            </div>
            {[
              'Machine Learning Diploma — CSkilled Academy',
              'Supervised ML: Regression & Classification — Stanford / DeepLearning.AI',
              'Business Intelligence Development — ITI',
            ].map((cert, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                <span style={{ color: 'var(--gold)', fontSize: 12 }}>✦</span>
                <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Now */}
        <div>
          <div className="glass" style={{ padding: 40 }}>
            <div
              className="font-mono"
              style={{
                fontSize: 9,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#3fb950',
                  boxShadow: '0 0 10px #3fb950',
                  animation: 'pulse-gold 2s infinite',
                }}
              />
              What I'm Doing Now
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {nows.map((n, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                    padding: '16px 20px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'border-color 0.3s, transform 0.3s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-dim)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{n.icon}</span>
                  <span
                    style={{
                      fontSize: 16,
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                    }}
                  >
                    {n.text}
                  </span>
                </div>
              ))}
            </div>

            <hr className="hr-gold" style={{ margin: '32px 0' }} />

            <div style={{ textAlign: 'center' }}>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                B.Sc. Computer Science
              </div>
              <div
                className="font-display"
                style={{ fontSize: 20, color: 'var(--text-primary)' }}
              >
                Zagazig University
              </div>
              <div style={{ fontSize: 14, color: 'var(--gold)', marginTop: 4 }}>
                GPA: 3.7 / 4.0
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  marginTop: 4,
                }}
              >
                Oct 2022 – Jul 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ──────────────────────────────────────────────
function TechStack() {
  const categories = [
    {
      label: 'AI / ML Frameworks',
      icon: '🧠',
      skills: [
        'Scikit-learn',
        'TensorFlow',
        'Keras',
        'PyTorch',
        'XGBoost',
        'LightGBM',
        'CatBoost',
        'Neural Networks',
        'Deep Learning',
      ],
    },
    {
      label: 'Programming',
      icon: '⌨️',
      skills: [
        'Python',
        'SQL',
        'C++',
        'Java',
        'OOP',
        'Data Structures',
        'Algorithms',
      ],
    },
    {
      label: 'MLOps & Deployment',
      icon: '🚀',
      skills: [
        'Docker',
        'Git',
        'REST APIs',
        'CI/CD',
        'Flask',
        'Streamlit',
        'Model Versioning',
        'Cloud Deployment',
      ],
    },
    {
      label: 'Data Engineering',
      icon: '🗄️',
      skills: [
        'Pandas',
        'NumPy',
        'SQL Server',
        'PostgreSQL',
        'ETL Pipelines',
        'Feature Engineering',
      ],
    },
    {
      label: 'NLP & Vision',
      icon: '🔬',
      skills: [
        'NLTK',
        'spaCy',
        'OpenCV',
        'Text Classification',
        'NER',
        'LIME',
        'SHAP',
        'Transfer Learning',
        'SBERT',
        'FAISS',
      ],
    },
    {
      label: 'Visualization & BI',
      icon: '📊',
      skills: [
        'Power BI',
        'Tableau',
        'Matplotlib',
        'Seaborn',
        'Plotly',
        'Dashboard Dev',
      ],
    },
  ];

  return (
    <section id="stack" style={{ padding: '120px 48px', position: 'relative' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <span className="section-label">04. Capabilities</span>
          <h2 className="section-title" style={{ fontSize: 52, marginTop: 12 }}>
            Interactive Tech Stack
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 32,
          }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{
                padding: '28px 28px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                transition: 'border-color 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = 'var(--border-subtle)')
              }
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 20 }}>{cat.icon}</span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                  }}
                >
                  {cat.label}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map((s) => (
                  <span key={s} className="skill-badge">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Timeline + MLOps Diagram ────────────────────────────────
function Timeline() {
  const events = [
    {
      year: '2022',
      label: 'Oct',
      title: 'University Begins',
      note: 'B.Sc. Computer Science & Informatics, Zagazig University',
      type: 'edu',
    },
    {
      year: '2023',
      label: '2023',
      title: 'First ML Projects',
      note: 'Built Hate Speech Detection Bot — 500+ daily users, 88% F1',
      type: 'project',
    },
    {
      year: '2024',
      label: '2024',
      title: 'ML Diploma',
      note: 'Machine Learning Diploma — CSkilled Academy',
      type: 'cert',
    },
    {
      year: '2024',
      label: '2024',
      title: 'Stanford Certification',
      note: 'Supervised ML: Regression & Classification — Stanford / DeepLearning.AI',
      type: 'cert',
    },
    {
      year: '2024',
      label: '2024',
      title: 'Career Assistant',
      note: 'Built AI Career Platform — 60% screening time reduction for 200+ users',
      type: 'project',
    },
    {
      year: '2025',
      label: '2025',
      title: 'CineBrain',
      note: 'Hybrid RAG recommendation engine — SBERT, FAISS, Llama 3, FastAPI',
      type: 'project',
    },
    {
      year: '2025',
      label: 'Now',
      title: 'ITI Certification',
      note: 'Business Intelligence Development — Power BI & SQL Server',
      type: 'cert',
    },
    {
      year: '2026',
      label: 'Jul 2026',
      title: 'Expected Graduation',
      note: 'B.Sc. Completion — GPA: 3.7/4.0',
      type: 'edu',
    },
  ];

  const colors = { edu: '#2a6fdb', project: '#c9a84c', cert: '#3fb950' };

  const mlopsSteps = [
    'Data Collection',
    'Feature Engineering',
    'Model Training',
    'Evaluation & Tuning',
    'Containerize (Docker)',
    'CI/CD Pipeline',
    'Deploy API',
    'Monitor & Retrain',
  ];

  return (
    <section
      id="timeline"
      style={{ padding: '120px 48px', background: 'var(--bg-deep)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Timeline */}
          <div>
            <span className="section-label">05. Journey</span>
            <h2
              className="section-title"
              style={{ fontSize: 48, marginTop: 12, marginBottom: 48 }}
            >
              Experience &amp;
              <br />
              Education
            </h2>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, marginBottom: 36 }}>
              {[
                ['Education', 'edu'],
                ['Project', 'project'],
                ['Certification', 'cert'],
              ].map(([l, k]) => (
                <div
                  key={k}
                  style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: colors[k],
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: 10,
                      color: 'var(--text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ position: 'relative', paddingLeft: 32 }}>
              {/* Vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: 4,
                  top: 8,
                  bottom: 8,
                  width: 1,
                  background:
                    'linear-gradient(to bottom, var(--gold-dim), transparent)',
                }}
              />

              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 32 }}
              >
                {events.map((ev, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 20,
                      alignItems: 'flex-start',
                    }}
                  >
                    {/* Dot */}
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: colors[ev.type],
                        border: '2px solid var(--bg-void)',
                        boxShadow: `0 0 12px ${colors[ev.type]}66`,
                        marginTop: 4,
                        flexShrink: 0,
                      }}
                    />

                    <div
                      style={{
                        padding: '16px 20px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        flex: 1,
                        transition: 'border-color 0.3s, transform 0.3s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          colors[ev.type] + '44';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          'var(--border-subtle)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 6,
                        }}
                      >
                        <span
                          className="font-display"
                          style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {ev.title}
                        </span>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: 9,
                            color: colors[ev.type],
                            letterSpacing: '0.1em',
                          }}
                        >
                          {ev.label}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: 13,
                          color: 'var(--text-secondary)',
                          lineHeight: 1.5,
                        }}
                      >
                        {ev.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MLOps Diagram */}
          <div>
            <span className="section-label">End-to-End</span>
            <h2
              className="section-title"
              style={{ fontSize: 48, marginTop: 12, marginBottom: 32 }}
            >
              MLOps
              <br />
              Architecture
            </h2>
            <p
              style={{
                fontSize: 16,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: 40,
              }}
            >
              My end-to-end ML pipeline—from raw data ingestion through
              containerized deployment and continuous monitoring.
            </p>

            {/* ────────────────────────────────────────────────────
                MLOPS DIAGRAM PLACEHOLDER
                Replace with your actual architecture diagram:
                - <img src="/mlops-diagram.svg" ... />
                - Or use a library like ReactFlow / Mermaid
                - Or embed a Figma/Excalidraw export
              ──────────────────────────────────────────────────── */}
            <div className="glass" style={{ padding: 32 }}>
              <div
                className="font-mono"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: 24,
                }}
              >
                ▸ Pipeline Visualization
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {mlopsSteps.map((step, i) => (
                  <div key={i}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        padding: '10px 16px',
                        background:
                          i % 2 === 0
                            ? 'var(--bg-surface)'
                            : 'var(--bg-raised)',
                        border: '1px solid var(--border-subtle)',
                        borderBottom:
                          i < mlopsSteps.length - 1
                            ? 'none'
                            : '1px solid var(--border-subtle)',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--gold-dim)';
                        e.currentTarget.style.background = 'var(--gold-glow)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          'var(--border-subtle)';
                        e.currentTarget.style.background =
                          i % 2 === 0
                            ? 'var(--bg-surface)'
                            : 'var(--bg-raised)';
                      }}
                    >
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 10,
                          color: 'var(--gold-dim)',
                          width: 20,
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        style={{ fontSize: 13, color: 'var(--text-secondary)' }}
                      >
                        {step}
                      </span>
                      {i < mlopsSteps.length - 1 && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            fontSize: 10,
                            color: 'var(--text-muted)',
                          }}
                        >
                          ↓
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 24,
                  padding: '14px 16px',
                  border: '1px dashed rgba(201,168,76,0.3)',
                  textAlign: 'center',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 10,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  [ Inject Architecture Diagram / ReactFlow Here ]
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    // ── Replace with your form submission logic (EmailJS, Formspree, etc.) ──
    console.log('Form submitted:', form);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  const socials = [
    {
      icon: '✉',
      label: 'Email',
      value: 'mohamed.abdelnaby.1005@gmail.com',
      href: 'mailto:moahmed.abdelnaby.1005@gmail.com',
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+201029536957',
      href: 'tel:+201029536957',
    },
    {
      icon: 'in',
      label: 'LinkedIn',
      value: 'linkedin.com/in/mohamed-abdelnaby',
      href: 'https://linkedin.com/in/mohamed-abdelnaby',
      target: '_blank',
    },
    {
      icon: '⌥',
      label: 'GitHub',
      value: 'github.com/mohamed-abdelnaby',
      href: 'https://github.com/mohamed-abdelnaby',
      target: '_blank',
    },
  ];

  return (
    <section
      id="contact"
      style={{ padding: '120px 48px', position: 'relative' }}
    >
      {/* Background radial */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: 500,
          height: 500,
          background:
            'radial-gradient(circle, rgba(42,111,219,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="section-label">06. Contact</span>
          <h2
            className="section-title"
            style={{ fontSize: 52, marginTop: 12, marginBottom: 16 }}
          >
            Let's Build
            <br />
            <span className="shimmer-text">Something Exceptional</span>
          </h2>
          <p
            style={{
              fontSize: 18,
              color: 'var(--text-secondary)',
              maxWidth: 480,
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Open to roles, collaborations, and interesting AI projects. Don't
            hesitate to reach out.
          </p>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60 }}
        >
          {/* Left: Socials */}
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 28,
              }}
            >
              Direct Channels
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target={s.target || '_self'}
                  rel="noreferrer"
                  style={{
                    display: 'flex',
                    gap: 20,
                    alignItems: 'center',
                    padding: '18px 20px',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-dim)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: 'var(--gold-glow)',
                      border: '1px solid var(--gold-dim)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 11,
                      color: 'var(--gold)',
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: 9,
                        color: 'var(--text-muted)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: 3,
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{ fontSize: 14, color: 'var(--text-secondary)' }}
                    >
                      {s.value}
                    </div>
                  </div>
                  <span
                    style={{
                      marginLeft: 'auto',
                      color: 'var(--gold-dim)',
                      fontSize: 12,
                    }}
                  >
                    →
                  </span>
                </a>
              ))}
            </div>

            <hr className="hr-gold" style={{ margin: '40px 0' }} />

            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 10,
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                lineHeight: 1.8,
              }}
            >
              <div>📍 Cairo, Egypt</div>
              <div style={{ marginTop: 8 }}>
                🕐 GMT+2 · Usually responds within 24h
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass" style={{ padding: 40 }}>
            <div
              className="font-mono"
              style={{
                fontSize: 10,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: 28,
              }}
            >
              Send a Message
            </div>

            {sent ? (
              <div
                style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  border: '1px solid var(--gold-dim)',
                  background: 'var(--gold-glow)',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>✦</div>
                <div
                  className="font-display"
                  style={{
                    fontSize: 20,
                    color: 'var(--gold)',
                    marginBottom: 8,
                  }}
                >
                  Message Sent
                </div>
                <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
                  I'll get back to you within 24 hours.
                </div>
              </div>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                  }}
                >
                  <input
                    className="form-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                  />
                  <input
                    className="form-input"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    type="email"
                  />
                </div>
                <input
                  className="form-input"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject / Role / Opportunity"
                />
                <textarea
                  className="form-input"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  style={{
                    resize: 'vertical',
                    fontFamily: "'Crimson Pro', serif",
                    fontSize: 16,
                  }}
                />
                <button
                  className="btn-primary"
                  onClick={handleSubmit}
                  style={{ width: '100%', padding: '16px 32px', fontSize: 11 }}
                >
                  Send Message ✦
                </button>
                <p
                  className="font-mono"
                  style={{
                    fontSize: 9,
                    color: 'var(--text-muted)',
                    textAlign: 'center',
                    letterSpacing: '0.08em',
                  }}
                >
                  {/* Replace with your actual form backend (EmailJS, Formspree, etc.) */}
                  Connect to EmailJS / Formspree / your own API for live form
                  submission
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        padding: '40px 48px',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg-void)',
      }}
    >
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.15em',
        }}
      >
        © 2026 Mohamed Abdelnaby
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
        }}
      >
        AI / Machine Learning Engineer · Cairo, Egypt
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
        }}
      >
       
      </div>
    </footer>
  );
}

// ─── Root App ────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <>
      <style>{STYLE}</style>
      <div className="noise">
        <Nav />
        <Hero />
        <hr className="hr-gold" />
        <About />
        <hr className="hr-gold" />
        <TechStack />
        <hr className="hr-gold" />
        <Timeline />
        <hr className="hr-gold" />
        <Lab />
        <hr className="hr-gold" />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
