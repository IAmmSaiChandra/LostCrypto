"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, User, Mail, ArrowRight } from "lucide-react";
import { AvatarPicker } from "./avatar-picker";
import { useAvatar } from "@/src/hooks/useAvatar";
import { useActivationStore } from "@/src/store/use-activation-store";
import { GhostMascot } from "./ghost-mascot";
import { supabase } from "@/src/lib/supabase/client";

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type ProfileInput = z.infer<typeof profileSchema>;

export function ProfileSetupForm() {
  const [loading, setLoading] = useState(false);
  const { setStep } = useActivationStore();
  const {
    avatarUrl,
    isLoading: avatarLoading,
    uploadedPhoto,
    handleShuffle,
    handleUpload,
    handleResetToGenerated,
  } = useAvatar();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ProfileInput) => {
    setLoading(true);
    
    try {
      const userId = localStorage.getItem("lostcrypto_user_id");
      if (userId) {
        await supabase.from('profiles').update({ 
          name: data.fullName, 
          email: data.email,
          avatar_url: avatarUrl || null,
        }).eq('user_id', userId);
      }
    } catch (e) {
      console.error(e);
    }
    
    setLoading(false);
    
    localStorage.setItem("user-name", data.fullName);
    localStorage.setItem("user-email", data.email);
    
    setStep("chains");
  };

  return (
    <div className="w-full flex flex-col justify-start">
      {/* Emblem */}
      <div className="w-full flex justify-center mb-4">
        <GhostMascot state="profile" />
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-[24px] font-bold text-[#f8fafc] tracking-tight">
          Operator Profile Setup
        </h1>
        <p className="text-[14px] text-[#94a3b8] mt-1">
          Configure your local identity for recovered wallet associations.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-[#111a2e] rounded-2xl border border-[#1e2e4a] p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.35)] space-y-6">
        {/* Avatar Picker */}
        <div className="pb-4 border-b border-[#1e2e4a]">
          <AvatarPicker
            avatarUrl={avatarUrl}
            isLoading={avatarLoading}
            uploadedPhoto={uploadedPhoto}
            onShuffle={handleShuffle}
            onUpload={handleUpload}
            onReset={handleResetToGenerated}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name Input */}
          <div className="space-y-1.5">
            <label htmlFor="full-name" className="text-[13px] font-medium text-[#94a3b8]">
              Operator Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="full-name"
                type="text"
                placeholder="e.g. Alex Vance"
                {...register("fullName")}
                className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-[#0d1424] text-[14px] text-[#f8fafc] placeholder-[#64748b] focus:outline-none transition-all duration-150 ${
                  errors.fullName
                    ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-[#1e2e4a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[12px] text-red-400 font-medium">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email Address Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[13px] font-medium text-[#94a3b8]">
              Notification Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748b]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="operator@lostcrypto.io"
                {...register("email")}
                className={`w-full h-11 pl-10 pr-4 rounded-lg border bg-[#0d1424] text-[14px] text-[#f8fafc] placeholder-[#64748b] focus:outline-none transition-all duration-150 ${
                  errors.email
                    ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : "border-[#1e2e4a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-[12px] text-red-400 font-medium">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full h-12 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-150 disabled:bg-[#1e2e4a] disabled:text-[#64748b] disabled:cursor-not-allowed shadow-[0_2px_12px_rgba(37,99,235,0.3)] mt-6"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Saving Profile...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Continue to Network Selection <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
