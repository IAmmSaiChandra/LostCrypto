"use client";

import React from "react";
import { Play, Square } from "lucide-react";

interface ScannerControlsProps {
  isActive: boolean;
  onToggle: () => void;
}

export function ScannerControls({ isActive, onToggle }: ScannerControlsProps) {
  return (
    <div className="w-full flex items-center justify-center">
      {isActive ? (
        <button
          type="button"
          onClick={onToggle}
          className="w-full h-13 rounded-xl bg-[#172440] hover:bg-[#1e3054] active:bg-[#131d31] border border-[#1e2e4a] hover:border-red-500/40 text-red-400 hover:text-red-300 text-[14px] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.2)] cursor-pointer"
        >
          <Square className="w-4 h-4 fill-current" />
          <span>Halt Recovery Scanning Session</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onToggle}
          className="w-full h-13 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[14px] font-semibold flex items-center justify-center gap-2.5 transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)] cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Initiate Autonomous Scanner Engine</span>
        </button>
      )}
    </div>
  );
}
