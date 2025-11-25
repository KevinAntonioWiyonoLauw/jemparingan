"use client";

import Image from "next/image";
import React from "react";

export type RekapitulasiRow = {
  bandul: string;
  pengawas: string;
  onClick?: () => void;
};

type Props = {
  rows: RekapitulasiRow[];
};

export default function RekapitulasiTabel({ rows }: Props) {
  return (
    <div className="relative w-full max-w-[420px] mx-auto text-[#3D2B1F]">
      <Image
        src="/container.webp"
        alt="Container Rekapitulasi"
        width={800}
        height={1400}
        priority
        className="w-full h-auto pointer-events-none select-none"
      />

      <div className="absolute inset-0 px-[4vh] pt-[2.4vh] pb-[2.4vh] flex flex-col items-center gap-[1.6vh]">
        <div className="w-full max-w-[320px]">
          <table className="w-full text-[1.3rem] border-separate border-spacing-y-[0.9vh] text-left">
            <thead>
              <tr className="font-bold text-[1.05rem] font-hywenhei">
                <th className="pb-[0.8vh]">Bandul</th>
                <th className="pb-[0.8vh]">Nama Pengawas</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map(({ bandul, pengawas, onClick }, idx) => (
                <tr key={`${bandul}-${idx}`}>
                  <td colSpan={3}>
                    <button
                      onClick={onClick}
                      className="w-full grid grid-cols-[50px_minmax(0,1fr)_40px] font-sans font-semibold items-center gap-3 px-[1.6vh] py-[0.6vh] rounded-lg bg-gradient-to-r from-avocado-500 to-avocado-500/00 text-center hover:translate-y-[-1px] transition"
                    >
                      <span className="font-semibold">{bandul}</span>
                      <span className="truncate">{pengawas}</span>
                      <span className="flex justify-end">
                        <Image src="/next.webp" alt="Detail" width={26} height={26} />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}