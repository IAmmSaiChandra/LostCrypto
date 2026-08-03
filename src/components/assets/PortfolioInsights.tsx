"use client";

import React from "react";
import { motion } from "motion/react";
import { Award, TrendingUp, Grid, ShieldAlert } from "lucide-react";

interface Insight {
  id: string;
  text: string;
  icon: React.ReactNode;
}

const insights: Insight[] = [
  {
    id: "largest",
    text: "Bitcoin is currently your largest holding, comprising 36% of your portfolio.",
    icon: <Award className="w-5 h-5 text-black" />,
  },
  {
    id: "growth",
    text: "Solana has increased by 14.2% today, leading gains in your wallet assets.",
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
  },
  {
    id: "diversification",
    text: "Your assets are diversified across 8 supported blockchains.",
    icon: <Grid className="w-5 h-5 text-[#FFF4B8]" style={{ fill: "#FFF4B8" }} />,
  },
  {
    id: "networks",
    text: "You are currently holding assets on all 8 active networks.",
    icon: <ShieldAlert className="w-5 h-5 text-neutral-400" />,
  },
];

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
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

export function PortfolioInsights() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6"
    >
      <h3 className="text-[18px] font-bold text-black tracking-tight">
        Portfolio Insights
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight) => (
          <motion.div
            key={insight.id}
            variants={itemVariants}
            className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFAFA] border border-[#F1F1F1] hover:border-black/5 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0">
              {insight.icon}
            </div>
            <p className="text-[14px] text-[#6B7280] font-semibold leading-relaxed pt-1">
              {insight.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
