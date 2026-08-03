"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Calendar, ShieldCheck, Key } from "lucide-react";

interface LicenseCardProps {
  activationKey: string;
  activationDateStr: string;
}

export function LicenseCard({ activationKey, activationDateStr }: LicenseCardProps) {
  const [copied, setCopied] = useState(false);
  const [dates, setDates] = useState({
    activatedOn: "27 July 2026",
    expiresOn: "16 December 2026",
    remainingDays: 142,
    percentRemaining: 72,
  });

  useEffect(() => {
    try {
      const actDate = activationDateStr ? new Date(activationDateStr) : new Date("2026-07-27T12:00:00.000Z");
      
      // Assume license has a validity of 180 days
      const expDate = new Date(actDate.getTime() + 180 * 24 * 60 * 60 * 1000);
      const today = new Date();
      
      const diffTime = expDate.getTime() - today.getTime();
      const remainingDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      
      // Percentage calculation (max 180 days)
      const percentRemaining = Math.min(100, Math.max(0, Math.round((remainingDays / 180) * 100)));

      const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
      setDates({
        activatedOn: actDate.toLocaleDateString("en-GB", options),
        expiresOn: expDate.toLocaleDateString("en-GB", options),
        remainingDays,
        percentRemaining,
      });
    } catch (err) {
      // Fallback defaults
    }
  }, [activationDateStr]);

  const copyKey = async () => {
    try {
      await navigator.clipboard.writeText(activationKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  // Mask activation key: ABC12345-6789-0000-1111-222233334444 -> ABC123 •••••••• 4444
  const maskKey = (key: string) => {
    if (!key) return "LOST-CR •••••••• 2026";
    const cleanKey = key.replace(/[^a-zA-Z0-9]/g, "");
    if (cleanKey.length < 10) return `${key.substring(0, 4)} •••••••• ${key.substring(key.length - 4)}`;
    return `${cleanKey.substring(0, 6)} •••••••• ${cleanKey.substring(cleanKey.length - 4)}`;
  };

  // Progress Bar Colors
  const getProgressBarColor = (days: number) => {
    if (days < 7) return "bg-red-500";
    if (days < 30) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getBadgeColor = (days: number) => {
    if (days < 7) return "bg-red-50 border border-red-200/50 text-red-600";
    if (days < 30) return "bg-amber-50 border border-amber-200/50 text-amber-600";
    return "bg-emerald-50 border border-emerald-200/50 text-emerald-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[18px] font-bold text-black tracking-tight">
          License
        </h3>
        <span className={`px-3 py-1 rounded-full text-[12px] font-bold flex items-center gap-1.5 ${getBadgeColor(dates.remainingDays)}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${dates.remainingDays < 7 ? "bg-red-500" : dates.remainingDays < 30 ? "bg-amber-500" : "bg-emerald-500"} animate-pulse`} />
          Active
        </span>
      </div>

      {/* Activation Key Info */}
      <div className="flex items-center justify-between bg-[#FAFAFA] border border-[#F1F1F1] rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-neutral-500 shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] text-[#6B7280] font-bold uppercase tracking-wider">
              Activation Key
            </p>
            <p className="text-[14px] font-mono text-black font-semibold mt-0.5">
              {maskKey(activationKey)}
            </p>
          </div>
        </div>
        
        <button
          onClick={copyKey}
          type="button"
          className="w-9 h-9 rounded-xl bg-white border border-[#E5E7EB] hover:bg-[#F8F8F8] flex items-center justify-center text-neutral-500 transition-all duration-200"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Check className="w-4 h-4 text-emerald-500" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Copy className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Progress Bar validity */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-[13px] text-[#6B7280] font-semibold">
            License Expires In
          </span>
          <span className="text-[13px] text-black font-extrabold">
            {dates.remainingDays} Days Remaining
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-neutral-100 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${dates.percentRemaining}%` }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${getProgressBarColor(dates.remainingDays)}`}
          />
        </div>
        <div className="flex justify-end text-[11px] text-[#9CA3AF] font-bold">
          {dates.percentRemaining}%
        </div>
      </div>

      {/* Date metadata fields */}
      <div className="grid grid-cols-2 gap-4 border-t border-[#F1F1F1] pt-6">
        <div>
          <span className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Activated On
          </span>
          <p className="text-[14px] text-black font-bold mt-1">
            {dates.activatedOn}
          </p>
        </div>
        <div>
          <span className="text-[11px] text-[#9CA3AF] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" /> Expires On
          </span>
          <p className="text-[14px] text-black font-bold mt-1">
            {dates.expiresOn}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
