import React from "react";
import { Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden sm:block bg-[#070911] border-b border-[#1C2130]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-9 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5">
            <Phone size={12} /> +91 9558104096
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Mail size={12} /> info@webxitservices.com
          </span>
        </div>
        <span>Ahmedabad, Gujarat</span>
      </div>
    </div>
  );
}
