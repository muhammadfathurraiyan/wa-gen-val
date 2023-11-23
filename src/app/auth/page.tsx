import Link from "next/link";
import puppeteer from "puppeteer";

export default async function page() {
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./profileData",
  });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");
  browser.on("targetdestroyed", async () => {
    console.log(
      "Page tertutup. jika sudah login anda dapat menggunakan fitur generator dan validator"
    );
    browser.close();
  });
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-center">
        Membuka chromium... <br /> scan / login ke Whatsapp... <br /> setelah
        anda login, anda dapat menutup chromium tab / page dan klik pada tombol
        lanjut...
      </p>
      <Link
        href="/generator"
        className="transition-all hover:bg-cyan-600 px-3 py-2 hover:text-neutral-950 font-bold border-2 border-cyan-600 rounded-md"
      >
        Lanjut
      </Link>
    </section>
  );
}
