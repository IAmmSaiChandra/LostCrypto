import { useState, useEffect } from "react";
import { getRandomSeed } from "@/src/lib/avatar/avatarSeeds";
import { generateAvatarDataUrl } from "@/src/lib/avatar/dicebear";

export function useAvatar() {
  const [seed, setSeed] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize seed on mount
  useEffect(() => {
    const savedSeed = localStorage.getItem("avatar-seed");
    const savedPhoto = localStorage.getItem("uploaded-photo");
    if (savedPhoto) {
      setUploadedPhoto(savedPhoto);
      setAvatarUrl(savedPhoto);
    } else if (savedSeed) {
      setSeed(savedSeed);
      setAvatarUrl(generateAvatarDataUrl(savedSeed));
    } else {
      const initialSeed = getRandomSeed();
      setSeed(initialSeed);
      setAvatarUrl(generateAvatarDataUrl(initialSeed));
      localStorage.setItem("avatar-seed", initialSeed);
    }
  }, []);

  const handleShuffle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Small artificial delay to show transition states
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newSeed = getRandomSeed();
      setSeed(newSeed);
      setUploadedPhoto(null);
      const newUrl = generateAvatarDataUrl(newSeed);
      setAvatarUrl(newUrl);
      localStorage.setItem("avatar-seed", newSeed);
      localStorage.removeItem("uploaded-photo");
    } catch (err) {
      setError("Failed to generate avatar. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = (file: File) => {
    setIsLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        setUploadedPhoto(e.target.result);
        setAvatarUrl(e.target.result);
        localStorage.setItem("uploaded-photo", e.target.result);
        setIsLoading(false);
      } else {
        setError("Failed to read image file.");
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      setError("Failed to read image file.");
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleResetToGenerated = () => {
    setUploadedPhoto(null);
    localStorage.removeItem("uploaded-photo");
    if (seed) {
      setAvatarUrl(generateAvatarDataUrl(seed));
    }
  };

  return {
    seed,
    avatarUrl,
    uploadedPhoto,
    isLoading,
    error,
    handleShuffle,
    handleUpload,
    handleResetToGenerated,
  };
}
