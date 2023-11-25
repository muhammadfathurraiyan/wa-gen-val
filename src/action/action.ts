"use server";
import { HLRSchema } from "@/lib/types";
import { revalidatePath } from "next/cache";

type TData = {
  wa: string;
  isActive: boolean;
};

export const genVal = async (newData: unknown) => {
  const result = HLRSchema.safeParse(newData);

  if (!result.success) {
    let errorMessage = "";
    result.error.issues.forEach((issue) => {
      errorMessage = errorMessage + issue.message;
    });
    return { error: errorMessage };
  }

  let ArrayData = [];

  for (let i = 1; i <= 250; i++) {
    ArrayData.push(result.data.wa + i.toString().padStart(6, "0"));
  }

  revalidatePath("/");

  return { ArrayData };
};
