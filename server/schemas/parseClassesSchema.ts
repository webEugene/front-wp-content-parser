import { z } from "zod";

export const parseClassesSchema = z.object({
  site: z.string(),
  pages: z.array(z.string()),
});
