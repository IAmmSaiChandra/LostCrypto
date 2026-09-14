"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Key, CheckCircle2, AlertTriangle, UserCheck, Lock } from "lucide-react";

interface GhostMascotProps {
  state: "idle" | "focused" | "error" | "success" | "profile" | "completed";
}

export function GhostMascot({ state }: GhostMascotProps) {
  // Sophisticated cryptographic security emblem replacing cartoon mascot
  const getIcon = () => {
    switch (state) {
      case "focused":
        return <Key className="w-8 h-8 text-[#60a5fa] transition-transform animate-pulse" />;
      case "error":
        return <AlertTriangle className="w-8 h-8 text-red-400" />;
      case "success":
      case "completed":
        return <CheckCircle2 className="w-8 h-8 text-[#10b981]" />;
      case "profile":
        return <UserCheck className="w-8 h-8 text-[#3b82f6]" />;
      default:
        return <Shield className="w-8 h-8 text-[#3b82f6]" />;
    }
  };

  const getRingColor = () => {
    switch (state) {
      case "error":
        return "border-red-500/40 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]";
      case "success":
      case "completed":
        return "border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
      case "focused":
        return "border-[#2563eb] bg-[#2563eb]/15 shadow-[0_0_24px_rgba(37,99,235,0.3)]";
      default:
        return "border-[#1e2e4a] bg-[#111a2e] shadow-[0_0_20px_rgba(37,99,235,0.1)]";
    }
  };

  return (
    <div className="relative flex items-center justify-center select-none py-2">
      {/* Dynamic pulse halo */}
      <AnimatePresence>
        {(state === "focused" || state === "success") && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            className={`absolute w-20 h-20 rounded-2xl border ${
              state === "success" ? "border-emerald-500/30" : "border-[#2563eb]/40"
            }`}
          />
        )}
      </AnimatePresence>

      {/* Main Hexagonal / Rounded Emblem */}
      <motion.div
        animate={
          state === "error"
            ? { x: [-4, 4, -4, 4, 0] }
            : state === "focused"
            ? { scale: 1.05 }
            : { scale: 1 }
        }
        transition={{ duration: 0.3 }}
        className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 relative z-10 ${getRingColor()}`}
      >
        {/* Subtle corner tech markers */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#60a5fa]/40" />
        <div className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#60a5fa]/40" />
        <div className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#60a5fa]/40" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#60a5fa]/40" />

        {getIcon()}
      </motion.div>
    </div>
  );
}
