import { z } from "zod";

export const activationSchema = z.object({
  activationKey: z
    .string()
    .min(1, "Activation key is required")
    .min(8, "Activation key must be at least 8 characters"),
});

export type ActivationInput = z.infer<typeof activationSchema>;
