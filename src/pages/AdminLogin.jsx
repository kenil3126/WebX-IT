import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("Incorrect email or password.");
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="ax-root min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl ax-grad-bg flex items-center justify-center mb-4">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="ax-display text-xl font-semibold">Admin Login</h1>
          <p className="text-sm text-slate-500 mt-1">WebX IT Services dashboard access</p>
        </div>

        <form onSubmit={submit} className="ax-dark-panel rounded-2xl p-7 space-y-4">
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full bg-[#141826] border border-[#232838] rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 mb-1.5 block">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full bg-[#141826] border border-[#232838] rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg ax-grad-bg text-sm font-medium text-white disabled:opacity-80"
          >
            {loading ? "Signing in..." : <>Sign In <ArrowRight size={15} /></>}
          </motion.button>
        </form>
      </div>
    </div>
  );
}
