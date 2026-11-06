import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, ShieldCheck, Award, Sparkles,
  ArrowRight, Quote, ChevronLeft, ChevronRight,
} from "lucide-react";
import {
  Reveal, Eyebrow, SpotlightCard, MagneticButton,
  useMouseParallax, FancyParticles, KineticText,
  DoodleStar,
} from "../shared";
import { SERVICES } from "../data/services";
import Product3D from "../components/Product3D";
import { useState, useEffect } from "react";

function RotatingTagline() {
  const taglines = [
    "AI-powered cloud migrations for growing teams",
    "Custom apps shipped in weeks, not quarters",
    "24/7 managed IT support that actually responds",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % taglines.length), 3200);
    return () => clearInterval(t);
  }, [taglines.length]);
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#232838] bg-[#12151F]/60 px-4 py-1.5 mb-6 overflow-hidden">
      <span className="w-1.5 h-1.5 rounded-full ax-grad-bg ax-pulse shrink-0" />
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="text-xs text-slate-300 whitespace-nowrap"
        >
          {taglines[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  const pos = useMouseParallax();
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070911]">
      <div className="ax-blob ax-blob-spin w-[420px] h-[420px] -top-32 -left-24" style={{ background: "radial-gradient(circle, rgba(109,93,252,0.35), transparent 70%)" }} />
      <div className="ax-blob ax-blob-spin w-[380px] h-[380px] top-1/3 -right-20" style={{ background: "radial-gradient(circle, rgba(79,140,255,0.3), transparent 70%)", animationDelay: "4s" }} />
      <FancyParticles />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A0D16]" />

      {/* Oversized watermark type — big bold text used as a background layout element */}
      <div className="pointer-events-none select-none absolute -top-4 left-1/2 -translate-x-1/2 w-full text-center overflow-hidden z-20">
        <span
          className="ax-display font-extrabold leading-none whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 22vw, 15rem)", color: "transparent", WebkitTextStroke: "1px rgba(139,124,255,0.14)" }}
        >
          WebX
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-24 lg:px-10">
        <div className="grid grid-cols-1 items-center lg:items-start gap-16 lg:grid-cols-2">
          <Reveal>
            <RotatingTagline />
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#FF3D9A" }} />
              <span className="text-[12px] font-semibold uppercase tracking-wider text-sky-300">
                We Build Solutions
              </span>
            </div>
            <h1 className="ax-display text-5xl sm:text-6xl lg:text-[4.4rem] font-extrabold leading-[0.98] mb-6 tracking-tight">
              <KineticText text="Technology Solutions That Drive Your Business" by="word" mode="scroll" />{" "}
              <span className="relative inline-block">
                <KineticText text="Forward" by="letter" mode="scroll" delay={500} className="ax-grad-text" />
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-md mb-9 leading-relaxed">
              Delivering innovative IT solutions that empower businesses to grow, scale, and
              succeed in the digital era.
            </p>
            <div className="relative flex flex-wrap items-center gap-4 mb-12">
              <MagneticButton href="/services" className="group inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg ax-grad-bg font-medium text-sm text-white transition-all">
                Explore Services
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton href="/contact" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg border border-[#2A3040] hover:border-slate-400 transition-colors text-sm text-slate-200">
                Contact Us
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:mt-[85px]">
            <div className="relative flex items-center justify-center lg:-mr-10 xl:-mr-16">
              <div className="ax-blob w-[440px] h-[440px]" style={{ background: "radial-gradient(circle, rgba(79,140,255,0.4), transparent 70%)" }} />
              <div className="ax-blob ax-blob-spin w-[300px] h-[300px]" style={{ background: "radial-gradient(circle, rgba(139,124,255,0.35), transparent 70%)", animationDelay: "2s" }} />
              <div
                className="relative z-10 w-full max-w-lg lg:max-w-xl mx-auto rounded-2xl overflow-hidden ax-glass p-2 drop-shadow-[0_40px_80px_rgba(79,92,255,0.45)] ax-float"
                style={{ transform: `translate(${pos.x * 6}px, ${pos.y * 6}px)`, transition: "transform 200ms ease-out" }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?fm=jpg&q=80&w=1200&auto=format&fit=crop"
                  alt="WebX IT Services engineers collaborating on a software project"
                  className="w-full h-[320px] sm:h-[380px] object-cover rounded-xl"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesStrip() {
  return (
    <section className="bg-[#0A0D16] border-y border-[#1C2130]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2">
                <Eyebrow>Our Services</Eyebrow>
                <DoodleStar size={16} color="#FF8A5B" className="mb-4" />
              </div>
              <h2 className="ax-display text-3xl sm:text-4xl font-semibold max-w-lg">
                Comprehensive IT solutions to help your business thrive.
              </h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-lg ax-grad-bg font-medium text-white shrink-0">
              View All Services
            </Link>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 70}>
              <Link to={`/services/${s.slug}`} className="block h-full">
                <SpotlightCard className="ax-dark-panel ax-card-hover on-dark rounded-xl p-6 h-full">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center mb-6"
                    style={{ background: `${s.accent}22`, border: `1px solid ${s.accent}55` }}
                  >
                    <s.icon size={19} style={{ color: s.accent }} />
                  </div>
                  <h3 className="ax-display font-medium mb-2 text-[15px]">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.tagline}</p>
                </SpotlightCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsTeaser() {
  const left = [
    { icon: Users, title: "Experienced Professionals", desc: "Skilled team with proven industry experience." },
    { icon: ShieldCheck, title: "Client-Centric Approach", desc: "Your goals are our priority at every step." },
  ];
  const right = [
    { icon: Sparkles, title: "Innovative Solutions", desc: "Smart solutions that drive real business impact." },
    { icon: Award, title: "Cost-Effective", desc: "High-quality services with transparent pricing." },
  ];

  const Item = ({ it, align }) => (
    <div className={`flex gap-4 ${align === "right" ? "sm:flex-row-reverse sm:text-right" : ""}`}>
      <div className="w-10 h-10 shrink-0 rounded-lg ax-dark-panel flex items-center justify-center">
        <it.icon size={17} className="text-sky-300" />
      </div>
      <div>
        <h3 className="ax-display font-medium mb-1 text-[15px]">{it.title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{it.desc}</p>
      </div>
    </div>
  );

  return (
    <section className="bg-[#0A0D16]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal className="text-center max-w-xl mx-auto mb-16">
          <Eyebrow><span className="mx-auto">Why Choose Us</span></Eyebrow>
          <h2 className="ax-display text-3xl sm:text-4xl font-semibold">
            We combine expertise, technology, and dedication to deliver exceptional results.
          </h2>
        </Reveal>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-10 items-center">
          <div className="space-y-10">
            {left.map((it, i) => (
              <Reveal key={it.title} delay={i * 90}><Item it={it} /></Reveal>
            ))}
          </div>
          <Reveal delay={150} className="hidden lg:flex justify-center">
            <div className="relative w-52 h-52 rounded-full ax-dark-panel flex items-center justify-center">
              <div className="absolute inset-3 rounded-full border border-dashed border-[#2A3040] ax-float" style={{ animationDuration: "9s" }} />
              <div className="w-32 h-32 rounded-2xl flex items-center justify-center p-2">
                <img src="/logo.png" alt="WebX IT Services" className="w-full h-full object-contain" />
              </div>
            </div>
          </Reveal>
          <div className="space-y-10">
            {right.map((it, i) => (
              <Reveal key={it.title} delay={i * 90}><Item it={it} align="right" /></Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={200} className="text-center mt-14">
          <Link to="/about" className="inline-flex items-center gap-2 text-sm px-6 py-3 rounded-lg border border-[#2A3040] hover:border-blue-500 transition-colors">
            More About Us <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { text: "WebX IT Services delivered an amazing solution that exceeded our expectations. Their team is professional, responsive, and highly skilled.", name: "Ravi Sharma", role: "CEO, FinEdge Solutions", avatar: "webxit-ravi" },
    { text: "They understood our constraints from day one and shipped on schedule without cutting corners on quality.", name: "Priya Nair", role: "COO, Lumen Retail", avatar: "webxit-priya" },
    { text: "Support after launch has been just as strong as the build itself — issues get resolved before we even notice them.", name: "Aman Verma", role: "Founder, Northfield Health", avatar: "webxit-aman" },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 5500);
    return () => clearInterval(t);
  }, [quotes.length]);

  const prev = () => setIdx((i) => (i - 1 + quotes.length) % quotes.length);
  const next = () => setIdx((i) => (i + 1) % quotes.length);

  return (
    <section className="bg-[#0A0D16] border-t border-[#1C2130]">
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-24 text-center">
        <Reveal><Eyebrow><span className="mx-auto">What Clients Say</span></Eyebrow></Reveal>
        <Reveal delay={100}>
          <div className="ax-dark-panel rounded-2xl p-8 sm:p-12">
            <Quote className="mx-auto mb-6 text-blue-500" size={28} />
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="ax-display text-lg sm:text-xl leading-relaxed mb-8 min-h-[6rem]"
            >
              "{quotes[idx].text}"
            </motion.p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <img
                src={`https://i.pravatar.cc/80?u=${quotes[idx].avatar}`}
                alt={quotes[idx].name}
                className="w-10 h-10 rounded-full object-cover border border-[#2A3040]"
              />
              <div className="text-left">
                <div className="font-medium text-sm">{quotes[idx].name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{quotes[idx].role}</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button onClick={prev} aria-label="Previous testimonial" className="w-9 h-9 rounded-full border border-[#2A3040] flex items-center justify-center hover:border-blue-500 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <div className="flex gap-2">
                {quotes.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} aria-label={`Go to testimonial ${i + 1}`} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === idx ? "ax-grad-bg" : "bg-[#232838]"}`} />
                ))}
              </div>
              <button onClick={next} aria-label="Next testimonial" className="w-9 h-9 rounded-full border border-[#2A3040] flex items-center justify-center hover:border-blue-500 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-[#0A0D16] border-t border-[#1C2130]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <Reveal>
          <div className="ax-dark-panel rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-2">Let's Build Something Great Together</h2>
              <p className="text-slate-400 text-sm max-w-md">Have a project in mind? Let's discuss how we can help you achieve your business goals.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg ax-grad-bg text-sm font-medium text-white shrink-0">
              Contact Us <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Showcase3D() {
  return (
    <section className="bg-[#0A0D16] border-t border-[#1C2130] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <Eyebrow>Built To Perform</Eyebrow>
          <h2 className="ax-display text-3xl sm:text-4xl font-semibold mb-5 max-w-md">
            Engineering that holds up under real pressure.
          </h2>
          <p className="text-slate-400 max-w-md leading-relaxed mb-2">
            Every product we ship is stress-tested, monitored, and built to scale — not just to
            demo well on day one.
          </p>
          <p className="text-xs text-slate-600 uppercase tracking-wider mt-6">Drag to rotate</p>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative h-[340px] sm:h-[420px]">
            <div className="ax-blob w-[360px] h-[360px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(109,93,252,0.3), transparent 70%)" }} />
            <Product3D className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <Showcase3D />
      <WhyChooseUsTeaser />
      <Testimonials />
      <CTABanner />
    </>
  );
}
