import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function page() {
  const valid = await prisma.data.findMany();
  return (
    <section className="min-h-screen px-24 py-12 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Table Data</h1>
      <p className="text-lg">Cara menggunakan!</p>
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
