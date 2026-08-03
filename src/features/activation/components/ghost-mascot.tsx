"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface GhostMascotProps {
  state: "idle" | "focused" | "error" | "success" | "profile" | "completed";
}

export function GhostMascot({ state }: GhostMascotProps) {
  const [blink, setBlink] = useState(false);
  const [lookDirection, setLookDirection] = useState<"center" | "left" | "right">("center");

  // Blinking and looking around loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 5500);

    const lookInterval = setInterval(() => {
      const dirs: ("center" | "left" | "right")[] = ["center", "left", "right", "center"];
      const randomDir = dirs[Math.floor(Math.random() * dirs.length)];
      setLookDirection(randomDir);
    }, 4000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(lookInterval);
    };
  }, []);

  // Determine eye animations and look vectors based on state/directions
  const getEyesProps = () => {
    if (state === "focused") {
      return { x: -3, y: 2, scaleY: 1 };
    }
    if (state === "error") {
      return { x: 0, y: -1, scale: 1.25 };
    }
    if (state === "profile") {
      return { x: -1, y: 2, scale: 1 };
    }
    
    // Idle looking direction shifts
    switch (lookDirection) {
      case "left":
        return { x: -2, y: 0, scale: 1 };
      case "right":
        return { x: 2, y: 0, scale: 1 };
      default:
        return { x: 0, y: 0, scale: 1 };
    }
  };

  // Body animations
  const bodyVariants = {
    idle: {
      y: [0, -6, 0],
      rotate: [0, 1.5, -1.5, 0],
      scale: [1, 1.01, 0.99, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    focused: {
      y: 2,
      rotate: -4,
      scale: 1.02,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
    error: {
      x: [-8, 8, -6, 6, -3, 3, 0],
      rotate: [-5, 5, -4, 4, 0],
      transition: { duration: 0.5 },
    },
    success: {
      scale: [1, 1.12, 1],
      rotate: [0, 360],
      y: -20,
      transition: {
        rotate: { duration: 0.8, ease: "easeInOut" },
        scale: { duration: 0.5 },
        y: { duration: 0.8, type: "spring", stiffness: 120 },
      },
    },
    profile: {
      y: [0, -3, 0],
      scale: 0.95,
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
    completed: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <div className="relative flex items-center justify-center select-none pointer-events-none w-36 h-36">
      {/* Soft Radial Light behind mascot */}
      <div className="absolute w-24 h-24 rounded-full bg-[#FFF4B8]/15 blur-2xl -z-10" />

      {/* Floating Sparkles & Accents around the mascot */}
      <div className="absolute inset-0 overflow-visible pointer-events-none">
        {/* Sparkle 1 */}
        <motion.div
          animate={{ y: [-2, 2, -2], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2 left-4 text-[#FFF4B8]"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
          </svg>
        </motion.div>
        
        {/* Diamond 1 */}
        <motion.div
          animate={{ y: [2, -2, 2], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-6 right-3 text-neutral-300"
        >
          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2 L22 12 L12 22 L2 12 Z" />
          </svg>
        </motion.div>

        {/* Plus Symbol */}
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-6 right-5 text-neutral-400 font-bold text-[12px]"
        >
          +
        </motion.div>
      </div>

      {/* Dynamic green ripple for Success */}
      <AnimatePresence>
        {state === "success" && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0.5 }}
            animate={{ scale: 1.8, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-28 h-28 rounded-full border border-emerald-500/20 bg-emerald-50/5"
          />
        )}
      </AnimatePresence>

      {/* Mascot SVG */}
      <motion.svg
        variants={bodyVariants}
        animate={state}
        initial="idle"
        viewBox="0 0 100 100"
        className="w-28 h-28 overflow-visible"
      >
        {/* Soft shadow below mascot */}
        <motion.ellipse
          cx="50"
          cy="92"
          rx="18"
          ry="3.5"
          fill="#FFE89A"
          opacity={state === "success" ? 0.05 : 0.4}
          animate={{
            scale: state === "idle" ? [0.92, 1.08, 0.92] : 1,
            opacity: state === "idle" ? [0.35, 0.45, 0.35] : 0.4,
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ghost Body: Butter Yellow (#FFF4B8) with soft highlight (#FFF9DE) & shadow (#FFE89A) */}
        <g>
          <path
            d="M 22,42 C 22,18 35,10 50,10 C 65,10 78,18 78,42 C 78,58 78,74 78,82 C 70,85 66,78 58,82 C 50,86 46,78 38,82 C 30,85 26,83 22,82 Z"
            fill="#FFF4B8"
            stroke="#FFE89A"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path
            d="M 27,36 C 27,24 37,14 50,14"
            fill="none"
            stroke="#FFF9DE"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        {/* Expressive Large White Oval Eyes & Black Pupils */}
        <g>
          {blink ? (
            // Blink lines
            <>
              <line x1="34" y1="45" x2="46" y2="45" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <line x1="54" y1="45" x2="66" y2="45" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : state === "success" || state === "completed" ? (
            // Happy arches
            <>
              <path d="M 34,48 Q 40,41 46,48" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <path d="M 54,48 Q 60,41 66,48" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
            </>
          ) : (
            // Oval white eyes + black pupils
            <motion.g
              animate={getEyesProps()}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
            >
              {/* Left Eye */}
              <ellipse cx="40" cy="45" rx="6" ry="8.5" fill="white" stroke="#FFE89A" strokeWidth="1" />
              <ellipse cx="40" cy="45" rx="3" ry="4.5" fill="black" />
              <circle cx="39" cy="43" r="0.8" fill="white" />

              {/* Right Eye */}
              <ellipse cx="60" cy="45" rx="6" ry="8.5" fill="white" stroke="#FFE89A" strokeWidth="1" />
              <ellipse cx="60" cy="45" rx="3" ry="4.5" fill="black" />
              <circle cx="59" cy="43" r="0.8" fill="white" />
            </motion.g>
          )}
        </g>

        {/* Smile (Happy / Success states) */}
        {(state === "success" || state === "profile" || state === "completed") && (
          <path
            d="M 46,57 Q 50,60 54,57"
            fill="none"
            stroke="black"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}

        {/* Waving Arm (only in profile setup flow) */}
        {state === "profile" && (
          <motion.path
            animate={{ rotate: [-10, 20, -10] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "24px 56px" }}
            d="M 24,56 Q 14,50 16,46"
            fill="none"
            stroke="#FFE89A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        )}
      </motion.svg>
    </div>
  );
}
