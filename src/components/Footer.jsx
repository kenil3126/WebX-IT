import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Twitter, Instagram, Send } from "lucide-react";
import { SERVICES } from "../data/services";

export default function Footer() {
  const quickLinks = [
    { label: "About Us", to: "/about" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "Contact", to: "/contact" },
  ];
  const serviceLinks = SERVICES.slice(0, 5).map((s) => ({ label: s.title, to: `/services/${s.slug}` }));
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-[#1C2130] bg-[#080A16]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <img src="/logo.png" alt="WebX IT Services logo" className="w-12 h-12 object-contain" />
            <div className="ax-display font-semibold text-lg">WebX IT Services</div>
          </Link>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-6">
            Innovative IT solutions to transform your business and create a better tomorrow.
          </p>
          <div className="flex gap-3">
            {[Facebook, Linkedin, Twitter, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg ax-dark-panel flex items-center justify-center hover:border-blue-500 transition-colors">
                <Icon size={15} className="text-slate-400" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((it) => (
              <li key={it.label}>
                <Link to={it.to} className="text-sm text-slate-400 hover:text-white transition-colors">{it.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-4">Services</h4>
          <ul className="space-y-2.5">
            {serviceLinks.map((it) => (
              <li key={it.label}>
                <Link to={it.to} className="text-sm text-slate-400 hover:text-white transition-colors">{it.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-4">Newsletter</h4>
          <p className="text-sm text-slate-500 mb-4">Stay updated with our latest news &amp; insights.</p>
          {subscribed ? (
            <p className="text-sm text-sky-300">Thanks for subscribing!</p>
          ) : (
            <div className="flex gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 bg-[#12151F] border border-[#232838] rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={() => email && setSubscribed(true)}
                aria-label="Subscribe"
                className="w-10 h-10 shrink-0 rounded-lg ax-grad-bg flex items-center justify-center"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-[#1C2130]">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-600">
          <span>© 2026 WebX IT Services. All Rights Reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
