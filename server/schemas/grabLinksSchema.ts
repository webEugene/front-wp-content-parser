import { z } from "zod";

export const AccessInfoSchema = z.object({
  statusCode: z.number(),
  isBlocked: z.boolean(),
  blockerType: z.string().nullish(),
  severity: z.enum(["none", "low", "medium", "high"]),
  recommendation: z.string().optional(),
});

const EmailGroupSchema = z.object({
  category: z.enum([
    "info",
    "support",
    "sales",
    "hr",
    "press",
    "billing",
    "other",
  ]),
  emails: z.array(z.string()),
});

const PhoneEntrySchema = z.object({
  raw: z.string(),
  formatted: z.string().nullable(),
  country: z.string().nullable(),
  valid: z.boolean(),
});

const AddressEntrySchema = z.object({
  streetAddress: z.string().nullable(),
  addressLocality: z.string().nullable(),
  addressRegion: z.string().nullable(),
  postalCode: z.string().nullable(),
  addressCountry: z.string().nullable(),
  raw: z.record(z.string(), z.any()),
});

const ContactsResultSchema = z.object({
  emails: z.array(EmailGroupSchema),
  phones: z.array(PhoneEntrySchema),
  addresses: z.array(AddressEntrySchema),
});

const SocialResultSchema = z.object({
  twitter: z.string().nullable(),
  facebook: z.string().nullable(),
  linkedin: z.string().nullable(),
  instagram: z.string().nullable(),
  youtube: z.string().nullable(),
  tiktok: z.string().nullable(),
  pinterest: z.string().nullable(),
  telegram: z.string().nullable(),
  github: z.string().nullable(),
  whatsapp: z.string().nullable(),
  viber: z.string().nullable(),
});

export const grabLinksSchema = z.object({
  access: AccessInfoSchema,
  contacts: ContactsResultSchema.nullable(),
  social: SocialResultSchema.nullable(),
});

// Типи виводяться з схем через z.infer — не дублюємо interface окремо
export type AccessInfo = z.infer<typeof AccessInfoSchema>;
export type EmailCategory = z.infer<typeof EmailGroupSchema>["category"];
export type EmailGroup = z.infer<typeof EmailGroupSchema>;
export type PhoneEntry = z.infer<typeof PhoneEntrySchema>;
export type AddressEntry = z.infer<typeof AddressEntrySchema>;
export type ContactsResult = z.infer<typeof ContactsResultSchema>;
export type SocialResult = z.infer<typeof SocialResultSchema>;
export type GrabLinksType = z.infer<typeof grabLinksSchema>;
