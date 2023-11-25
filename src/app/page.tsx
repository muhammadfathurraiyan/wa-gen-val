import checkNumber from "@/utils/checker";
import Link from "next/link";

export default async function page() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">WhatsAppGenVal.</h1>
      <div className="w-1/2 items-center justify-center flex flex-col">
        <i className="font-bold">***Perhatian***</i>
        <p className="text-center">
          aplikasi ini dapat beresiko membuat nomor yang digunakan untuk login
          terbanned oleh WhatsApp.
        </p>
        <i className="font-bold">***Note***</i>
        <p>Gunakan nomor bodoh WhatsApp untuk proses login di aplikasi ini.</p>
      </div>
      <Link
        href="/auth"
        className="transition-all hover:bg-cyan-600 px-3 py-2 hover:text-neutral-950 font-bold border-2 border-cyan-600 rounded-md"
      >
        Eksplore🚀
      </Link>
    </section>
  );
}
