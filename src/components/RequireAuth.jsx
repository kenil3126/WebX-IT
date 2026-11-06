import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function RequireAuth({ children }) {
  const [status, setStatus] = useState("checking"); // "checking" | "authed" | "guest"

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setStatus(data.session ? "authed" : "guest");
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setStatus(session ? "authed" : "guest");
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (status === "checking") {
    return (
      <div className="ax-root min-h-screen flex items-center justify-center">
        <span className="w-6 h-6 rounded-full border-2 border-[#2A3040] border-t-blue-500 animate-spin" />
      </div>
    );
  }

  if (status === "guest") return <Navigate to="/admin/login" replace />;

  return children;
}
