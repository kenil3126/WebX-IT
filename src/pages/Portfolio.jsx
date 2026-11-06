import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Sun, Landmark, Home as HomeIcon, Truck, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "../shared";
import { PROJECTS } from "../data/portfolio";

function MockScreen({ img, accent }) {
  return (
    <div className="w-full h-44 rounded-lg border border-[#E4E8F1] overflow-hidden relative group/screen">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white border-b border-[#E4E8F1]">
        <span className="w-2 h-2 rounded-full bg-[#FF8A8A]" />
        <span className="w-2 h-2 rounded-full bg-[#FFD37A]" />
        <span className="w-2 h-2 rounded-full bg-[#8AF0A0]" />
      </div>
      <img
        src={img}
        alt=""
        className="w-full h-[calc(100%-2rem)] object-cover transition-transform duration-500 group-hover/screen:scale-105"
      />
      <div className="absolute inset-0 top-8" style={{ background: `linear-gradient(180deg, transparent 60%, ${accent}22)` }} />
    </div>
  );
}

function PortfolioHero() {
  return (
    <section className="bg-[#F5F7FB] text-[#10131C] border-b border-[#E4E8F1]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-14">
        <Reveal>
          <Eyebrow dark={false}>Featured Work</Eyebrow>
          <h1 className="ax-display text-3xl sm:text-4xl font-semibold max-w-xl relative">
            Some of our recent{" "}
            <span className="relative inline-block">
              projects
            </span>{" "}
            that make an impact.
          </h1>
        </Reveal>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section className="bg-[#F5F7FB] text-[#10131C]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link to={`/portfolio/${p.slug}`} className="block h-full">
                <motion.div
                  className="ax-light-panel ax-card-hover on-light rounded-xl p-5 h-full"
                  whileHover={{ scale: 1.025, y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                >
                  <MockScreen img={p.img} accent={p.accent} />
                  <div className="flex items-center justify-between mt-5">
                    <div>
                      <h3 className="ax-display font-medium">{p.title}</h3>
                      <p className="text-[13px] text-[#6B7280] mt-1">{p.tag}</p>
                    </div>
                    <ArrowUpRight size={17} className="text-[#9CA3AF]" />
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const list = [
    { icon: Heart, label: "Healthcare" },
    { icon: ShoppingCart, label: "E-commerce" },
    { icon: Sun, label: "Renewable Energy" },
    { icon: Landmark, label: "Finance" },
    { icon: HomeIcon, label: "Real Estate" },
    { icon: Truck, label: "Logistics" },
  ];
  return (
    <section className="bg-[#0A0D16] border-t border-[#1C2130]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <Reveal>
          <Eyebrow>Industries We Serve</Eyebrow>
          <h2 className="ax-display text-2xl sm:text-3xl font-semibold mb-10 max-w-lg">
            We provide IT solutions across a wide range of industries.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {list.map((ind, i) => (
            <Reveal key={ind.label} delay={i * 60}>
              <div className="ax-dark-panel ax-card-hover on-dark rounded-xl p-6 flex flex-col items-center text-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#141826] flex items-center justify-center">
                  <ind.icon size={19} className="text-sky-300" />
                </div>
                <span className="text-sm font-medium">{ind.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      <PortfolioHero />
      <FeaturedWork />
      <Industries />
    </>
  );
}
