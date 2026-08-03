"use client";

import React from "react";
import { CheckCircle, AlertCircle, TriangleAlert, Info } from "lucide-react";

type AlertType = "default" | "success" | "error" | "notice";

interface AlertProps {
  type?: AlertType;
  title?: string;
  description: string;
}

export function Alert({ type = "default", title, description }: AlertProps) {
  const styles = {
    default: {
      border: "border-[#E5E7EB]",
      bg: "bg-[#FAFAFA]",
      text: "text-black",
      icon: <Info className="w-5 h-5 text-[#6B7280]" />,
    },
    success: {
      border: "border-emerald-500",
      bg: "bg-emerald-50/10",
      text: "text-black",
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    },
    error: {
      border: "border-red-500",
      bg: "bg-red-50/10",
      text: "text-black",
      icon: <AlertCircle className="w-5 h-5 text-red-500" />,
    },
    notice: {
      border: "border-amber-500",
      bg: "bg-amber-50/10",
      text: "text-black",
      icon: <TriangleAlert className="w-5 h-5 text-amber-500" />,
    },
  };

  const current = styles[type] || styles.default;

  return (
    <div
      className={`w-full flex gap-3 p-4 rounded-xl border bg-white ${current.border}`}
      role="alert"
    >
      <div className="shrink-0 mt-0.5">{current.icon}</div>
      <div className="space-y-1">
        {title && <h5 className="text-[14px] font-bold text-black">{title}</h5>}
        <p className="text-[13px] text-[#6B7280] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
