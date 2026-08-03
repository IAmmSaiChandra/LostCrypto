"use client";

import React from "react";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface SecurityItem {
  title: string;
  desc: string;
}

const securityItems: SecurityItem[] = [
  {
    title: "License Verified",
    desc: "Your cryptographic software key has been checked and authorized.",
  },
  {
    title: "Encrypted Local Storage",
    desc: "Application settings and cache databases are encrypted at rest locally.",
  },
  {
    title: "Secure Authentication",
    desc: "Onboarding setups and active wallet sync sessions run in isolated zones.",
  },
];

export function SecurityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6"
    >
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-5 h-5 text-black" />
        <h3 className="text-[18px] font-bold text-black tracking-tight">
          Security
        </h3>
      </div>

      <div className="divide-y divide-[#F1F1F1]">
        {securityItems.map((item) => (
          <div key={item.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[14px] font-bold text-black">{item.title}</h5>
              <p className="text-[13px] text-[#6B7280] font-semibold mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
