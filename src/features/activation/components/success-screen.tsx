"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function SuccessScreen() {
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      {/* Icon Area */}
      <div className="relative flex items-center justify-center w-20 h-20 mb-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 rounded-2xl border border-[#2563eb]/40"
        />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="w-16 h-16 bg-[#172440] border-2 border-[#2563eb] rounded-2xl flex items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.35)]"
        >
          <CheckCircle2 className="w-8 h-8 text-[#60a5fa]" />
        </motion.div>
      </div>

      {/* Success Text Group */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-2"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563eb]/15 border border-[#2563eb]/30 text-[#60a5fa] text-[12px] font-mono uppercase tracking-wider mb-1">
          <ShieldCheck className="w-3.5 h-3.5" /> License Verified
        </div>
        <h1 className="text-[26px] font-bold text-[#f8fafc] tracking-tight leading-tight">
          Activation Successful
        </h1>
        <p className="text-[14px] text-[#94a3b8] max-w-[320px]">
          Cryptographic validation complete. Preparing your recovery environment...
        </p>
      </motion.div>
    </div>
  );
}
