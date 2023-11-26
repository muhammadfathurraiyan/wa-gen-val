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

  for (let i = 1; i <= 250; i++) {
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

    // client.initialize();

    client.on("ready", async () => {
      try {
        console.log("Client is ready!");
        const numberExists = await client.isRegisteredUser(number);
        console.log(numberExists);
        isExist = numberExists;
        resolve({ isExist });
      } catch (e) {
        resolve({ e });
      } finally {
        client.destroy();
      }
    });
  });
}

// export async function ApiPost(number: string) {
//   const allSessionObject = {};

//   const client = new Client({
//     puppeteer: {
//       headless: false,
//     },
//     authStrategy: new LocalAuth({
//       clientId: "MyId",
//     }),
//   });

//   let data;

//   client.on("ready", async () => {
//     console.log("Client is ready!");
//     const isExist = await client.isRegisteredUser(number);
//     console.log(isExist);
//   });

//   return { data };
// }

// // try {
// //   // Wait for the client to be ready

// //   setInterval(async () => {
// //     const isExist = await client.isRegisteredUser(number);
// //     const data = isExist ? "true" : "false";
// //     return { data };
// //   }, 30000);
// // } catch (error) {
// //   console.error("Error in ApiPost:", error);
// //   return { error: error }; // You may want to handle errors appropriately
// // }
