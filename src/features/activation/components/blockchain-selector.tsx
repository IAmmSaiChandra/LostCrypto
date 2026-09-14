"use client";

import React from "react";
import { Loader2, ArrowRight } from "lucide-react";
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
      <div className="text-center mb-6 w-full">
        <h1 className="text-[24px] font-bold text-[#f8fafc] tracking-tight leading-tight">
          Select Target Blockchains
        </h1>
        <p className="text-[14px] text-[#94a3b8] mt-1.5 leading-relaxed">
          Choose the ledger networks to include in your cryptographic wallet scan session.
        </p>
      </div>

      {/* Grid container */}
      <div className="w-full mb-6 max-h-[420px] overflow-y-auto pr-1">
        <BlockchainGrid selectedIds={selectedIds} allowedIds={allowedIds} onToggle={toggleSelection} />
      </div>

      {/* Action Footer */}
      <div className="w-full flex flex-col items-center gap-3">
        <button
          type="button"
          disabled={!isEnabled || isSubmitting}
          onClick={handleContinue}
          className="w-full h-12 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-150 disabled:bg-[#1e2e4a] disabled:text-[#64748b] disabled:cursor-not-allowed shadow-[0_2px_12px_rgba(37,99,235,0.3)]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Initializing Scan Modules...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Launch Recovery Scanner <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={handleSkip}
          className="text-[13px] text-[#94a3b8] hover:text-[#f8fafc] font-medium transition-colors py-1"
        >
          Skip and configure later
        </button>
      </div>
    </div>
  );
}
