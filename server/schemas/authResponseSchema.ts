import { z } from "zod";

export const authResponseSchema = z.object({
  userInfo: z.object({
    id: z.string(),
    email: z.string(),
    plan_id: z.number(),
  }),
  access_token: z.string(),
});

export type AuthResponseType = z.infer<typeof authResponseSchema>;
