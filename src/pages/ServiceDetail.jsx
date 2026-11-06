import React, { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronDown, Sparkles } from "lucide-react";
import { Reveal, Eyebrow, SpotlightCard } from "../shared";
import { SERVICES, getServiceBySlug } from "../data/services";

// Slugs that should be shown together on one combined page, whichever one is clicked.
const COMBINED_GROUP = ["office-management", "payments-management"];

function FaqItem({ q, a, accent }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ax-dark-panel rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown size={16} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: accent }} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-slate-400 leading-relaxed">{a}</div>}
    </div>
  );
}

function ServiceColumn({ service }) {
  const { icon: Icon, title, tagline, desc, accent, features, benefits, faqs } = service;
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
        >
          <Icon size={19} style={{ color: accent }} />
        </div>
        <h2 className="ax-display text-xl sm:text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-slate-500 mb-5">{tagline}</p>
      <p className="text-slate-400 leading-relaxed mb-8 text-sm">{desc}</p>

      <h3 className="ax-display text-sm font-semibold mb-4 uppercase tracking-wider text-slate-500">What's included</h3>
      <div className="space-y-3 mb-8">
        {features.map((f) => (
          <div key={f} className="flex items-start gap-3">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
            <span className="text-sm text-slate-300 leading-relaxed">{f}</span>
          </div>
        ))}
      </div>

      <h3 className="ax-display text-sm font-semibold mb-4 uppercase tracking-wider text-slate-500">Why it matters</h3>
      <div className="space-y-3 mb-8">
        {benefits.map((b) => (
          <div key={b} className="flex items-start gap-3">
            <Sparkles size={15} className="shrink-0 mt-0.5" style={{ color: accent }} />
            <span className="text-sm text-slate-300 leading-relaxed">{b}</span>
          </div>
        ))}
      </div>

      <h3 className="ax-display text-sm font-semibold mb-4 uppercase tracking-wider text-slate-500">FAQs</h3>
      <div className="space-y-3">
        {faqs.map((f) => (
          <FaqItem key={f.q} q={f.q} a={f.a} accent={accent} />
        ))}
      </div>
    </div>
  );
}

function CombinedServicesPage({ services }) {
  const others = SERVICES.filter((s) => !COMBINED_GROUP.includes(s.slug)).slice(0, 3);

  return (
    <>
      <section className="bg-[#070911] border-b border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-16">
          <Reveal>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors mb-8">
              <ArrowLeft size={13} /> All Services
            </Link>
            <Eyebrow>Our Services</Eyebrow>
            <h1 className="ax-display text-3xl sm:text-4xl font-semibold max-w-2xl mb-4">
              Office &amp; Payments Management
            </h1>
            <p className="text-slate-400 max-w-xl text-base leading-relaxed">
              Two closely related services we often deliver together — day-to-day office admin,
              and end-to-end payments handling.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0D16]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <ServiceColumn service={services[0]} />
          </Reveal>
          <Reveal delay={120}>
            <div className="lg:border-l lg:border-[#1C2130] lg:pl-16">
              <ServiceColumn service={services[1]} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0D16] border-t border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <Reveal>
            <div className="ax-dark-panel rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div>
                <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-2">Need one, or both?</h2>
                <p className="text-slate-400 text-sm max-w-md">
                  Tell us what your team needs help with and we'll put together the right mix of support.
                </p>
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg ax-grad-bg text-sm font-medium text-white shrink-0">
                Get In Touch <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0D16] border-t border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <Eyebrow>Explore More</Eyebrow>
            <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-10 max-w-lg">
              Other services you might need.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link to={`/services/${s.slug}`}>
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
    </>
  );
}

function SingleServicePage({ service }) {
  const { icon: Icon, title, tagline, desc, accent, features, benefits, faqs } = service;
  const others = SERVICES.filter((s) => s.slug !== service.slug && !COMBINED_GROUP.includes(s.slug)).slice(0, 3);

  const process = [
    { t: "Discover", d: `We start by understanding your goals and how ${title.toLowerCase()} fits into them.` },
    { t: "Plan", d: "We map out scope, timeline, and the approach best suited to your constraints." },
    { t: "Build", d: "Our team designs and builds the solution, with regular check-ins along the way." },
    { t: "Deliver & Support", d: "We launch, then stick around for support, monitoring, and iteration." },
  ];

  return (
    <>
      <section className="bg-[#070911] border-b border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-16">
          <Reveal>
            <Link to="/services" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors mb-8">
              <ArrowLeft size={13} /> All Services
            </Link>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
              >
                <Icon size={24} style={{ color: accent }} />
              </div>
              <Eyebrow>Our Services</Eyebrow>
            </div>
            <h1 className="ax-display text-3xl sm:text-4xl font-semibold max-w-2xl mb-4">{title}</h1>
            <p className="text-slate-400 max-w-xl text-base leading-relaxed">{tagline}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0D16]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-[1.3fr_1fr] gap-14">
          <Reveal>
            <h2 className="ax-display text-xl font-semibold mb-4">Overview</h2>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-xl">{desc}</p>

            <h2 className="ax-display text-xl font-semibold mb-5">What's included</h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl mb-10">
              {features.map((f) => (
                <div key={f} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" style={{ color: accent }} />
                  <span className="text-sm text-slate-300 leading-relaxed">{f}</span>
                </div>
              ))}
            </div>

            <h2 className="ax-display text-xl font-semibold mb-5">Why it matters</h2>
            <div className="space-y-4 max-w-xl">
              {benefits.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <Sparkles size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
                  <span className="text-sm text-slate-300 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="ax-dark-panel rounded-2xl p-8 sticky top-28">
              <h3 className="ax-display font-semibold mb-2">Interested in {title.toLowerCase()}?</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Tell us about your project and we'll get back to you with next steps — no obligation.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg ax-grad-bg text-sm font-medium text-white"
              >
                Get In Touch <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0D16] border-t border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-14 max-w-lg">Our process for this service.</h2>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #38BDF8, #0A1F6B, transparent)" }} />
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
              {process.map((s, i) => (
                <Reveal key={s.t} delay={i * 90}>
                  <div className="flex flex-col items-start">
                    <div className="w-12 h-12 rounded-full ax-dark-panel flex items-center justify-center mb-5 relative z-10">
                      <span className="text-xs font-semibold ax-grad-text">0{i + 1}</span>
                    </div>
                    <h3 className="ax-display font-medium mb-1.5">{s.t}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0D16] border-t border-[#1C2130]">
        <div className="max-w-4xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <Eyebrow>FAQs</Eyebrow>
            <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-10 max-w-lg">Common questions.</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <FaqItem q={f.q} a={f.a} accent={accent} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0D16] border-t border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <Eyebrow>Explore More</Eyebrow>
            <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-10 max-w-lg">
              Other services you might need.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <Link to={`/services/${s.slug}`}>
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
    </>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/services" replace />;

  if (COMBINED_GROUP.includes(slug)) {
    const combined = COMBINED_GROUP.map((s) => getServiceBySlug(s)).filter(Boolean);
    if (combined.length === 2) return <CombinedServicesPage services={combined} />;
  }

  return <SingleServicePage service={service} />;
}
