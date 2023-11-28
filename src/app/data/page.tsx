import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function page() {
  const valid = await prisma.data.findMany();
  return (
    <section className="min-h-screen relative px-24 py-12 max-lg:px-4 flex flex-col gap-4">
      <Link
        className="absolute top-5 hover:underline transition-all"
        href="/generator"
      >
        &larr; Kembali
      </Link>
      <div className="mt-4">
        <h1 className="font-bold text-2xl">Tabel Data</h1>
        <p className="text-lg">Tabel seluruh data yang valid!</p>
      </div>
      <table>
        <thead className="bg-cyan-600 text-neutral-950 border border-cyan-600">
          <tr>
            <th className="px-2 py-1 w-[20px]">No</th>
            <th className="px-2 py-1">Whatsapp</th>
            <th className="px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody className="text-center border border-cyan-600">
          {valid.map((res, index) => (
            <tr key={index} className="border-t border-cyan-600">
              <td className="py-1 w-[20px] border-r border-cyan-600">
                {index + 1}
              </td>
              <td className="px-2 py-1 border-r border-cyan-600">{res.noWa}</td>
              <td className="px-2 py-1">
                <Link
                  className="underline hover:no-underline"
                  target="_blank"
                  href={`https://wa.me/${res.noWa}`}
                >
                  Check
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
