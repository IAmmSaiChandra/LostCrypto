"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none select-none";

    const variantStyles = {
      primary:
        "bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white shadow-[0_2px_10px_rgba(37,99,235,0.25)] border border-[#3b82f6]/30",
      secondary:
        "bg-[#172440] hover:bg-[#1e3054] active:bg-[#131d31] text-[#f8fafc] border border-[#1e2e4a]",
      outline:
        "bg-transparent hover:bg-[#111a2e] text-[#94a3b8] hover:text-[#f8fafc] border border-[#1e2e4a]",
      ghost:
        "bg-transparent hover:bg-[#111a2e] text-[#94a3b8] hover:text-[#f8fafc]",
      danger:
        "bg-red-500/10 hover:bg-red-500/20 active:bg-red-500/30 text-red-400 border border-red-500/30",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-[12px] rounded-md gap-1.5",
      md: "h-11 px-4 text-[13px] rounded-lg gap-2",
      lg: "h-12 px-6 text-[14px] rounded-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
