"use client";

import React, { useState } from "react";
import { Loader2, ArrowLeft, ShieldAlert } from "lucide-react";
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
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] flex flex-col justify-between items-center py-12 px-4 font-sans">
      <div />

      <div className="w-full max-w-lg flex flex-col items-center text-center">
        {/* SVG Illustration */}
        <div className="w-full mb-6 flex justify-center text-[#1e2e4a]">
          <NotFoundIllustration />
        </div>

        {/* Heading */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/30 text-[#60a5fa] text-[12px] font-mono uppercase tracking-wider mb-3">
          <ShieldAlert className="w-3.5 h-3.5" /> 404 Route Not Found
        </div>
        <h1 className="text-[28px] font-bold text-[#f8fafc] tracking-tight leading-tight mb-2">
          Uncharted Ledger Coordinate
        </h1>

        {/* Supporting Text */}
        <div className="text-[14px] text-[#94a3b8] space-y-1 mb-6 max-w-sm">
          <p>The cryptographic route you requested does not exist or has been relocated.</p>
          <p className="text-[13px] text-[#64748b]">Return to your authorized recovery console session.</p>
        </div>

        {/* Button */}
        <div className="w-full max-w-xs">
          <button
            onClick={handleGoBack}
            disabled={navigating}
            className="w-full h-11 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(37,99,235,0.3)] transition-all cursor-pointer disabled:opacity-50"
          >
            {navigating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <ArrowLeft className="w-4 h-4" />
                Return to Previous Session
              </>
            )}
          </button>
        </div>
      </div>

      <footer className="text-center text-[11px] font-mono text-[#64748b] select-none tracking-wider">
        LOSTCRYPTO SECURE RECOVERY SYSTEM • 2026
      </footer>
    </div>
  );
}
