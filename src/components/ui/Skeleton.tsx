"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  variant?: "rectangle" | "circle";
}

export function Skeleton({
  className = "",
  width = "100%",
  height = "16px",
  variant = "rectangle",
}: SkeletonProps) {
  const borderRadius = variant === "circle" ? "rounded-full" : "rounded-lg";

  return (
    <div
      style={{ width, height }}
      className={`bg-gray-150 animate-pulse bg-neutral-100 ${borderRadius} ${className}`}
    />
  );
}
