import { z } from "zod";

export const createdReportSchema = z.array(
  z.object({
    _id: z.string(),
    pageName: z.string(),
    email: z.string().nullable(),
    report: z.string(),
    status: z.number().default(0),
  }),
);

export const reportSchema = z.object({
  pageName: z.string(),
  email: z.string().nullable().optional(),
  report: z.string(),
});

// .enum(["Created", "In progress", "Done", "Closed"])
//   .default("Created"),
