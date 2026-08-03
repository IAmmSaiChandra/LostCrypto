"use client"

import React from "react"
import { motion } from "motion/react"
import { Wallet, Send, User, HelpCircle } from "lucide-react"

export function QuickActions() {
  const actions = [
    { name: "View Wallets", icon: <Wallet className="w-5 h-5" />, href: "/wallets" },
    { name: "Withdraw", icon: <Send className="w-5 h-5" />, href: "/withdraw" },
    { name: "Profile", icon: <User className="w-5 h-5" />, href: "/profile" },
    { name: "Support", icon: <HelpCircle className="w-5 h-5" />, href: "/support" },
  ]

  return (
    <div className="w-full flex flex-wrap gap-4 justify-center sm:justify-start mt-6">
      {actions.map((action, i) => (
        <motion.a
          key={action.name}
          href={action.href}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.02)" }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#E5E7EB] text-black text-sm font-medium hover:bg-[#F8F8F8] transition-all duration-200"
        >
          {action.icon}
          <span>{action.name}</span>
        </motion.a>
      ))}
    </div>
  )
}
