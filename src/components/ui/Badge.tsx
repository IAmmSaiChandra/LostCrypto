"use client";

import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Badge({
  className = "",
  variant = "primary",
  size = "md",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary: "bg-[#2563eb]/15 border-[#2563eb]/30 text-[#60a5fa]",
    secondary: "bg-[#172440] border-[#1e2e4a] text-[#94a3b8]",
    success: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
    outline: "bg-transparent border-[#1e2e4a] text-[#94a3b8]",
  };

  const dotColors = {
    primary: "bg-[#3b82f6]",
    secondary: "bg-[#94a3b8]",
    success: "bg-emerald-400",
    warning: "bg-amber-400",
    error: "bg-red-400",
    outline: "bg-[#64748b]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 rounded gap-1 font-medium",
    md: "text-[12px] px-2.5 py-1 rounded-md gap-1.5 font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center border tracking-wide select-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
