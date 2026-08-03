"use client";

import React from "react";
import { SupportHero } from "@/src/components/support/SupportHero";
import { FAQAccordion } from "@/src/components/support/FAQAccordion";
import { WhatsAppCard } from "@/src/components/support/WhatsAppCard";
import { SupportStatus } from "@/src/components/support/SupportStatus";
import { NoticeCard } from "@/src/components/support/NoticeCard";

export default function SupportPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 selection:bg-black selection:text-white">
      {/* Support Hero Header */}
      <SupportHero />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column (FAQs only) */}
        <div className="lg:col-span-2 space-y-8">
          <FAQAccordion />
        </div>

        {/* Right Column (Contact Options, status info, alerts) */}
        <div className="space-y-8">
          <WhatsAppCard />
          <SupportStatus />
          <NoticeCard />
        </div>
      </div>
    </div>
  );
}
