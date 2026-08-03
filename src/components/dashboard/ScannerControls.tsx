"use client";

import React from "react";
import { motion } from "motion/react";
import { Play, Square } from "lucide-react";

interface ScannerControlsProps {
  isActive: boolean;
  onToggle: () => void;
}

export function ScannerControls({ isActive, onToggle }: ScannerControlsProps) {
  return (
    <div className="w-full flex items-center justify-center pt-2">
      {isActive ? (
        <motion.button
          type="button"
          onClick={onToggle}
          whileHover={{ y: -2, opacity: 0.95 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-[60px] rounded-[18px] bg-black text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.06)] cursor-pointer"
        >
          <Square className="w-4 h-4 fill-white" />
          <span>Stop Scanning</span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onToggle}
          whileHover={{ y: -2, opacity: 0.95 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-[60px] rounded-[18px] bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_16px_rgba(16,185,129,0.2)] cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white text-emerald-500" />
          <span>Start Scanning</span>
        </motion.button>
      )}
    </div>
  );
}
