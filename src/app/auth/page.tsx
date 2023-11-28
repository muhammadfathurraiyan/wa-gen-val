import Link from "next/link";
import { Client, LocalAuth } from "whatsapp-web.js";

export default async function page() {
  const allSessionObject = {};
  const client = new Client({
    puppeteer: {
      headless: false,
    },
    authStrategy: new LocalAuth({
      clientId: "MyId",
    }),
  });

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.initialize();
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <p className="text-center">
        Membuka chromium... <br /> scan / login ke Whatsapp... <br /> setelah
        anda login, anda dapat menutup chromium tab / page dan klik m tombol
        lanjut...
      </p>
      <Link
        href="/generator"
        className="transition-all hover:bg-cyan-600 px-2 py-1 hover:text-neutral-950 font-bold border-2 border-cyan-600 rounded-md"
      >
        Lanjut
      </Link>
    </section>
  );
}
