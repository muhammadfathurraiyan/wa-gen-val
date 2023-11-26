"use server";
import { HLRSchema } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { Client, LocalAuth } from "whatsapp-web.js";

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

  for (let i = 564524; i <= 564529; i++) {
    ArrayData.push(result.data.wa + i.toString().padStart(6, "0"));
  }

  revalidatePath("/");

  return { ArrayData };
};

export async function ApiPost(number: string) {
  return new Promise(async (resolve) => {
    const allSessionObject = {};
    const client = new Client({
      puppeteer: {
        headless: false,
      },
      authStrategy: new LocalAuth({
        clientId: "MyId",
      }),
    });

    let isExist;

    client.initialize();

    client.on("ready", async () => {
      try {
        console.log("Client is ready!");
        const numberExists = await client.isRegisteredUser(number);
        console.log(numberExists);
        isExist = numberExists;
        resolve({ isExist });
        client.destroy();
      } catch (e) {
        resolve({ e });
      }
    });

  });
}
