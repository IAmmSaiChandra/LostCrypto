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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-black" />
        <h3 className="text-[18px] font-bold text-black tracking-tight">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.question}
              className={`rounded-2xl border transition-all duration-200 ${
                isOpen ? "border-black bg-[#FAFAFA]" : "border-[#E5E7EB] bg-white hover:border-black/10"
              }`}
            >
              <button
                onClick={() => toggle(index)}
                type="button"
                className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-[14px] font-bold text-black">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#6B7280]"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[13px] text-[#6B7280] leading-relaxed font-semibold">
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
