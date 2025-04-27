import { z } from "zod";

export const urlWithMessageSchema = z
  .string()
  .refine(
    (value) =>
      !value ||
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w.-]*)*\/?$/.test(value),
    {
      message: "Please provide a valid URL",
    },
  );
