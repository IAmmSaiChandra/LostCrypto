"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";

export function SuccessScreen() {
  useEffect(() => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center py-8">
      {/* Premium Green Checkmark Area */}
      <div className="relative flex items-center justify-center w-24 h-24 mb-8">
        {/* Soft expanding green circle/ripple */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 rounded-full border border-emerald-500/20"
        />
        
        {/* Icon Circle Container */}
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 180, damping: 15 }}
          className="relative w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10"
        >
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              d="M20 6L9 17l-5-5"
            />
          </svg>
        </motion.div>
      </div>

      {/* Success Text Group */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-3"
      >
        <h1 className="text-[36px] font-bold text-black tracking-tight leading-none">
          Activation Successful
        </h1>
        <p className="text-[16px] text-[#6B7280]">
          Your activation key has been verified successfully.
        </p>
      </motion.div>
    </div>
  );
}
