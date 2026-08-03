"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader2, ArrowLeft } from "lucide-react";
import { NotFoundIllustration } from "@/src/components/states/NotFoundIllustration";
import { useLastValidRoute } from "@/src/hooks/useLastValidRoute";

export default function NotFound() {
  const [navigating, setNavigating] = useState(false);
  const { getLastValidRoute } = useLastValidRoute();

  const handleGoBack = () => {
    setNavigating(true);
    const target = getLastValidRoute();
    setTimeout(() => {
      window.location.href = target;
    }, 400); // Small delay to feel smooth
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col justify-between items-center py-12 px-6 font-sans selection:bg-black selection:text-white">
      <div />

      <div className="w-full max-w-[560px] flex flex-col items-center text-center">
        {/* SVG Illustration Container */}
        <div className="w-full mb-8 flex justify-center">
          <NotFoundIllustration />
        </div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[32px] font-bold text-black tracking-tight leading-tight mb-3"
        >
          Uh oh! Seems you&apos;re lost!
        </motion.h1>

        {/* Supporting Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[16px] text-[#6B7280] space-y-2 mb-8 max-w-[420px]"
        >
          <p>The page you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
          <p className="text-[14px]">Don&apos;t worry—we can take you back to where you left off.</p>
        </motion.div>

        {/* Button Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-[280px]"
        >
          <button
            onClick={handleGoBack}
            disabled={navigating}
            className="w-full h-[56px] rounded-xl bg-black text-white text-[15px] font-medium flex items-center justify-center gap-2 hover:bg-black/90 active:scale-[0.98] transition-all disabled:bg-[#D1D5DB]"
          >
            {navigating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ArrowLeft className="w-4 h-4" />
                Take Me Back
              </>
            )}
          </button>
        </motion.div>
      </div>

      <footer className="text-center text-[12px] text-[#6B7280] select-none tracking-wide">
        Secure Workspace Recovery System
      </footer>
    </div>
  );
}
