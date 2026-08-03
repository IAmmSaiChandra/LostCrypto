"use client";

import React from "react";
import { Key, User, Landmark, HelpCircle, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface HelpAction {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const actions: HelpAction[] = [
  {
    title: "Activation Issues",
    desc: "Help with activation keys, serial key matching, and workspace validations.",
    icon: <Key className="w-5 h-5 text-black" />,
  },
  {
    title: "Account Support",
    desc: "Update details, email listings, setup profile seeds, and account metadata.",
    icon: <User className="w-5 h-5 text-black" />,
  },
  {
    title: "Assets & Portfolio",
    desc: "View holdings, blockchain logo parameters, and balance distribution trackers.",
    icon: <Landmark className="w-5 h-5 text-black" />,
  },
  {
    title: "General Questions",
    desc: "Questions regarding security operations, app updates, and everything else.",
    icon: <HelpCircle className="w-5 h-5 text-black" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function QuickActions() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
    >
      {actions.map((act) => (
        <motion.div
          key={act.title}
          variants={itemVariants}
          whileHover={{ y: -2, boxShadow: "0 12px 30px rgba(0,0,0,0.025)" }}
          whileTap={{ scale: 0.99 }}
          className="bg-white border border-[#E5E7EB] rounded-[24px] p-6 flex items-start gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.01)] transition-all duration-200 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-neutral-50 border border-[#F1F1F1] flex items-center justify-center shrink-0">
            {act.icon}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-[15px] font-bold text-black group-hover:text-neutral-700 transition-colors">
                {act.title}
              </h4>
              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
            <p className="text-[13px] text-[#6B7280] font-semibold mt-1.5 leading-relaxed">
              {act.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
