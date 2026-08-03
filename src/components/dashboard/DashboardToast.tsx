"use client"

import React from "react"
import { motion, AnimatePresence } from "motion/react"
import { CheckCircle2, XCircle } from "lucide-react"

interface DashboardToastProps {
  title: string
  description: string
  onClose?: () => void
}

export function DashboardToast({ title, description, onClose }: DashboardToastProps) {
  // Auto close after 4 seconds if not handled by parent
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose()
    }, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 inset-x-0 flex justify-center pointer-events-none"
      >
        <motion.div
          className="flex items-center gap-3 bg-emerald-50 border border-emerald-200/60 text-emerald-800 p-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] pointer-events-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          <div className="flex flex-col">
            <span className="font-medium text-[15px]">{title}</span>
            <span className="text-[13px] text-emerald-700">{description}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
