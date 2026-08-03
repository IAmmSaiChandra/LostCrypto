"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GhostMascot } from "@/src/features/activation/components/ghost-mascot";

export function SupportHero() {
  const [mascotState, setMascotState] = useState<"profile" | "idle">("profile");

  useEffect(() => {
    // Mascot waves once on page load (via "profile" state), then returns to "idle" float
    const timer = setTimeout(() => {
      setMascotState("idle");
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Wave once on load animation container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-4"
      >
        <GhostMascot state={mascotState} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="text-[38px] md:text-[44px] font-extrabold text-black tracking-tight leading-none mb-3">
          Need Help?
        </h1>
        <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-[420px] mx-auto font-semibold">
          We&apos;re here to help you with activation, account issues, and general questions.
        </p>
      </motion.div>
    </div>
  );
}
