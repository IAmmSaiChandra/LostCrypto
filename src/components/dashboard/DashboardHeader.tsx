"use client";

import React from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import { useAvatar } from "@/src/hooks/useAvatar";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";

export function DashboardHeader() {
  const { profile, isLoading } = useSupabaseUser();
  const { avatarUrl } = useAvatar();

  const name = profile?.name || "User";

  return (
    <div className="w-full flex items-center justify-between border-b border-[#F1F1F1] pb-6 mb-2">
      <div>
        <h2 className="text-[13px] font-bold text-[#6B7280] uppercase tracking-wider">
          LostCrypto
        </h2>
        <h1 className="text-[32px] font-extrabold text-black tracking-tight leading-none mt-1.5">
          {isLoading ? (
            <div className="h-8 w-64 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            `Good Morning, ${name.split(" ")[0]} 👋`
          )}
        </h1>
        <p className="text-[14px] text-[#9CA3AF] mt-1.5 font-medium">
          Welcome back! Your wallet scanner is ready.
        </p>
      </div>

      <div className="flex items-center gap-4 shrink-0 select-none">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-neutral-600 hover:text-black hover:bg-[#F8F8F8] transition-all duration-200"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
        </button>

        {/* User Avatar & Status indicator */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full border border-neutral-100 p-0.5 bg-white shadow-sm flex items-center justify-center">
            {avatarUrl ? (
               <Image
                 src={avatarUrl}
                 alt="User Avatar"
                 width={36}
                 height={36}
                 className="w-full h-full rounded-full object-cover"
               />
            ) : (
              <div className="w-full h-full rounded-full bg-neutral-100" />
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
