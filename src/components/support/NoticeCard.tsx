"use client";

import React from "react";
import { Info, ShieldAlert } from "lucide-react";

export function NoticeCard() {
  return (
    <div className="w-full rounded-xl bg-[#111a2e] border border-[#1e2e4a] p-5 flex gap-3.5 text-left shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
      <div className="w-8 h-8 rounded-lg bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center text-[#60a5fa] shrink-0">
        <Info className="w-4 h-4" />
      </div>
      <div>
        <h5 className="text-[13px] font-bold text-[#f8fafc]">
          Urgent Assistance Required?
        </h5>
        <p className="text-[12px] text-[#94a3b8] leading-relaxed mt-0.5">
          For rapid key issuance or blockchain transaction questions, join our Telegram group and mention <span className="text-[#60a5fa] font-mono font-semibold">@rioggz</span>.
        </p>
      </div>
    </div>
  );
}
