"use client";

import React, { forwardRef } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "interactive";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    const variantStyles = {
      default: "bg-[#111a2e] border border-[#1e2e4a] shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
      subtle: "bg-[#0d1424] border border-[#16233b]",
      interactive:
        "bg-[#111a2e] border border-[#1e2e4a] hover:border-[#2d446e] hover:bg-[#15223c] transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.25)]",
    };

    return (
      <div
        ref={ref}
        className={`rounded-xl p-6 ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex items-center justify-between pb-4 border-b border-[#1e2e4a] ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-[16px] font-bold text-[#f8fafc] tracking-tight ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-[13px] text-[#94a3b8] mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

export default Card;
