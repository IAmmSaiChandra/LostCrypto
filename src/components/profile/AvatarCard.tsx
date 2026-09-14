"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, User } from "lucide-react";
import { useAvatar } from "@/src/hooks/useAvatar";

interface AvatarCardProps {
  name: string;
  email: string;
}

export function AvatarCard({ name, email }: AvatarCardProps) {
  const { avatarUrl } = useAvatar();

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] flex flex-col items-center text-center relative overflow-hidden">
      {/* Avatar Container */}
      <div className="relative w-24 h-24 rounded-full border-2 border-[#2563eb]/40 p-1 bg-[#0d1424] shadow-[0_0_20px_rgba(37,99,235,0.2)] flex items-center justify-center mb-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profile Avatar"
            width={88}
            height={88}
            className="w-full h-full rounded-full object-cover"
            priority
          />
        ) : (
          <User className="w-10 h-10 text-[#64748b]" />
        )}
      </div>

      <h2 className="text-[20px] font-bold text-[#f8fafc] tracking-tight leading-tight mb-1">
        {name || "Anonymous Operator"}
      </h2>
      <p className="text-[13px] text-[#94a3b8] font-mono mb-4">
        {email || "setup-pending@lostcrypto.io"}
      </p>

      {/* Verified Badge */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#2563eb]/10 border border-[#2563eb]/30 text-[#60a5fa] text-[12px] font-mono font-semibold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Verified Hardware Node
      </span>
    </div>
  );
}
