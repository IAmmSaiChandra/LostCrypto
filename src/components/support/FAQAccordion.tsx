"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I activate my application?",
    answer: "Enter your 16-character alphanumeric activation key on the Activation Page. The app verifies the key cryptographically and unlocks the profile setup phase.",
  },
  {
    question: "Where can I get an activation key?",
    answer: "You can obtain an activation key by joining our Telegram support group (https://t.me/groupkeys) and tagging the owner @rioggz. We will guide you through the registration process.",
  },
  {
    question: "Can I update my profile later?",
    answer: "Yes, you can edit your profile name, email, and avatar at any time by clicking the Edit Profile button on the Profile settings tab.",
  },
  {
    question: "How do I contact support?",
    answer: "Reach out to us directly by joining our Telegram group (https://t.me/groupkeys) and tagging the owner @rioggz.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All application caches and wallet keys are stored in localized encrypted files. We never transmit your keys or personal details to external storage servers.",
  },
  {
    question: "How long is my activation valid?",
    answer: "Standard validation keys remain active for 180 days. You can track remaining validity and expiry dates directly inside the Profile tab.",
  },
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1e2e4a]">
        <HelpCircle className="w-4 h-4 text-[#3b82f6]" />
        <h3 className="text-[15px] font-bold text-[#f8fafc] tracking-tight">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`rounded-lg border transition-all duration-150 overflow-hidden ${
                isOpen
                  ? "border-[#2563eb] bg-[#172440]"
                  : "border-[#1e2e4a] bg-[#0d1424] hover:border-[#2d446e]"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                type="button"
                className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <span className="text-[14px] font-bold text-[#f8fafc]">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#60a5fa] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="px-4 pb-4 text-[13px] text-[#94a3b8] leading-relaxed border-t border-[#1e2e4a]/60 pt-2.5">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
