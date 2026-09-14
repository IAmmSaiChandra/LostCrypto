"use client";

import React, { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={id} className="block text-[13px] font-medium text-[#94a3b8]">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#64748b]">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            className={`w-full h-11 rounded-lg bg-[#0d1424] border text-[14px] text-[#f8fafc] placeholder-[#64748b] transition-all duration-150 focus:outline-none focus:ring-2 ${
              leftIcon ? "pl-10" : "pl-3.5"
            } ${rightIcon ? "pr-10" : "pr-3.5"} ${
              error
                ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20"
                : "border-[#1e2e4a] focus:border-[#2563eb] focus:ring-[#2563eb]/20"
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#64748b]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-[12px] text-red-400 font-medium">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
