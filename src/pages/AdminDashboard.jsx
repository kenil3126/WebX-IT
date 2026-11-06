import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Mail, RefreshCw, CheckCircle2, Circle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AdminDashboard() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    setError("");
    const { data, error: fetchError } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (fetchError) {
      setError("Couldn't load submissions. Check your Supabase setup.");
      return;
    }
    setRows(data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleStatus = async (row) => {
    const nextStatus = row.status === "replied" ? "new" : "replied";
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: nextStatus } : r)));
    await supabase.from("contact_submissions").update({ status: nextStatus }).eq("id", row.id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const newCount = rows.filter((r) => r.status !== "replied").length;

  return (
    <div className="ax-root min-h-screen">
      <header className="border-b border-[#1C2130] bg-[#070911]">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="ax-display font-semibold">Admin Dashboard</h1>
            <p className="text-xs text-slate-500">{newCount} new of {rows.length} total</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={load} className="w-9 h-9 rounded-lg ax-dark-panel flex items-center justify-center hover:border-blue-500 border border-transparent transition-colors" aria-label="Refresh">
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg ax-dark-panel hover:border-rose-400 border border-transparent transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {error && <p className="text-sm text-rose-400 mb-6">{error}</p>}

        {!loading && rows.length === 0 && !error && (
          <div className="ax-dark-panel rounded-2xl p-12 text-center text-slate-500 text-sm">
            No contact submissions yet.
          </div>
        )}

        <div className="space-y-3">
          {rows.map((row, i) => (
            <motion.div
              key={row.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="ax-dark-panel rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-medium text-sm">{row.name}</h3>
                  <a href={`mailto:${row.email}`} className="text-xs text-sky-300 inline-flex items-center gap-1 mt-0.5 hover:text-white transition-colors">
                    <Mail size={11} /> {row.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-500">
                    {new Date(row.created_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <button
                    onClick={() => toggleStatus(row)}
                    className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                      row.status === "replied"
                        ? "border-emerald-500/40 text-emerald-400"
                        : "border-blue-500/40 text-blue-400"
                    }`}
                  >
                    {row.status === "replied" ? <CheckCircle2 size={11} /> : <Circle size={11} />}
                    {row.status === "replied" ? "Replied" : "New"}
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{row.message}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
