import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow, SpotlightCard, DoodleStar } from "../shared";
import { SERVICES } from "../data/services";

function ServicesHero() {
  return (
    <section className="bg-[#070911] border-b border-[#1C2130]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16">
        <Reveal>
          <div className="flex items-center gap-2">
            <Eyebrow>Our Services</Eyebrow>
            <DoodleStar size={16} color="#FF8A5B" className="mb-4" />
          </div>
          <h1 className="ax-display text-3xl sm:text-4xl font-semibold max-w-xl">
            Comprehensive IT solutions to help your business thrive.
          </h1>
          <p className="text-slate-400 max-w-lg mt-4 leading-relaxed">
            From web and mobile to cloud, security, and ongoing support — everything you need
            under one roof. Tap any service below to see the full details.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceGrid() {
  return (
    <section className="bg-[#0A0D16]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <Link to={`/services/${s.slug}`} className="block h-full">
                <SpotlightCard className="ax-dark-panel ax-card-hover on-dark rounded-xl p-6 h-full group">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center"
                      style={{ background: `${s.accent}22`, border: `1px solid ${s.accent}55` }}
                    >
                      <s.icon size={19} style={{ color: s.accent }} />
                    </div>
                    <ArrowUpRight size={16} className="text-slate-600 group-hover:text-slate-300 transition-colors" />
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

function ServicesCTA() {
  return (
    <section className="bg-[#F5F7FB] text-[#10131C] border-t border-[#E4E8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <Reveal>
          <div className="ax-light-panel rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-2">Not sure which service fits?</h2>
              <p className="text-[#5B6178] text-sm max-w-md">Tell us about your project and we'll recommend the right approach — no obligation.</p>
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg ax-grad-bg text-sm font-medium text-white shrink-0">
              Get In Touch <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServiceGrid />
      <ServicesCTA />
    </>
  );
}
