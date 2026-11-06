import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "../shared";
import { PROJECTS, getProjectBySlug } from "../data/portfolio";

export default function PortfolioDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/portfolio" replace />;

  const { title, tag, img, accent, client, overview, highlights, results } = project;
  const others = PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="bg-[#F5F7FB] text-[#10131C] border-b border-[#E4E8F1]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-14">
          <Reveal>
            <Link to="/portfolio" className="inline-flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#10131C] transition-colors mb-8">
              <ArrowLeft size={13} /> All Projects
            </Link>
            <Eyebrow dark={false}>{tag}</Eyebrow>
            <h1 className="ax-display text-3xl sm:text-4xl font-semibold max-w-2xl mb-3">{title}</h1>
            <p className="text-[#5B6178] text-base">Client: {client}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F5F7FB] text-[#10131C]">
        <div className="max-w-5xl mx-auto px-6 md:px-10 -mt-2 pb-4">
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-[#E4E8F1] relative">
              <img src={img} alt={title} className="w-full h-[280px] sm:h-[400px] object-cover" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 60%, ${accent}22)` }} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0D16]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-[1.3fr_1fr] gap-14">
          <Reveal>
            <h2 className="ax-display text-xl font-semibold mb-4">Overview</h2>
            <p className="text-slate-400 leading-relaxed mb-10 max-w-xl">{overview}</p>

            <h2 className="ax-display text-xl font-semibold mb-5">Key highlights</h2>
            <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
              {highlights.map((h) => (
                <div key={h} className="flex items-start gap-3">
                  <CheckCircle2 size={17} className="shrink-0 mt-0.5" style={{ color: accent }} />
                  <span className="text-sm text-slate-300 leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="ax-dark-panel rounded-2xl p-8">
              <h3 className="ax-display font-semibold mb-5">Results</h3>
              <div className="space-y-5 mb-8">
                {results.map(([stat, label]) => (
                  <div key={label}>
                    <div className="ax-display text-2xl font-semibold" style={{ color: accent }}>{stat}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg ax-grad-bg text-sm font-medium text-white"
              >
                Start a Similar Project <ArrowRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0A0D16] border-t border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
          <Reveal>
            <Eyebrow>More Work</Eyebrow>
            <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-10 max-w-lg">
              Other projects you might like.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link to={`/portfolio/${p.slug}`}>
                  <div className="ax-dark-panel ax-card-hover on-dark rounded-xl p-5">
                    <div className="w-full h-36 rounded-lg overflow-hidden mb-4">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="ax-display font-medium text-[15px]">{p.title}</h3>
                        <p className="text-[13px] text-slate-500 mt-0.5">{p.tag}</p>
                      </div>
                      <ArrowUpRight size={16} className="text-slate-600" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
