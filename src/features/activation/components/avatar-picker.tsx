"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Upload, User } from "lucide-react";

interface AvatarPickerProps {
  avatarUrl: string;
  isLoading: boolean;
  uploadedPhoto: string | null;
  onShuffle: () => void;
  onUpload: (file: File) => void;
  onReset: () => void;
}

export function AvatarPicker({
  avatarUrl,
  isLoading,
  uploadedPhoto,
  onShuffle,
  onUpload,
  onReset,
}: AvatarPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar Container */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Spinner overlay */}
        <AnimatePresence>
          {isLoading && (
            <div className="absolute inset-0 rounded-full bg-[#090d16]/70 backdrop-blur-xs flex items-center justify-center z-10">
              <RefreshCw className="w-6 h-6 text-[#60a5fa] animate-spin" />
            </div>
          )}
        </AnimatePresence>

        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#2563eb]/40 bg-[#0d1424] flex items-center justify-center shadow-[0_0_16px_rgba(37,99,235,0.2)]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-8 h-8 text-[#64748b]" />
          )}
        </div>
      </div>

      {/* Button controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={onShuffle}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[#1e2e4a] bg-[#172440] text-[12px] text-[#f8fafc] font-medium hover:bg-[#1e3054] hover:border-[#2d446e] transition-all disabled:opacity-50"
          aria-label="Generate random avatar seed"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          Generate New
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          aria-label="Upload custom photo"
        />

        <button
          type="button"
          disabled={isLoading}
          onClick={triggerFileInput}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg border border-[#1e2e4a] bg-[#172440] text-[12px] text-[#f8fafc] font-medium hover:bg-[#1e3054] hover:border-[#2d446e] transition-all disabled:opacity-50"
          aria-label="Upload custom image"
        >
          <Upload className="w-3.5 h-3.5" />
          Upload Image
        </button>

        {uploadedPhoto && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center h-9 px-2 rounded text-[12px] text-[#94a3b8] hover:text-[#f8fafc] underline transition-all"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
