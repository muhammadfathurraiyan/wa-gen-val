"use client";
import { ApiPost, genVal } from "@/action/action";
import { HLRSchema } from "@/lib/types";
import axios from "axios";
import { useRef, useState } from "react";
import { Client, LocalAuth } from "whatsapp-web.js";

export default function page() {
  const [error, setError] = useState("");
  const [response, setResponse] = useState([""]);
  const [valid, setValid] = useState([""]);
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

    if (response?.ArrayData) {
      setResponse(response.ArrayData);
    }
  };

  const apiCall = async (number: string) => {
    const validNumber = await ApiPost(number);
    console.log(number);
    console.log(validNumber);
    if (validNumber) {
      setValid((prev) => [...prev, number]);
    }
  };

  if (response.length > 1) {
    for (let i = 0; i <= response.length; i++) {
      apiCall(response[i]);
    }
  }

  return (
    <section className="min-h-screen px-24 py-12 flex flex-col gap-4">
      <h1 className="font-bold text-2xl">WhatsAppGenVal</h1>
      <div>
        <p className="text-lg">Cara menggunakan!</p>
        <ul className="list-disc list-inside text-base">
          <li>Input HLR ✅</li>
          <li>Klik generate ✅</li>
          <li>Tunggu beberapa saat ✅</li>
          <li>Hasil akan tampil pada tabel di bawah ✅</li>
        </ul>
      </div>
      <form ref={ref} action={clientAction} className="flex gap-4">
        <label htmlFor="wa">Input HLR :</label>
        <input
          className="bg-inherit border-2 pl-2 rounded-md border-cyan-600"
          type="number"
          name="wa"
          placeholder="6281234"
        />
        <button className="transition-all hover:bg-cyan-600 px-2 hover:text-neutral-950 font-bold border-2 border-cyan-600 rounded-md">
          Generate
        </button>
        <p>{error}</p>
      </form>
      <h1 className="font-bold text-xl">Table hasil.</h1>
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
              <td className="px-2 py-1 border-r border-cyan-600">{res}</td>
              <td className="px-2 py-1">Valid</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
