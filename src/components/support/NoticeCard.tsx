"use client";

import React from "react";
import { Info } from "lucide-react";
import { motion } from "motion/react";

export function NoticeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="w-full rounded-2xl bg-amber-50 border border-amber-200/50 p-6 flex gap-4 text-left shadow-[0_4px_16px_rgba(0,0,0,0.01)]"
    >
      <div className="w-9 h-9 rounded-xl bg-white border border-amber-200/50 flex items-center justify-center text-amber-500 shrink-0">
        <Info className="w-4 h-4" />
      </div>
      <div>
        <h5 className="text-[14px] font-bold text-amber-900">
          Need immediate assistance?
        </h5>
        <p className="text-[13px] text-amber-800 leading-relaxed font-semibold mt-1">
          We&apos;re always happy to help. Join our Telegram group and tag @rioggz for immediate assistance.
        </p>
      </div>
    </motion.div>
  );
}
