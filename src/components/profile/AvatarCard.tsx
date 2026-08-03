"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useAvatar } from "@/src/hooks/useAvatar";

interface AvatarCardProps {
  name: string;
  email: string;
}

export function AvatarCard({ name, email }: AvatarCardProps) {
  const { avatarUrl } = useAvatar();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Soft floating loop on avatar container */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-28 h-28 rounded-full border border-neutral-100 p-1 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.03)] flex items-center justify-center mb-5"
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profile Avatar"
            width={100}
            height={100}
            className="w-full h-full rounded-full object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full rounded-full bg-neutral-100 animate-pulse" />
        )}
      </motion.div>

      <h2 className="text-[24px] font-extrabold text-black tracking-tight leading-tight mb-1">
        {name || "Anonymous User"}
      </h2>
      <p className="text-[14px] text-[#6B7280] font-semibold mb-4">
        {email || "setup-pending@lostcrypto.io"}
      </p>

      {/* Verified Badge */}
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/50 text-emerald-600 text-[12px] font-bold">
        <CheckCircle2 className="w-3.5 h-3.5" />
        Verified User
      </span>
    </motion.div>
  );
}
