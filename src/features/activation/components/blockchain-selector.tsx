"use client";

import React from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { BlockchainGrid } from "./blockchain-grid";
import { useBlockchainSelection } from "@/src/hooks/useBlockchainSelection";

export function BlockchainSelector() {
  const {
    selectedIds,
    allowedIds,
    isSubmitting,
    toggleSelection,
    handleContinue,
    handleSkip,
  } = useBlockchainSelection();

  const isEnabled = selectedIds.length > 0;

  return (
    <div className="w-full max-w-[480px] mx-auto flex flex-col justify-start items-center">
      {/* Title Header */}
      <div className="text-center mb-8 w-full">
        <motion.h1
          layoutId="onboarding-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[32px] font-bold text-black tracking-tight leading-tight"
        >
          Choose your blockchain networks
        </motion.h1>
        <p className="text-[15px] text-[#6B7280] mt-3 leading-relaxed">
          Select the blockchain networks you want to include. You can always change these later in Settings.
        </p>
      </div>

      {/* Grid */}
      <div className="w-full mb-8">
        <BlockchainGrid selectedIds={selectedIds} allowedIds={allowedIds} onToggle={toggleSelection} />
      </div>

      {/* Action Footer */}
      <div className="w-full flex flex-col items-center gap-4">
        <motion.button
          type="button"
          disabled={!isEnabled || isSubmitting}
          onClick={handleContinue}
          whileHover={isEnabled && !isSubmitting ? { y: -2, opacity: 0.95 } : {}}
          whileTap={isEnabled && !isSubmitting ? { scale: 0.98 } : {}}
          className="w-full h-[56px] rounded-xl bg-black text-white text-[15px] font-medium flex items-center justify-center transition-all duration-200 disabled:bg-[#D1D5DB] disabled:cursor-not-allowed disabled:transform-none shadow-sm"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Continue"
          )}
        </motion.button>

        <button
          type="button"
          onClick={handleSkip}
          className="text-[14px] text-[#6B7280] hover:text-black font-medium transition-colors py-2"
        >
          Select later
        </button>
      </div>
    </div>
  );
}
