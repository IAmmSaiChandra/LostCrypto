"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Inbox, ArrowLeft } from "lucide-react";

export function EmptyAssets() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-12 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col items-center text-center max-w-[480px] mx-auto my-12"
    >
      <div className="w-16 h-16 rounded-3xl bg-[#FAFAFA] border border-[#F1F1F1] flex items-center justify-center mb-6 text-neutral-400">
        <Inbox className="w-8 h-8" />
      </div>

      <h3 className="text-[20px] font-extrabold text-black tracking-tight mb-2">
        No Assets Found
      </h3>
      <p className="text-[14px] text-[#6B7280] leading-relaxed mb-8 max-w-[300px]">
        Your portfolio will automatically appear here once assets have been detected.
      </p>

      <Link
        href="/dashboard"
        className="h-12 px-6 rounded-xl bg-black hover:bg-black/90 text-white text-[14px] font-semibold flex items-center gap-2 shadow-sm transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Return to Dashboard
      </Link>
    </motion.div>
  );
}
