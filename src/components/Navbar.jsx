import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { SERVICES } from "../data/services";

const SERVICE_LINKS = SERVICES.map((s) => ({ label: s.title, to: `/services/${s.slug}` }));

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const linkClass = ({ isActive }) =>
    `ax-nav-link text-sm text-slate-300 hover:text-white transition-colors ${isActive ? "is-active text-white" : ""}`;

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${scrolled ? "ax-glass border-b border-[#232838]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="WebX IT Services logo" className="w-16 h-16 object-contain shrink-0" />
          <div className="leading-tight">
            <div className="ax-display font-bold text-xl leading-none">WebX</div>
            <div className="text-[11px] text-slate-400 tracking-widest font-medium mt-1">IT Services</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>

          <div className="ax-dropdown-wrap relative flex items-center">
            <NavLink to="/services" className={({ isActive }) => `${linkClass({ isActive })} inline-flex items-center gap-1 leading-none`}>
              Services <ChevronDown size={13} className="shrink-0" />
            </NavLink>
            <div className="ax-dropdown-panel absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[520px]">
              <div className="ax-dark-panel ax-glass rounded-xl p-3 shadow-2xl shadow-black/40 grid grid-cols-2 gap-1">
                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    className="block px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/portfolio" className={linkClass}>Portfolio</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <span className="text-[13px] text-slate-500">+91 9558104096</span>
          <Link to="/contact" className="text-sm px-5 py-2.5 rounded-lg ax-grad-bg font-medium text-white transition-all">
            Get In Touch
          </Link>
        </div>

        <button className="lg:hidden text-slate-200" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#232838] bg-[#0A0D16] px-6 py-5 flex flex-col gap-4">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About Us</NavLink>
          <NavLink to="/services" className={linkClass}>Services</NavLink>
          <NavLink to="/portfolio" className={linkClass}>Portfolio</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          <Link to="/contact" className="text-sm px-5 py-3 rounded-lg ax-grad-bg text-center font-medium text-white">
            Get In Touch
          </Link>
        </div>
      )}
    </header>
  );
}
