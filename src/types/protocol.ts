import { z } from "zod";

export const subscriptionTierSchema = z.enum(["free", "pro"]);
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;

export const profileSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  subscriptionTier: subscriptionTierSchema,
  lemonCustomerId: z.string().nullable(),
  createdAt: z.string().datetime(),
});
export type Profile = z.infer<typeof profileSchema>;

export const protocolSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1).max(100),
  rawInput: z.string(),
  startDate: z.string(), // ISO date string
  endDate: z.string(), // ISO date string
  version: z.number().int().positive(),
  isActive: z.boolean(),
  feedToken: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Protocol = z.infer<typeof protocolSchema>;

export const createProtocolInputSchema = z.object({
  name: z.string().min(1).max(100),
  rawInput: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
});
export type CreateProtocolInput = z.infer<typeof createProtocolInputSchema>;
