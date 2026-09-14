"use client";

import React, { useState, useEffect } from "react";
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
      const expDate = new Date(actDate.getTime() + 180 * 24 * 60 * 60 * 1000);
      const today = new Date();
      
      const diffTime = expDate.getTime() - today.getTime();
      const remainingDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      const percentRemaining = Math.min(100, Math.max(0, Math.round((remainingDays / 180) * 100)));

      const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
      setDates({
        activatedOn: actDate.toLocaleDateString("en-GB", options),
        expiresOn: expDate.toLocaleDateString("en-GB", options),
        remainingDays,
        percentRemaining,
      });
    } catch (err) {
      // Fallback
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

  const maskKey = (key: string) => {
    if (!key) return "LOST-CR •••••••• 2026";
    const cleanKey = key.replace(/[^a-zA-Z0-9]/g, "");
    if (cleanKey.length < 10) return `${key.substring(0, 4)} •••••••• ${key.substring(key.length - 4)}`;
    return `${cleanKey.substring(0, 6)} •••••••• ${cleanKey.substring(cleanKey.length - 4)}`;
  };

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-[#1e2e4a]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#3b82f6]" />
          <h3 className="text-[15px] font-bold text-[#f8fafc] tracking-tight">
            Software License & Clearance
          </h3>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          ACTIVE LICENSE
        </span>
      </div>

      {/* Activation Key Info */}
      <div className="flex items-center justify-between bg-[#0d1424] border border-[#1e2e4a] rounded-lg p-3.5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#172440] border border-[#1e2e4a] flex items-center justify-center text-[#60a5fa] shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] text-[#64748b] font-mono font-bold uppercase tracking-wider">
              Cryptographic Key
            </p>
            <p className="text-[13px] font-mono text-[#f8fafc] font-semibold mt-0.5">
              {maskKey(activationKey)}
            </p>
          </div>
        </div>
        
        <button
          onClick={copyKey}
          type="button"
          className="w-8 h-8 rounded-md bg-[#172440] border border-[#1e2e4a] hover:bg-[#1e3054] flex items-center justify-center text-[#94a3b8] hover:text-[#f8fafc] transition-all"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* Progress Bar validity */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline text-[12px] font-mono">
          <span className="text-[#94a3b8]">
            Clearance Validity
          </span>
          <span className="text-[#60a5fa] font-bold">
            {dates.remainingDays} Days Remaining ({dates.percentRemaining}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#0d1424] overflow-hidden border border-[#1e2e4a]">
          <div
            style={{ width: `${dates.percentRemaining}%` }}
            className="h-full rounded-full bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.4)] transition-all duration-500"
          />
        </div>
      </div>

      {/* Date metadata fields */}
      <div className="grid grid-cols-2 gap-4 border-t border-[#1e2e4a] pt-4">
        <div>
          <span className="text-[11px] text-[#64748b] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#3b82f6]" /> Activated
          </span>
          <p className="text-[13px] text-[#f8fafc] font-mono font-semibold mt-1">
            {dates.activatedOn}
          </p>
        </div>
        <div>
          <span className="text-[11px] text-[#64748b] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3b82f6]" /> Expiration
          </span>
          <p className="text-[13px] text-[#f8fafc] font-mono font-semibold mt-1">
            {dates.expiresOn}
          </p>
        </div>
      </div>
    </div>
  );
}
