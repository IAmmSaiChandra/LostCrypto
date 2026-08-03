"use client";

import React from "react";
import { Clock, Globe, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export function SupportStatus() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-bold text-black tracking-tight">
          Support Status
        </h3>
        <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-600 text-[12px] font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Online
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAFAFA] border border-[#F1F1F1] flex items-center justify-center text-neutral-500 shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider">
              Average Response Time
            </p>
            <p className="text-[14px] text-black font-extrabold mt-0.5">
              Usually replies within 30–60 minutes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FAFAFA] border border-[#F1F1F1] flex items-center justify-center text-neutral-500 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider">
              Availability
            </p>
            <p className="text-[14px] text-black font-extrabold mt-0.5">
              Monday – Sunday • 24×7 Community Support
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
