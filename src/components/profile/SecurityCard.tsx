"use client";

import React from "react";
import { CheckCircle2, ShieldAlert } from "lucide-react";

interface SecurityItem {
  title: string;
  desc: string;
}

const securityItems: SecurityItem[] = [
  {
    title: "Cryptographic License Verified",
    desc: "Your cryptographic engine key has been validated and authorized.",
  },
  {
    title: "Isolated Local Storage",
    desc: "Application settings, private states, and recovered keys are stored locally in isolated storage.",
  },
  {
    title: "Direct Blockchain RPC",
    desc: "All derivation verification requests route directly to decentralized node clusters without intermediary logging.",
  },
];

export function SecurityCard() {
  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1e2e4a]">
        <ShieldAlert className="w-4 h-4 text-[#3b82f6]" />
        <h3 className="text-[15px] font-bold text-[#f8fafc] tracking-tight">
          Security & Privacy Architecture
        </h3>
      </div>

      <div className="divide-y divide-[#1e2e4a]">
        {securityItems.map((item) => (
          <div key={item.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[13px] font-bold text-[#f8fafc]">{item.title}</h5>
              <p className="text-[12px] text-[#94a3b8] mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
