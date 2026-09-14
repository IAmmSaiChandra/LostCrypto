"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Copy, Check, ShieldQuestion } from "lucide-react";

export function SupportCard() {
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText("https://t.me/groupkeys");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <div className="w-full bg-[#111a2e] rounded-2xl border border-[#1e2e4a] p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)] text-center relative overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Support Icon */}
        <div className="w-10 h-10 rounded-lg bg-[#172440] border border-[#1e2e4a] flex items-center justify-center mb-3">
          <ShieldQuestion className="w-5 h-5 text-[#3b82f6]" />
        </div>

        <h3 className="text-[16px] font-bold text-[#f8fafc] tracking-tight mb-1">
          Need an Activation Key?
        </h3>
        <p className="text-[13px] text-[#94a3b8] leading-relaxed mb-4 max-w-[320px]">
          Join the community distribution group and tag the verified administrator <span className="text-[#60a5fa] font-mono">@rioggz</span> to request your credentials.
        </p>

        {/* Username focus area */}
        <div className="px-4 py-2 rounded-lg bg-[#0d1424] border border-[#1e2e4a] text-[18px] font-bold text-[#60a5fa] font-mono mb-5 select-all">
          @rioggz
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5 justify-center items-center">
          <a
            href="https://t.me/groupkeys"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-11 px-5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-medium flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(37,99,235,0.25)] transition-all"
          >
            <Send className="w-4 h-4" />
            Join Telegram Group
          </a>
          
          <button
            type="button"
            onClick={copyNumber}
            className="w-full sm:w-auto h-11 px-5 rounded-lg bg-[#172440] hover:bg-[#1e3054] border border-[#1e2e4a] text-[13px] text-[#f8fafc] font-medium flex items-center justify-center gap-2 transition-all"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5 text-emerald-400 font-semibold"
                >
                  <Check className="w-4 h-4" />
                  Copied Link ✓
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5"
                >
                  <Copy className="w-4 h-4 text-[#94a3b8]" />
                  Copy Group Link
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </div>
  );
}
