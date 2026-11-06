import React from "react";
import CountUp from "react-countup";
import { Sparkles, Users, ShieldCheck, Clock, Award, Headphones } from "lucide-react";
import { Reveal, Eyebrow, DoodleCircle, DoodleStar } from "../shared";

function AboutIntro() {
  const stats = [
    [10, "+", "Years Experience"],
    [200, "+", "Projects Delivered"],
    [98, "%", "Client Satisfaction"],
    [30, "+", "Expert Team"],
  ];
  return (
    <section className="bg-[#F5F7FB] text-[#10131C]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <Eyebrow dark={false}>About Us</Eyebrow>
          <h1 className="ax-display text-3xl sm:text-4xl font-semibold mb-5 max-w-lg">
            Empowering Businesses Through{" "}
            <span className="relative inline-block">
              Technology
            </span>
          </h1>
          <p className="text-[#5B6178] max-w-md mb-10 leading-relaxed">
            WebX IT Services is a leading IT solutions provider helping businesses innovate,
            transform, and grow in the digital world. We partner with organizations of every size
            to design, build, and support technology that actually moves the business forward.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map(([n, suffix, l], i) => (
              <div key={l} className="relative">
                <div className="ax-display text-2xl sm:text-3xl font-semibold ax-grad-text">
                  <CountUp end={n} duration={2.2} enableScrollSpy scrollSpyOnce suffix={suffix} />
                </div>
                <div className="text-xs text-[#6B7280] mt-1">{l}</div>
                {i === 2 && <DoodleStar size={16} color="#FF8A5B" className="absolute -top-2 -right-1" />}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative">
            <DoodleCircle className="hidden lg:block absolute -top-8 -right-8 -z-10" size={110} color="#C6FF3D" />
            <div className="ax-blob w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background: "radial-gradient(circle, rgba(139,124,255,0.25), transparent 70%)" }} />
            <div className="relative rounded-2xl overflow-hidden ax-light-panel p-2">
              <div className="rounded-xl overflow-hidden h-72 sm:h-80">
                <img
                  src="https://images.unsplash.com/photo-1748256622734-92241ae7b43f?fm=jpg&q=80&w=1200&auto=format&fit=crop"
                  alt="WebX IT Services team collaborating in the office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-56 bg-white rounded-xl shadow-lg px-5 py-4 flex items-center gap-3 border border-[#E4E8F1]">
                <div className="w-10 h-10 rounded-lg ax-grad-bg flex items-center justify-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight">Your Vision</div>
                  <div className="text-sm font-semibold leading-tight">Our Mission</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const left = [
    { icon: Users, title: "Experienced Professionals", desc: "Skilled team with proven industry experience." },
    { icon: ShieldCheck, title: "Client-Centric Approach", desc: "Your goals are our priority at every step." },
    { icon: Clock, title: "On-Time Delivery", desc: "We value your time and ensure timely delivery." },
  ];
  const right = [
    { icon: Sparkles, title: "Innovative Solutions", desc: "Smart solutions that drive real business impact." },
    { icon: Award, title: "Cost-Effective", desc: "High-quality services with transparent pricing." },
    { icon: Headphones, title: "24/7 Support", desc: "Round-the-clock support whenever you need it." },
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
            <div className="relative w-48 h-48 rounded-full ax-dark-panel flex items-center justify-center">
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
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Discover", d: "Understand your goals & challenges." },
    { n: "02", t: "Plan", d: "Strategise the right solution." },
    { n: "03", t: "Design", d: "Create intuitive & impactful designs." },
    { n: "04", t: "Develop", d: "Build robust & scalable solutions." },
    { n: "05", t: "Deliver", d: "Test, deploy & provide ongoing support." },
  ];

  return (
    <section className="bg-[#0A0D16] border-t border-[#1C2130]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
        <Reveal>
          <Eyebrow>Our Process</Eyebrow>
          <h2 className="ax-display text-3xl sm:text-4xl font-semibold max-w-xl mb-16">
            A streamlined approach to deliver quality results.
          </h2>
        </Reveal>

        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #38BDF8, #0A1F6B, transparent)" }} />
          <div className="grid md:grid-cols-5 gap-8 md:gap-6 relative">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div className="flex flex-col items-start">
                  <div className="w-12 h-12 rounded-full ax-dark-panel flex items-center justify-center mb-5 relative z-10">
                    <span className="text-xs font-semibold ax-grad-text">{s.n}</span>
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
  );
}

export default function About() {
  return (
    <>
      <AboutIntro />
      <WhyChooseUs />
      <Process />
    </>
  );
}
