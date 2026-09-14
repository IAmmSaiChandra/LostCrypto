"use client";

import React from "react";
import { HelpCircle, Shield, LifeBuoy } from "lucide-react";

export function SupportHero() {
  return (
    <div className="flex flex-col items-center text-center pb-2">
      <div className="w-12 h-12 rounded-xl bg-[#172440] border border-[#1e2e4a] flex items-center justify-center text-[#3b82f6] shadow-[0_0_20px_rgba(37,99,235,0.2)] mb-3">
        <LifeBuoy className="w-6 h-6" />
      </div>

      <div>
        <h1 className="text-[26px] sm:text-[30px] font-bold text-[#f8fafc] tracking-tight leading-tight mb-2">
          Technical Support & Community Assistance
        </h1>
        <p className="text-[14px] text-[#94a3b8] leading-relaxed max-w-md mx-auto">
          Need assistance with cryptographic activation, node connectivity, or transaction broadcast? Our operators are available 24/7.
        </p>
      </div>
    </div>
  );
}
