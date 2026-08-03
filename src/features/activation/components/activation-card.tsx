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

  // Notice state triggers when empty and submitted
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
            className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-50 w-full max-w-[360px] p-4 bg-white border-l-4 border-red-500 rounded-xl shadow-lg flex items-start gap-3 select-none"
          >
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-[14px] font-bold text-black">Activation Failed</h5>
              <p className="text-[13px] text-[#6B7280] mt-0.5 leading-relaxed">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col items-center"
      >
        {/* Butter-Yellow Mascot centered and floating freely */}
        <div className="mb-4">
          <GhostMascot state={getMascotState()} />
        </div>

        {/* Heading */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[32px] font-extrabold text-black tracking-tight leading-none mb-3">
            Let&apos;s get you started
          </h1>
          <p className="text-[15px] text-[#6B7280] leading-relaxed max-w-[320px]">
            Enter your activation key to continue your setup.
          </p>
        </div>

        {/* Soft Divider */}
        <div className="h-[1px] w-full bg-[#F1F1F1] my-8" />

        {/* Form */}
        <form onSubmit={onSubmit} className="w-full space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="activation-key" className="text-[14px] font-semibold text-black">
                Activation Key
              </label>
              {isError && (
                <span className="text-[13px] text-red-500 font-bold tracking-wide uppercase">
                  Error
                </span>
              )}
              {isNotice && (
                <span className="text-[13px] text-amber-600 font-bold tracking-wide uppercase">
                  Required
                </span>
              )}
            </div>
            
            <motion.div
              animate={isError ? { x: [-6, 6, -6, 6, -3, 3, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              {/* Key Icon - Rotates on focus */}
              <motion.div
                animate={{ rotate: isFocused ? 15 : 0 }}
                className={`absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors duration-200 ${
                  isError ? "text-red-500" : isNotice ? "text-amber-500" : "text-[#6B7280]"
                }`}
              >
                <Key className="w-[18px] h-[18px]" />
              </motion.div>
              
              <input
                id="activation-key"
                type="text"
                disabled={status === "loading" || status === "success"}
                placeholder={isFocused ? "" : "Enter activation key"}
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
                className={`w-full h-[58px] pl-12 pr-12 rounded-2xl border bg-white text-[16px] text-black placeholder-[#9CA3AF] focus:outline-none transition-all duration-200 ${
                  isError
                    ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/10"
                    : isNotice
                    ? "border-amber-500 focus:border-amber-500 ring-2 ring-amber-500/10"
                    : "border-[#E5E7EB] focus:border-black focus:ring-2 focus:ring-black/5"
                }`}
              />
              
              <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                <AnimatePresence mode="wait">
                  {status === "loading" && (
                    <motion.div
                      key="loader"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-black"
                    >
                      <Loader2 className="w-[18px] h-[18px] animate-spin" />
                    </motion.div>
                  )}
                  {isError && status !== "loading" && (
                    <motion.div
                      key="error-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-red-500"
                    >
                      <AlertCircle className="w-[18px] h-[18px]" />
                    </motion.div>
                  )}
                  {isNotice && status !== "loading" && (
                    <motion.div
                      key="notice-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-amber-500"
                    >
                      <TriangleAlert className="w-[18px] h-[18px]" />
                    </motion.div>
                  )}
                  {!isError && !isNotice && activationKey && activationKey.length >= 8 && status === "idle" && (
                    <motion.div
                      key="check-icon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-black"
                    >
                      <Check className="w-[18px] h-[18px]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
            {/* Custom Validation Feedback messages */}
            <AnimatePresence mode="wait">
              {isError && (
                <motion.p
                  key="error-msg"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[14px] text-[#6B7280] mt-2 flex items-center gap-1.5"
                >
                  <span className="text-red-500 font-bold">✖</span>{" "}
                  {status === "error" && errorMessage ? (
                    errorMessage
                  ) : (
                    "Invalid activation key. Please check your activation key and try again."
                  )}
                </motion.p>
              )}
              {isNotice && (
                <motion.p
                  key="notice-msg"
                  initial={{ opacity: 0, y: -2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[14px] text-[#6B7280] mt-2 flex items-center gap-1.5"
                >
                  <span className="text-amber-500 font-bold">⚠</span> Please enter your activation key.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Activate Button */}
          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success"}
            whileHover={activationKey && status === "idle" ? { y: -2, opacity: 0.95 } : {}}
            whileTap={activationKey && status === "idle" ? { scale: 0.98 } : {}}
            className="w-full h-[58px] rounded-2xl bg-black text-white text-[15px] font-semibold flex items-center justify-center transition-all duration-200 disabled:bg-[#D1D5DB] disabled:cursor-not-allowed disabled:transform-none shadow-[0_4px_12px_rgba(0,0,0,0.05)] mt-4"
          >
            {status === "loading" ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : status === "success" ? (
              <span className="flex items-center gap-2">
                <Check className="w-5 h-5" /> Activation successful
              </span>
            ) : (
              "Activate"
            )}
          </motion.button>
        </form>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-3 text-[13px] text-[#6B7280] mt-8 select-none">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-[#FFF4B8]" style={{ fill: "#FFF4B8" }} /> Secure
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[#FFF4B8]" style={{ fill: "#FFF4B8" }} /> Private
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFF4B8]" style={{ fill: "#FFF4B8" }} /> Encrypted
          </span>
        </div>
      </motion.div>
    </div>
  );
}
