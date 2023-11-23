"use client";
import { genVal } from "@/action/action";
import { HLRSchema } from "@/lib/types";
import { useRef, useState } from "react";

export default function page() {
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  const clientAction = async (data: FormData) => {
    const newData = {
      wa: data.get("wa"),
    };

    const result = HLRSchema.safeParse(newData);
    if (!result.success) {
      let errorMessage = "";
      result.error.issues.map((issue) => {
        errorMessage = errorMessage + issue.message;
      });
      setError(errorMessage);
      return;
    } else {
      ref.current?.reset();
      setError("");
    }

    const response = await genVal(result.data);
    if (response?.error) {
      setError(response.error);
    }
  };
  return (
    <section className="min-h-screen px-24 py-12 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Generator & Validator</h1>
      <div>
        <p className="text-xl">How to use!</p>
        <ul className="list-disc list-inside">
          <li>Input your HLR ✅</li>
          <li>Click generate ✅</li>
          <li>Wait few minutes ✅</li>
          <li>Result will show in the table ✅</li>
        </ul>
      </div>
      <form ref={ref} action={clientAction} className="flex gap-4">
        <label htmlFor="wa">Input HLR :</label>
        <input
          className="bg-inherit border-2 px-2 rounded-md border-cyan-600"
          type="number"
          name="wa"
          placeholder="6281234"
        />
        <button className="transition-all hover:bg-cyan-600 px-2 hover:text-neutral-950 font-bold border-2 border-cyan-600 rounded-md">
          Generate
        </button>
        <p>{error}</p>
      </form>
      <h1 className="font-bold text-2xl">Table of results</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Whatsapp</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
