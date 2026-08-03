"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Upload, Sparkles, Image as ImageIcon } from "lucide-react";

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
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Soft spinner overlay during load */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-full bg-white/60 flex items-center justify-center z-10"
            >
              <RefreshCw className="w-8 h-8 text-black animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-24 h-24 rounded-full overflow-hidden border border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-center shadow-sm">
          <AnimatePresence mode="popLayout">
            {avatarUrl ? (
              <motion.img
                key={avatarUrl}
                src={avatarUrl}
                alt="Avatar Preview"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#F8F8F8] animate-pulse" />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Button controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={onShuffle}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[14px] text-black font-medium hover:bg-[#F8F8F8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Shuffle generated avatar"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Shuffle
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          aria-label="Upload profile photograph"
        />

        <button
          type="button"
          disabled={isLoading}
          onClick={triggerFileInput}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#E5E7EB] bg-white text-[14px] text-black font-medium hover:bg-[#F8F8F8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Upload custom photo"
        >
          <Upload className="w-4 h-4" />
          Upload Photo
        </button>

        {uploadedPhoto && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-transparent text-[14px] text-black hover:underline transition-all"
            aria-label="Reset to generated avatar"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
