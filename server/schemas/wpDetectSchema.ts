import { z } from "zod";

export const wpDetectSchema = z.object({
  data: z.object({
    isWp: z.boolean(),
    url: z.string(),
  }),
});
