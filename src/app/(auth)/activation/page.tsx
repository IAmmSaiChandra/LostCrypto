"use client";

import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { ActivationCard } from "@/src/features/activation/components/activation-card";
import { SupportCard } from "@/src/features/activation/components/support-card";
import { SuccessScreen } from "@/src/features/activation/components/success-screen";
import { ProfileSetupForm } from "@/src/features/activation/components/profile-setup-form";
import { BlockchainSelector } from "@/src/features/activation/components/blockchain-selector";
import { useActivationStore } from "@/src/store/use-activation-store";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function ActivationPage() {
  const { step } = useActivationStore();
  const { profile, isLoading } = useSupabaseUser();

  // If user is already fully initialized, redirect directly to dashboard
  React.useEffect(() => {
    if (!isLoading && profile?.activation_key && profile?.name && profile?.name !== "User") {
      window.location.href = "/dashboard";
    }
  }, [profile, isLoading]);

  const isWideLayout = step === "chains";

  return (
    <div className="min-h-screen flex flex-col justify-between items-center py-12 px-6 font-sans relative overflow-hidden selection:bg-black selection:text-white">
      {/* Decorative Vignette & Subtle Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,244,184,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.015)] pointer-events-none" />
      
      <div />
      
      <motion.div
        animate={{ maxWidth: isWideLayout ? 480 : 460 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full relative z-10"
      >
        <AnimatePresence mode="wait">
          {step === "activation" && (
            <motion.div
              key="activation-step"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <ActivationCard />
              </motion.div>
              <motion.div variants={itemVariants}>
                <SupportCard />
              </motion.div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SuccessScreen />
            </motion.div>
          )}

          {step === "profile" && (
            <motion.div
              key="profile-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProfileSetupForm />
            </motion.div>
          )}

          {step === "chains" && (
            <motion.div
              key="chains-step"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BlockchainSelector />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <footer className="text-center text-[12px] text-[#6B7280] select-none tracking-wide mt-8 relative z-10">
        Secure Activation • One-Time Verification
      </footer>
    </div>
  );
}
