import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------------------
   DESIGN TOKENS — WebX IT Services
   Ink        #0A0D16   premium deep navy background (radial glow at top)
   Panel      #12151F   dark card surface
   Line       #232838   hairline on dark
   Light bg   #F5F7FB   cool off-white section background
   Light card #FFFFFF   light card surface
   Primary    #0A1F6B → #1D5FEA → #38BDF8   navy-blue-sky gradient
--------------------------------------------------------------------------- */

export const FONT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');

  .ax-root {
    background: radial-gradient(ellipse 1200px 800px at 50% -10%, #101833 0%, #0A0D16 45%, #070911 100%);
    background-attachment: fixed;
    color: #EDF1F8;
    font-family: 'Manrope', sans-serif;
  }
  .ax-display { font-family: 'Poppins', sans-serif; }

  .ax-grad-text {
    background: linear-gradient(90deg, #0A1F6B, #1D5FEA, #38BDF8);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  .ax-grad-bg { background: linear-gradient(90deg, #0A1F6B, #1D5FEA); }
  .ax-grad-bg:hover { filter: brightness(1.08); }

  .ax-dark-panel { background: #12151F; border: 1px solid #232838; }
  .ax-light-panel { background: #FFFFFF; border: 1px solid #E4E8F1; }

  .ax-card-hover { transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease; }
  .ax-card-hover:hover { transform: translateY(-4px); }
  .ax-card-hover.on-dark:hover { border-color: rgba(29,95,234,0.5); box-shadow: 0 24px 48px -24px rgba(29,95,234,0.35); }
  .ax-card-hover.on-light:hover { box-shadow: 0 24px 48px -24px rgba(29,95,234,0.18); border-color: #A9C6F5; }

  .ax-glow { box-shadow: 0 0 120px 40px rgba(29,95,234,0.16); }

  .ax-reveal { opacity: 0; transform: translateY(24px); transition: opacity 700ms ease, transform 700ms ease; }
  .ax-reveal.ax-in { opacity: 1; transform: translateY(0); }

  .ax-float { animation: ax-floaty 5s ease-in-out infinite; }
  @keyframes ax-floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

  .ax-pulse { animation: ax-pulse-op 2.6s ease-in-out infinite; }
  @keyframes ax-pulse-op { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

  .ax-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
  .ax-scrollbar::-webkit-scrollbar-thumb { background: #232838; border-radius: 8px; }

  html { scroll-behavior: smooth; }

  /* Glassmorphism panel */
  .ax-glass {
    background: rgba(10, 14, 28, 0.55);
    border: 1px solid rgba(94,150,255,0.18);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  /* Mouse-reactive spotlight card */
  .ax-spotlight { position: relative; overflow: hidden; }
  .ax-spotlight::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(29,95,234,0.20), transparent 65%);
    opacity: 0;
    transition: opacity 300ms ease;
    pointer-events: none;
  }
  .ax-spotlight:hover::before { opacity: 1; }

  /* Marquee */
  .ax-marquee-track { display: flex; width: max-content; animation: ax-marquee 26s linear infinite; }
  .ax-marquee-wrap:hover .ax-marquee-track { animation-play-state: paused; }
  @keyframes ax-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

  /* Blurred gradient mesh blobs */
  .ax-blob { position: absolute; border-radius: 9999px; filter: blur(90px); pointer-events: none; }
  .ax-blob-spin { animation: ax-blob-move 18s ease-in-out infinite; }
  @keyframes ax-blob-move {
    0%, 100% { transform: translate(0, 0) scale(1); }
    50% { transform: translate(30px, -20px) scale(1.12); }
  }

  /* Scroll progress bar */
  .ax-progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 60; transform-origin: 0 50%; background: linear-gradient(90deg, #0A1F6B, #1D5FEA, #38BDF8); }

  /* Nav link underline — grows on hover / active route, Clover-style */
  .ax-nav-link { position: relative; padding-bottom: 4px; }
  .ax-nav-link::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #0A1F6B, #1D5FEA);
    transition: width 250ms ease;
  }
  .ax-nav-link:hover::after,
  .ax-nav-link.is-active::after { width: 100%; }

  /* Mega-dropdown */
  .ax-dropdown-wrap:hover .ax-dropdown-panel,
  .ax-dropdown-wrap:focus-within .ax-dropdown-panel {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  .ax-dropdown-panel {
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: opacity 200ms ease, transform 200ms ease, visibility 200ms;
  }

  @media (prefers-reduced-motion: reduce) {
    .ax-float, .ax-pulse { animation: none !important; }
    .ax-reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
    html { scroll-behavior: auto; }
    .ax-blob-spin, .ax-marquee-track { animation: none !important; }
  }
`;

// Thin gradient bar at the very top that fills as the user scrolls the page
export function ScrollProgress() {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScale(max > 0 ? h.scrollTop / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="ax-progress" style={{ transform: `scaleX(${scale})` }} />;
}

// Card wrapper whose glow follows the cursor — subtle, premium micro-interaction
export function SpotlightCard({ children, className = "", ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove} className={`ax-spotlight ${className}`} {...rest}>
      {children}
    </div>
  );
}

// Button that gently pulls toward the cursor on hover — a small "magnetic" touch
export function MagneticButton({ children, className = "", href = "#", ...rest }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    setOffset({ x, y });
  };
  const reset = () => setOffset({ x: 0, y: 0 });
  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 12, mass: 0.4 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

// Seamless infinite-scrolling row (e.g. client / tech marquee)
export function Marquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="ax-marquee-wrap overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="ax-marquee-track gap-x-14 pr-14">
        {doubled.map((c, i) => (
          <span key={i} className="ax-display text-sm sm:text-base text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// Scroll-reveal wrapper — fades/slides an element in once it enters the viewport
export function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`ax-reveal ${inView ? "ax-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, dark = true }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-6 h-px" style={{ background: "#1D5FEA" }} />
      <span className={`text-[11px] font-semibold uppercase tracking-wider ${dark ? "text-sky-300" : "text-blue-600"}`}>
        {children}
      </span>
    </div>
  );
}

// Mouse parallax hook — small, performant 2D offsets for subtle 3D feel
export function useMouseParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return pos;
}

// Subtle particle background for a premium feel (canvas, low-cost animation)
export function FancyParticles() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let particles = [];
    let raf = null;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function init() {
      particles = [];
      const count = Math.min(120, Math.floor((w * h) / 45000));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.8 + 0.6,
          a: Math.random() * 0.6 + 0.12,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
        ctx.beginPath();
        ctx.fillStyle = `rgba(249,150,60,${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    init();
    frame();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: "screen", opacity: 0.5 }} />;
}

// Hand-drawn style SVG accents — organic, slightly imperfect strokes that
// balance the site's otherwise precise, AI-polished look.
export function DoodleSquiggle({ className = "", color = "#FF3D9A", width = 160 }) {
  return (
    <svg viewBox="0 0 160 22" width={width} height={width * 0.14} className={className} fill="none">
      <path
        d="M2 14C14 4, 22 20, 34 10 C46 0, 54 20, 66 11 C78 2, 86 19, 98 10 C110 1, 118 18, 130 9 C138 3, 146 12, 158 8"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleCircle({ className = "", color = "#C6FF3D", size = 140 }) {
  return (
    <svg viewBox="0 0 140 140" width={size} height={size} className={className} fill="none">
      <path
        d="M70 8C100 6 132 30 130 68C128 108 100 132 66 130C30 128 8 102 10 68C12 34 40 10 70 8Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className = "", color = "#FFD23D", width = 90 }) {
  return (
    <svg viewBox="0 0 90 60" width={width} height={width * 0.66} className={className} fill="none">
      <path d="M4 6C24 10 46 34 58 50" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M40 46L58 52L54 32" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleStar({ className = "", color = "#FF8A5B", size = 28 }) {
  return (
    <svg viewBox="0 0 28 28" width={size} height={size} className={className} fill="none">
      <path
        d="M14 2 L16.4 10.8 L25 12.5 L17.2 17.6 L19.6 26 L14 20.5 L8.4 26 L10.8 17.6 L3 12.5 L11.6 10.8 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}


// either on scroll-into-view or on hover. Real motion, not just a fade.
export function KineticText({
  text,
  as: Tag = "span",
  className = "",
  mode = "scroll", // "scroll" | "hover"
  by = "letter",   // "letter" | "word"
  delay = 0,
}) {
  const units = by === "letter" ? Array.from(text) : text.split(" ");
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: by === "letter" ? 0.022 : 0.06, delayChildren: delay / 1000 } },
  };
  const child = {
    hidden: { opacity: 0, y: "0.6em", rotateX: -40 },
    show: { opacity: 1, y: "0em", rotateX: 0, transition: { duration: 0.45, ease: [0.2, 0.65, 0.3, 1] } },
  };

  const commonProps =
    mode === "scroll"
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.6 } }
      : { initial: "hidden", whileHover: "show", animate: "hidden" };

  return (
    <Tag className={className} style={{ perspective: 400 }}>
      <motion.span variants={container} {...commonProps} style={{ display: "inline-block" }}>
        {units.map((u, i) => (
          <motion.span
            key={i}
            variants={child}
            style={{ display: "inline-block", whiteSpace: u === " " ? "pre" : "normal", transformOrigin: "50% 100%" }}
          >
            {u === " " ? "\u00A0" : u}
            {by === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}


export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
