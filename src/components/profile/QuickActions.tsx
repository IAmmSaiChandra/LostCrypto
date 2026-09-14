"use client";

import React, { useState } from "react";
import { User, Copy, Check, LogOut, ExternalLink, Zap } from "lucide-react";
import { useActivationStore } from "@/src/store/use-activation-store";

interface QuickActionsProps {
  activationKey: string;
}

export function QuickActions({ activationKey }: QuickActionsProps) {
  const [copied, setCopied] = useState(false);
  const { setStep } = useActivationStore();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activationKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("user-name");
    localStorage.removeItem("user-email");
    localStorage.removeItem("activation-key");
    localStorage.removeItem("activation-date");
    localStorage.removeItem("uploaded-photo");
    document.cookie = "activation-key=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setStep("activation");
    window.location.href = "/activation";
  };

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1e2e4a]">
        <Zap className="w-4 h-4 text-[#3b82f6]" />
        <h3 className="text-[15px] font-bold text-[#f8fafc] tracking-tight">
          Operator Actions
        </h3>
      </div>

      <div className="flex flex-col gap-2.5">
        {/* Telegram Community */}
        <a
          href="https://t.me/groupkeys"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-11 rounded-lg bg-[#172440] hover:bg-[#1e3054] border border-[#1e2e4a] hover:border-[#2d446e] text-[13px] text-[#f8fafc] font-medium flex items-center justify-between px-4 transition-all"
        >
          <span className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-[#60a5fa]" />
            Official Telegram Support
          </span>
          <span className="text-[11px] font-mono text-[#60a5fa] flex items-center gap-1">
            @rioggz <ExternalLink className="w-3 h-3 text-[#64748b]" />
          </span>
        </a>

        {/* Copy Activation Key */}
        <button
          onClick={handleCopy}
          className="w-full h-11 rounded-lg bg-[#172440] hover:bg-[#1e3054] border border-[#1e2e4a] hover:border-[#2d446e] text-[13px] text-[#f8fafc] font-medium flex items-center justify-between px-4 transition-all"
        >
          <span className="flex items-center gap-2.5">
            <Copy className="w-4 h-4 text-[#60a5fa]" />
            Copy License Key
          </span>
          {copied ? (
            <span className="text-emerald-400 text-[11px] font-mono font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Copied
            </span>
          ) : (
            <span className="text-[11px] font-mono text-[#94a3b8]">Copy</span>
          )}
        </button>

        {/* Log Out */}
        <button
          onClick={handleLogOut}
          className="w-full h-11 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-[13px] text-red-400 font-semibold flex items-center justify-between px-4 transition-all mt-1"
        >
          <span className="flex items-center gap-2.5">
            <LogOut className="w-4 h-4" />
            Terminate Operator Session
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider">Reset</span>
        </button>
      </div>
    </div>
  );
}
