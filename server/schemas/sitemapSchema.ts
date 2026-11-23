import { z } from "zod";

export const SitemapCheckResult = z.object({
  url: z.string(),
  httpStatus: z.number(),
  responseTimeMs: z.number(),
  declaredInRobots: z.boolean(),
  blockedForGooglebot: z.boolean(),
});

export const sitemapSchema = z.object({
  data: z.object({
    sitemapList: z.array(SitemapCheckResult),
    robotsTxtStatus: z.enum(["found", "not_found", "error"]),
  }),
  statusCode: z.number(),
  error: z.string().nullable(),
});

export type SitemapListType = z.infer<typeof sitemapSchema>;
