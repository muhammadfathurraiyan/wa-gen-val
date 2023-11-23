import { z } from "zod";

export const HLRSchema = z.object({
  wa: z
    .string()
    .min(1, { message: "number must be at least 1 character long" })
    .max(7, { message: "number must be at most be 7 charater long" }),
});
