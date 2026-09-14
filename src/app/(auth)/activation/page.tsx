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
import { Shield } from "lucide-react";

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
    <div className="min-h-screen flex flex-col justify-between items-center py-10 px-4 sm:px-6 bg-[#090d16] text-[#f8fafc] font-sans relative overflow-hidden">
      {/* Top Brand Header */}
      <header className="flex items-center gap-2 select-none mb-4">
        <div className="w-7 h-7 rounded-md bg-[#2563eb] flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.4)]">
          <Shield className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-[13px] font-extrabold tracking-widest uppercase text-[#f8fafc]">
          Lost<span className="text-[#3b82f6]">Crypto</span>
        </span>
        <span className="text-[10px] font-mono text-[#64748b] bg-[#111a2e] border border-[#1e2e4a] px-1.5 py-0.5 rounded">
          CORE
        </span>
      </header>
      
      {/* Main Form Box */}
      <div
        className="w-full relative z-10 transition-all duration-300"
        style={{ maxWidth: isWideLayout ? "520px" : "460px" }}
      >
        <AnimatePresence mode="wait">
          {step === "activation" && (
            <div key="activation-step" className="space-y-6">
              <ActivationCard />
              <SupportCard />
            </div>
          )}

          {step === "success" && (
            <div key="success-step">
              <SuccessScreen />
            </div>
          )}

          {step === "profile" && (
            <div key="profile-step">
              <ProfileSetupForm />
            </div>
          )}

          {step === "chains" && (
            <div key="chains-step">
              <BlockchainSelector />
            </div>
          )}
        </AnimatePresence>
      </div>

      <footer className="text-center text-[12px] font-mono text-[#64748b] select-none tracking-wider mt-8 relative z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
        <span>SECURE INITIALIZATION • CRYPTOGRAPHIC ISOLATION</span>
      </footer>
    </div>
  );
}
