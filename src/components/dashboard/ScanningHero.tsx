"use client";

import React from "react";
import { motion } from "motion/react";
import { Loader2, Play, Square } from "lucide-react";

interface ScanningHeroProps {
  speed: number;
  scannedToday: number;
  isActive: boolean;
  onToggle: () => void;
}

export function ScanningHero({ speed, scannedToday, isActive, onToggle }: ScanningHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
    >
      {/* Decorative radial scanner glow */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? "bg-[radial-gradient(circle_at_center,rgba(255,244,184,0.03),transparent_70%)] opacity-100" : "opacity-0"} pointer-events-none`} />

      <div className="space-y-5 text-center md:text-left z-10">
        <div>
          <span className="text-[12px] font-bold text-[#6B7280] uppercase tracking-wider">
            Live Scanner
          </span>
          <h2 className="text-[32px] font-extrabold text-black tracking-tight leading-tight mt-1 flex items-center justify-center md:justify-start gap-2.5">
            {isActive ? "Scanning..." : "Scanner Paused"}
            {isActive ? (
              <Loader2 className="w-5 h-5 animate-spin text-black" />
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            )}
          </h2>
        </div>

        <div className="space-y-2 text-[14px]">
          <div className="flex justify-between md:justify-start gap-6">
            <span className="text-[#6B7280] font-semibold">Current Speed</span>
            <span className="text-black font-extrabold font-mono">
              {isActive ? speed.toLocaleString() : 0} Wallets/sec
            </span>
          </div>
          <div className="flex justify-between md:justify-start gap-6">
            <span className="text-[#6B7280] font-semibold">Scanned Today</span>
            <span className="text-black font-extrabold font-mono">
              {scannedToday.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between md:justify-start gap-6">
            <span className="text-[#6B7280] font-semibold">Remaining</span>
            <span className="text-black font-extrabold bg-[#FAFAFA] border border-[#F1F1F1] px-2 py-0.5 rounded text-[12px]">
              Continuous
            </span>
          </div>
        </div>

        {/* Start / Stop action controller buttons */}
        <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
          {isActive ? (
            <motion.button
              type="button"
              onClick={onToggle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-all shadow-[0_2px_8px_rgba(0,0,0,0.05)] cursor-pointer"
            >
              <Square className="w-3.5 h-3.5 fill-white" />
              <span>Stop Scanner</span>
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={onToggle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-[0_2px_8px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white text-emerald-500" />
              <span>Start Scanner</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Progress Ring HUD */}
      <div className="relative w-40 h-40 flex items-center justify-center shrink-0 z-10 select-none">
        {/* Particle dots */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={isActive ? { rotate: 360 } : {}}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <div className={`absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? "bg-[#FFF4B8]" : "bg-neutral-300"}`} />
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neutral-300" />
          </motion.div>
        </div>

        {/* Circular Progress Ring */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#FAFAFA"
            strokeWidth="4"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="42"
            stroke={isActive ? "black" : "#D1D5DB"}
            strokeWidth="4"
            fill="none"
            strokeDasharray="264"
            animate={isActive ? { strokeDashoffset: [264, 40, 264] } : { strokeDashoffset: 180 }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* HUD Center Text */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-[12px] font-bold text-black uppercase tracking-wider">
            {isActive ? "Active" : "Paused"}
          </span>
          <span className="text-[10px] text-[#9CA3AF] font-bold mt-0.5">
            Network scan
          </span>
        </div>
      </div>
    </motion.div>
  );
}
