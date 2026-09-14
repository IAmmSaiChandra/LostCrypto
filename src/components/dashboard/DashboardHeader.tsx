"use client";

import React from "react";
import Image from "next/image";
import { Bell, Activity, ShieldCheck } from "lucide-react";
import { useAvatar } from "@/src/hooks/useAvatar";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";

export function DashboardHeader() {
  const { profile, isLoading } = useSupabaseUser();
  const { avatarUrl } = useAvatar();

  const name = profile?.name || "Operator";

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1e2e4a]">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-mono text-[#60a5fa] font-semibold uppercase tracking-wider bg-[#2563eb]/10 border border-[#2563eb]/30 px-2 py-0.5 rounded">
            Recovery Console
          </span>
          <span className="text-[12px] text-[#64748b]">•</span>
          <span className="text-[12px] text-[#94a3b8] flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3b82f6]" /> Multi-Chain Synchronized
          </span>
        </div>
        <h1 className="text-[26px] sm:text-[30px] font-bold text-[#f8fafc] tracking-tight leading-tight">
          {isLoading ? (
            <div className="h-8 w-60 bg-[#172440] animate-pulse rounded"></div>
          ) : (
            `Welcome back, ${name.split(" ")[0]}`
          )}
        </h1>
        <p className="text-[13px] text-[#94a3b8] mt-1">
          Cryptographic entropy generator and balance verifier ready.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 select-none">
        {/* Live system ping */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111a2e] border border-[#1e2e4a] text-[12px] font-mono text-[#94a3b8]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>RPC Online</span>
        </div>

        {/* User Avatar with status */}
        <div className="relative">
          <div className="w-10 h-10 rounded-lg border border-[#1e2e4a] bg-[#111a2e] p-0.5 shadow-sm flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="User Avatar"
                width={36}
                height={36}
                className="w-full h-full rounded-md object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-md bg-[#172440]" />
            )}
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#090d16] rounded-full" />
        </div>
      </div>
    </div>
  );
}
