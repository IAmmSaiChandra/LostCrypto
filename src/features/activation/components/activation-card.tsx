"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Key, Check, Loader2, AlertCircle, TriangleAlert, Shield, Lock, CheckCircle2 } from "lucide-react";
import { useActivation } from "../hooks/use-activation";
import { useActivationStore } from "@/src/store/use-activation-store";
import { GhostMascot } from "./ghost-mascot";

export function ActivationCard() {
  const { form, status, errorMessage, onSubmit } = useActivation();
  const { setStatus, setErrorMessage } = useActivationStore();
  const [isFocused, setIsFocused] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const activationKey = form.watch("activationKey");
  const hasFormError = !!form.formState.errors.activationKey && form.formState.isSubmitted;
  const isInputEmpty = !activationKey || activationKey.trim().length === 0;

  const isNotice = hasFormError && isInputEmpty;
  const isError = status === "error" || (hasFormError && !isInputEmpty);

  useEffect(() => {
    if (isNotice) {
      setStatus("error");
      setErrorMessage("Please enter your activation key.");
    }
  }, [isNotice, setStatus, setErrorMessage]);

  useEffect(() => {
    if (status === "error" && errorMessage) {
      setToastMessage(errorMessage);
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [status, errorMessage]);

  const getMascotState = () => {
    if (status === "success") return "success";
    if (status === "loading") return "focused";
    if (isError) return "error";
    if (isFocused) return "focused";
    return "idle";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 w-full max-w-[360px] p-4 bg-[#111a2e] border border-red-500/40 border-l-4 border-l-red-500 rounded-xl shadow-2xl flex items-start gap-3 select-none"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[13px] font-bold text-[#f8fafc]">Activation Error</h5>
              <p className="text-[12px] text-[#94a3b8] mt-0.5 leading-relaxed">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full bg-[#111a2e] rounded-2xl border border-[#1e2e4a] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] flex flex-col items-center">
        {/* Brand Cryptographic Emblem */}
        <div className="mb-5">
          <GhostMascot state={getMascotState()} />
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[24px] font-bold text-[#f8fafc] tracking-tight leading-tight mb-2">
            Activate LostCrypto Engine
          </h1>
          <p className="text-[14px] text-[#94a3b8] leading-relaxed max-w-[340px]">
            Enter your 16-character authorization key to unlock recovery scanning modules.
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-[#1e2e4a] my-6" />

        {/* Form */}
        <form onSubmit={onSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="activation-key" className="text-[13px] font-semibold text-[#f8fafc]">
                Product License Key
              </label>
              {isError && (
                <span className="text-[11px] text-red-400 font-bold uppercase tracking-wider">
                  Invalid Key
                </span>
              )}
              {isNotice && (
                <span className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                  Required
                </span>
              )}
            </div>
            
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                  isError ? "text-red-400" : isNotice ? "text-amber-400" : isFocused ? "text-[#3b82f6]" : "text-[#64748b]"
                }`}
              >
                <Key className="w-4 h-4" />
              </div>
              
              <input
                id="activation-key"
                type="text"
                disabled={status === "loading" || status === "success"}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                {...form.register("activationKey")}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => {
                  form.register("activationKey").onChange(e);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorMessage("");
                  }
                }}
                className={`w-full h-12 pl-11 pr-11 rounded-lg border bg-[#0d1424] text-[14px] font-mono text-[#f8fafc] placeholder-[#64748b] focus:outline-none transition-all duration-150 ${
                  isError
                    ? "border-red-500/80 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                    : isNotice
                    ? "border-amber-500/80 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    : "border-[#1e2e4a] focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20"
                }`}
              />
              
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[#60a5fa]"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </motion.div>
                  )}
                  {isError && status !== "loading" && (
                    <motion.div
                      key="error-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400"
                    >
                      <AlertCircle className="w-4 h-4" />
                    </motion.div>
                  )}
                  {isNotice && status !== "loading" && (
                    <motion.div
                      key="notice-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-amber-400"
                    >
                      <TriangleAlert className="w-4 h-4" />
                    </motion.div>
                  )}
                  {!isError && !isNotice && activationKey && activationKey.length >= 8 && status === "idle" && (
                    <motion.div
                      key="check-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[#3b82f6]"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Feedback messages */}
            <AnimatePresence mode="wait">
              {isError && (
                <motion.p
                  key="error-msg"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[12px] text-red-400 mt-1.5 flex items-center gap-1.5"
                >
                  <span>✖</span>{" "}
                  {status === "error" && errorMessage ? errorMessage : "Invalid activation key. Verify key and retry."}
                </motion.p>
              )}
              {isNotice && (
                <motion.p
                  key="notice-msg"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[12px] text-amber-400 mt-1.5 flex items-center gap-1.5"
                >
                  <span>⚠</span> Please enter your activation key.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Activate Button */}
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full h-12 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[14px] font-semibold flex items-center justify-center transition-all duration-150 disabled:bg-[#1e2e4a] disabled:text-[#64748b] disabled:cursor-not-allowed shadow-[0_2px_12px_rgba(37,99,235,0.3)] mt-2"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Verifying License...
              </span>
            ) : status === "success" ? (
              <span className="flex items-center gap-2 text-white">
                <Check className="w-4 h-4 text-emerald-400" /> License Activated
              </span>
            ) : (
              "Authorize & Continue"
            )}
          </button>
        </form>

        {/* Security / Trust Indicators */}
        <div className="flex items-center justify-center gap-4 text-[12px] text-[#64748b] mt-6 select-none border-t border-[#1e2e4a] pt-4 w-full">
          <span className="flex items-center gap-1.5 text-[#94a3b8]">
            <Shield className="w-3.5 h-3.5 text-[#3b82f6]" /> 256-bit Encrypted
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-[#94a3b8]">
            <Lock className="w-3.5 h-3.5 text-[#3b82f6]" /> Local Storage Only
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-[#94a3b8]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3b82f6]" /> Cryptographically Signed
          </span>
        </div>
      </div>
    </div>
  );
}
