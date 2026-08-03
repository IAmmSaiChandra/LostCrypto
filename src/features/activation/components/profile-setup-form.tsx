"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
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
    
    // Transition to blockchain selection step
    setStep("chains");
  };

  return (
    <div className="w-full flex flex-col justify-start">
      {/* Dynamic Brand Signature Ghost Mascot watching user write details */}
      <div className="w-full flex justify-center mb-2">
        <GhostMascot state="profile" />
      </div>

      {/* Morph Title Animation */}
      <div className="text-center mb-6">
        <motion.h1
          layoutId="onboarding-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[32px] font-bold text-black tracking-tight"
        >
          Let&apos;s set up your profile
        </motion.h1>
        <p className="text-[15px] text-[#6B7280] mt-2">
          Personalize your account to get started.
        </p>
      </div>

      {/* Avatar Picker Section placed above the inputs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-6"
      >
        <AvatarPicker
          avatarUrl={avatarUrl}
          isLoading={avatarLoading}
          uploadedPhoto={uploadedPhoto}
          onShuffle={handleShuffle}
          onUpload={handleUpload}
          onReset={handleResetToGenerated}
        />
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white rounded-[24px] border border-[#E5E7EB] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.01)]"
      >
        {/* Full Name Input */}
        <div className="space-y-2">
          <label htmlFor="full-name" className="text-[14px] font-medium text-black">
            Full Name
          </label>
          <input
            id="full-name"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className="w-full h-[56px] px-5 rounded-[18px] border border-[#E5E7EB] bg-white text-[16px] text-black placeholder-[#9CA3AF] focus:outline-none focus:border-black focus:ring-0 shadow-sm transition-all duration-200"
          />
          {errors.fullName && (
            <p className="text-[13px] text-[#6B7280]">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Address Input */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-[14px] font-medium text-black">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register("email")}
            className="w-full h-[56px] px-5 rounded-[18px] border border-[#E5E7EB] bg-white text-[16px] text-black placeholder-[#9CA3AF] focus:outline-none focus:border-black focus:ring-0 shadow-sm transition-all duration-200"
          />
          {errors.email && (
            <p className="text-[13px] text-[#6B7280]">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Continue Button */}
        <motion.button
          type="submit"
          disabled={!isValid || loading}
          whileHover={isValid && !loading ? { y: -2, opacity: 0.95 } : {}}
          whileTap={isValid && !loading ? { scale: 0.98 } : {}}
          className="w-full h-[56px] rounded-[18px] bg-black text-white text-[15px] font-medium flex items-center justify-center transition-all duration-200 disabled:bg-[#D1D5DB] disabled:cursor-not-allowed disabled:transform-none shadow-sm mt-4"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Continue"
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}
