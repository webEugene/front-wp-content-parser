import { z } from "zod";

export const authSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6),
});

export type AuthBodyType = z.infer<typeof authSchema>;
