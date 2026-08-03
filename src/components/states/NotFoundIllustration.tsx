"use client";

import React from "react";
import { motion } from "motion/react";

export function NotFoundIllustration() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full max-h-[300px] text-gray-200 fill-none stroke-current stroke-[1.5] overflow-visible"
      aria-hidden="true"
    >
      {/* Background mountains */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.25 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        d="M100 350 L250 200 L400 350 M350 350 L520 160 L700 350"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Sun/Moon gently pulsing */}
      <motion.circle
        initial={{ scale: 0.9, opacity: 0.05 }}
        animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.06, 0.09, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        cx="480"
        cy="100"
        r="40"
        fill="currentColor"
        stroke="none"
      />

      {/* Cloud 1 Drifting slowly */}
      <motion.path
        animate={{ x: [-15, 20, -15] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        d="M120 120 C130 110, 150 110, 160 120 C170 115, 190 115, 195 125 L115 125 Z"
        fill="currentColor"
        stroke="none"
        className="opacity-20"
      />

      {/* Cloud 2 Drifting slowly */}
      <motion.path
        animate={{ x: [10, -25, 10] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        d="M580 80 C590 70, 610 70, 620 80 C630 75, 650 75, 655 85 L575 85 Z"
        fill="currentColor"
        stroke="none"
        className="opacity-15"
      />

      {/* Barren horizon landscape */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        d="M50 350 Q200 330, 400 350 T750 350"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Path winding */}
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ delay: 0.4, duration: 1.5, ease: "easeInOut" }}
        d="M400 350 Q390 320, 430 280 T410 210"
        strokeDasharray="4 4"
        strokeLinecap="round"
      />

      {/* Drifting Leaves / Dust particles */}
      <motion.circle
        animate={{ x: [0, 50, 100], y: [0, -15, -5], opacity: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
        cx="280"
        cy="300"
        r="2"
        fill="currentColor"
        stroke="none"
      />
      <motion.circle
        animate={{ x: [0, 80, 160], y: [0, -25, -10], opacity: [0, 0.5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear", delay: 3 }}
        cx="320"
        cy="280"
        r="1.5"
        fill="currentColor"
        stroke="none"
      />
      {/* Blowing leaf shape */}
      <motion.path
        animate={{
          x: [0, 120, 240],
          y: [0, -40, -10],
          rotate: [0, 180, 360],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        d="M 150 290 Q 155 285, 160 290 Q 155 295, 150 290 Z"
        fill="currentColor"
        stroke="none"
      />

      {/* Swaying Grass tufts */}
      <g className="text-gray-300">
        <motion.path
          animate={{ skewX: [-5, 10, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          d="M 380 348 Q 382 335, 385 330 M 380 348 Q 377 338, 374 332"
          strokeLinecap="round"
          className="origin-bottom"
        />
        <motion.path
          animate={{ skewX: [-2, 8, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          d="M 520 346 Q 523 336, 526 332 M 520 346 Q 518 338, 515 334"
          strokeLinecap="round"
          className="origin-bottom"
        />
      </g>

      {/* Lonely Signpost */}
      <g className="text-black">
        {/* Post */}
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
        {/* Sign boards gently creaking/swaying in the wind */}
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
            fill="#FAFAFA"
            strokeWidth="1.5"
          />
          <motion.path
            initial={{ rotate: 15, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 8, scale: 1, opacity: 0.9 }}
            transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
            d="M210 285 L265 292 L262 308 L207 301 Z"
            fill="#FAFAFA"
            strokeWidth="1.5"
          />
        </motion.g>
      </g>

      {/* Sparse rocks */}
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        cx="150"
        cy="345"
        r="6"
        fill="currentColor"
        stroke="none"
      />
      <motion.circle
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: "spring" }}
        cx="620"
        cy="342"
        r="4"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
