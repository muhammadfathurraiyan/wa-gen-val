"use server";
import { HLRSchema } from "@/lib/types";
import axios from "axios";
import puppeteer from "puppeteer";
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

  console.log(result.data.wa);

  let ArrayData: any = [];

  const startLoop = async () => {
    // for (let i = 100000; i <= 100005; i++) {
    //   ArrayData = await checkNumber(result.data.wa + i);
    // }

    console.log("ArrayData:", ArrayData);
  };

  console.log(ArrayData);

  checkNumber("6282361564525")

  revalidatePath("/");
};

export default async function checkNumber(phoneNumber: any): Promise<boolean> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
  ); // To Make sure Mobile version of Whatsapp Web doesn't load, fixes headless issue
  await page.goto(
    `https://web.whatsapp.com/send?phone=${phoneNumber}&text&app_absent=0`,
    { waitUntil: "networkidle0" }
  );
  await page.waitForNavigation({
    waitUntil: "networkidle2",
  });
  await new Promise((r) => setTimeout(r, 1000)); // Wait for page load - added for cases where networkidle doesn't
  let numberExists = false;
  if ((await page.$("#main")) !== null) numberExists = true;
  await browser.close();
  return numberExists;
}




