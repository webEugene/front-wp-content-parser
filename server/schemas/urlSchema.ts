import { z } from "zod";

export const urlSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1)
    .refine((value) =>
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,9})(\/[\w.-]*)*\/?$/.test(value),
    ),
});
