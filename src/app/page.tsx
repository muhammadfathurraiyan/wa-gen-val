import Link from "next/link";

export default async function page() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4 max-lg:px-4">
      <h1 className="text-2xl font-bold">WhatsAppGenVal.</h1>
      <div className="lg:w-1/2 items-center justify-center flex flex-col">
        <i className="font-bold">***Perhatian***</i>
        <p className="text-center">
          aplikasi ini dapat beresiko membuat nomor yang digunakan untuk login
          terbanned oleh WhatsApp.
        </p>
        <i className="font-bold ">***Note***</i>
        <p className="text-center">Disarankan menggunakan Chrome untuk menggunakan aplikasi ini dan gunakan nomor WhatsApp &#34;bodoh&#34; untuk proses login di aplikasi ini.</p>
      </div>
      <Link
        href="/auth"
        className="transition-all hover:bg-cyan-600 px-2 py-1 hover:text-neutral-950 font-bold border-2 border-cyan-600 rounded-md"
      >
        Explore🚀
      </Link>
    </section>
  );
}
