"use client";

import React from "react";
import { motion } from "motion/react";

export function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full max-h-[260px] text-[#1e2e4a] fill-none stroke-current stroke-[1.5] overflow-visible"
      aria-hidden="true"
    >
      {/* Background topography */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        d="M100 350 L250 200 L400 350 M350 350 L520 160 L700 350"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Blue beacon pulsing */}
      <motion.circle
        initial={{ scale: 0.9, opacity: 0.1 }}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        cx="480"
        cy="100"
        r="36"
        fill="#2563eb"
        stroke="none"
      />

      {/* Horizon line */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        d="M50 350 Q200 330, 400 350 T750 350"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Path line */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.5 }}
        transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
        d="M400 350 Q390 320, 430 280 T410 210"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />

      {/* Signpost */}
      <g className="text-[#3b82f6]">
        <motion.line
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
          x1="220"
          y1="340"
          x2="220"
          y2="250"
          strokeWidth="2.5"
          className="origin-bottom"
        />
        <motion.g
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="origin-top-left"
          style={{ transformOrigin: "220px 250px" }}
        >
          <motion.path
            initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
            animate={{ rotate: -5, scale: 1, opacity: 0.9 }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
            d="M190 260 L250 250 L250 270 L190 280 Z"
            fill="#111a2e"
            stroke="#1e2e4a"
            strokeWidth="1.5"
          />
          <motion.path
            initial={{ rotate: 15, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 8, scale: 1, opacity: 0.9 }}
            transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
            d="M210 285 L265 292 L262 308 L207 301 Z"
            fill="#111a2e"
            stroke="#1e2e4a"
            strokeWidth="1.5"
          />
        </motion.g>
      </g>
    </svg>
  );
}
