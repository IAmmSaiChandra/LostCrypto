"use client";

import React from "react";
import { motion } from "motion/react";

export function ActivationHero() {
  return (
    <div className="w-full flex justify-center mb-6">
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-28 h-28 flex items-center justify-center bg-white rounded-3xl border border-[#F1F1F1] shadow-[0_8px_32px_rgba(0,0,0,0.02)]"
      >
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 text-black fill-none stroke-current stroke-[1.5]"
        >
          {/* Padlock body */}
          <motion.rect
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            x="25"
            y="45"
            width="50"
            height="38"
            rx="10"
            fill="#FAFAFA"
          />
          {/* Padlock shackle */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            d="M36 45 V32 C36 22, 42 16, 50 16 C58 16, 64 22, 64 32 V45"
            strokeLinecap="round"
          />
          {/* Keyhole */}
          <motion.circle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            cx="50"
            cy="60"
            r="4"
            fill="currentColor"
            stroke="none"
          />
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            d="M50 64 L50 72"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
}
