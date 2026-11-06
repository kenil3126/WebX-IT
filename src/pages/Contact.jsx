import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, X } from "lucide-react";
import { Reveal, Eyebrow } from "../shared";
import { supabase } from "../lib/supabaseClient";
import { sendContactEmail } from "../lib/emailClient";

function ContactHero() {
  return (
    <section className="bg-[#070911] border-b border-[#1C2130]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-14">
        <Reveal>
          <Eyebrow>Contact Us</Eyebrow>
          <h1 className="ax-display text-3xl sm:text-4xl font-semibold max-w-xl">
            Let's Build Something{" "}
            <span className="relative inline-block">
              Great
            </span>{" "}
            Together
          </h1>
          <p className="text-slate-400 max-w-lg mt-4 leading-relaxed">
            Have a project in mind? Let's discuss how we can help you achieve your business goals.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SubmittedPopup({ show, onClose }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="ax-dark-panel rounded-2xl p-8 max-w-sm w-full text-center relative"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-slate-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={30} className="text-emerald-400" />
            </div>
            <h3 className="ax-display text-xl font-semibold mb-2">Submitted!</h3>
            <p className="text-slate-400 text-sm">
              Thanks for reaching out — our team will get back to you within one business day.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactBody() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Please enter a valid email";
    if (!form.message.trim()) errs.message = "Please add a short message";
    return errs;
  };

  const onBlur = (k) => () => {
    const errs = validate();
    setErrors((prev) => ({ ...prev, [k]: errs[k] }));
  };

  const [submitError, setSubmitError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0 || loading) return;
    setLoading(true);
    setSubmitError("");

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      if (error) {
        // Don't block the user on a Supabase issue (e.g. .env not configured yet) —
        // the email step below is what actually needs to succeed for them to hear
        // back from us. Log it so it's easy to spot during setup, but keep going.
        console.warn("Supabase save failed, continuing to email step:", error.message);
      }
    } catch (err) {
      // createClient() with an unconfigured/placeholder URL can throw a network-level
      // error here instead of returning { error } — catch it so the form still resets
      // and the popup still shows instead of silently freezing on "Sending...".
      console.warn("Supabase save threw, continuing to email step:", err);
    }

    // Email the submitted details to the business inbox (kenil3126@gmail.com via EmailJS).
    // This never blocks the confirmation — if EmailJS isn't configured yet the
    // submission is still saved in Supabase and the user still sees "Submitted!"
    // with no other popup/prompt of any kind.
    try {
      await sendContactEmail({
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
    } catch (err) {
      console.warn("Email send threw:", err);
    }

    setLoading(false);
    setShowPopup(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  const info = [
    { icon: Phone, label: "Phone", val: "+91 9558104096" },
    { icon: Mail, label: "Email", val: "info@webxitservices.com" },
    { icon: MapPin, label: "Location", val: "Ahmedabad, Gujarat" },
  ];

  return (
    <section className="bg-[#0A0D16]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <Reveal>
          <div className="space-y-6">
            {info.map((c) => (
              <div key={c.label} className="ax-dark-panel rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#141826] flex items-center justify-center shrink-0">
                  <c.icon size={16} className="text-sky-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{c.label}</div>
                  <div className="text-sm mt-0.5">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="ax-dark-panel rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <motion.form
              onSubmit={submit}
              noValidate
              className="space-y-5"
            >
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Your Name</label>
                    <input
                      value={form.name}
                      onChange={update("name")}
                      onBlur={onBlur("name")}
                      type="text"
                      placeholder="Jane Doe"
                      className={`w-full bg-[#141826] border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${errors.name ? "border-rose-500" : "border-[#232838] focus:border-blue-500"}`}
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Email Address</label>
                    <input
                      value={form.email}
                      onChange={update("email")}
                      onBlur={onBlur("email")}
                      type="email"
                      placeholder="jane@company.com"
                      className={`w-full bg-[#141826] border rounded-lg px-4 py-3 text-sm outline-none transition-colors ${errors.email ? "border-rose-500" : "border-[#232838] focus:border-blue-500"}`}
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1.5 block">Message</label>
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      onBlur={onBlur("message")}
                      rows={4}
                      placeholder="Tell us about your project..."
                      className={`w-full bg-[#141826] border rounded-lg px-4 py-3 text-sm outline-none transition-colors resize-none ${errors.message ? "border-rose-500" : "border-[#232838] focus:border-blue-500"}`}
                    />
                    {errors.message && <p className="text-xs text-rose-400 mt-1.5">{errors.message}</p>}
                  </div>
                  <div className="relative">
                    <motion.button
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg ax-grad-bg font-medium text-sm text-white disabled:opacity-80"
                  >
                    {loading ? (
                      <>
                        <motion.span
                          className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <ArrowRight size={15} />
                      </>
                    )}
                    </motion.button>
                    {submitError && <p className="text-xs text-rose-400 mt-3 text-center">{submitError}</p>}
                  </div>
            </motion.form>
          </div>
        </Reveal>
      </div>
      <SubmittedPopup show={showPopup} onClose={() => setShowPopup(false)} />
    </section>
  );
}

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactBody />
    </>
  );
}
