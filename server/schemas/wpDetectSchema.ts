import { z } from "zod";

export const wpDetectSchema = z.object({
  data: z.object({
    isWp: z.boolean(),
    url: z.string(),
  }),
});

export const clientWpDetectSchema = z.object({
  data: z.object({
    isWp: z.boolean(),
    url: z.string(),
    framework: z.string().optional(),
    blockDetection: z
      .object({
        isBlocked: z.boolean(),
        blockerType: z.string().nullable().optional(),
        indicators: z.array(z.string()).default([]),
        severity: z.enum(["none", "low", "medium", "high"]),
        recommendation: z.string().optional(),
      })
      .optional(),
  }),
  statusCode: z.number(),
  error: z.string().nullable(),
});

export type ClientWpDetectType = z.infer<typeof clientWpDetectSchema>;
