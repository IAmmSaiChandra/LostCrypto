"use client";

import React, { useState } from "react";
import { Send, Copy, Check, Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function WhatsAppCard() {
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText("https://t.me/groupkeys");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setNotice("Failed to copy. Please copy manually: https://t.me/groupkeys");
      setTimeout(() => setNotice(null), 3000);
    }
  };

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] text-center relative overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Support Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#172440] border border-[#1e2e4a] flex items-center justify-center mb-3 text-[#3b82f6] shadow-[0_0_16px_rgba(37,99,235,0.2)]">
          <Send className="w-5 h-5" />
        </div>

        <h3 className="text-[16px] font-bold text-[#f8fafc] tracking-tight mb-1">
          Telegram Operator Support
        </h3>
        <p className="text-[13px] text-[#94a3b8] leading-relaxed mb-4 max-w-[280px]">
          Join the community discussion and tag the system administrator <span className="text-[#60a5fa] font-mono">@rioggz</span> for direct clearance.
        </p>

        {/* Username focus area */}
        <div className="px-4 py-2 rounded-lg bg-[#0d1424] border border-[#1e2e4a] text-[22px] font-bold text-[#60a5fa] font-mono mb-5 select-all">
          @rioggz
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-2.5 justify-center items-center">
          <a
            href="https://t.me/groupkeys"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-11 px-5 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold flex items-center justify-center gap-2 shadow-[0_2px_10px_rgba(37,99,235,0.3)] transition-all"
          >
            <Send className="w-4 h-4" />
            Join Telegram
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
                  Copy Link
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {notice && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 flex items-center gap-1 text-[12px] text-amber-400 font-medium"
            >
              <Info className="w-3.5 h-3.5 shrink-0" />
              {notice}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
