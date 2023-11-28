import { z } from "zod";

export const HLRSchema = z.object({
  wa: z
    .string()
    .min(1, { message: "nomot harus lebih dari 1 karakter" })
    .max(10, { message: "nomor tidak boleh kurang dari 7 karakter" }),
});
