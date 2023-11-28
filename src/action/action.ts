"use server";
import prisma from "@/lib/prisma";
import { HLRSchema } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { Client, LocalAuth } from "whatsapp-web.js";
import chromium from "@sparticuz/chromium-min";

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

  for (let i = 0; i <= 999; i++) {
    ArrayData.push(result.data.wa + i.toString().padStart(3, "0"));
  }

  revalidatePath("/");

  return { ArrayData };
};

export async function ApiPost(number: string) {
  return new Promise(async (resolve) => {
    const allSessionObject = {};
    const client = new Client({
      puppeteer: {
        headless: true,
        args: chromium.args,
        executablePath: await chromium.executablePath(),
      },
      authStrategy: new LocalAuth({
        clientId: "MyId",
      }),
    });

    let isExist;

    client.initialize();

    client.on("ready", async () => {
      try {
        const numberExists = await client.isRegisteredUser(number);
        isExist = numberExists;
        if (isExist) {
          await prisma.data.create({
            data: {
              noWa: number,
            },
          });
        }
        resolve({ isExist });
        client.destroy();
      } catch (e) {
        resolve({ e });
      }
    });
  });
}
