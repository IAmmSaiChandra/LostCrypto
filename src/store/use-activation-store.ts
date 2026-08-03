import { create } from "zustand";

interface ActivationState {
  status: "idle" | "loading" | "success" | "error";
  errorMessage: string;
  step: "activation" | "success" | "profile" | "chains";
  setStatus: (status: "idle" | "loading" | "success" | "error") => void;
  setErrorMessage: (message: string) => void;
  setStep: (step: "activation" | "success" | "profile" | "chains") => void;
}

export const useActivationStore = create<ActivationState>((set) => ({
  status: "idle",
  errorMessage: "",
  step: "activation",
  setStatus: (status) => set({ status }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setStep: (step) => set({ step }),
}));
