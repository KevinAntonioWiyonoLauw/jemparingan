'use client';

import Image from 'next/image';

export type DataPesertaRow = {
  id: string;
  name: string;
  onDelete?: () => void;
};

type Props = {
  rows: DataPesertaRow[];
};

export default function DataPesertaTable({ rows }: Props) {
  return (
    <div className="relative w-full max-w-[420px] mx-auto font-['Montserrat'] text-[#3D2B1F]">
      <Image
        src="/container.webp"
        alt="Container Data Peserta"
        width={900}
        height={1400}
        priority
        className="w-full h-auto pointer-events-none select-none"
      />

      <div className="absolute inset-0 px-[4vh] pt-[2.4vh] pb-[2.4vh]">
        <div className="h-full pr-[0.8vh] overflow-y-auto scrollbar-hide">
          <table className="w-full text-[1.45vh] border-separate border-spacing-y-[0.9vh]">
            <thead className="sticky top-0 z-10 bg-[#C6A676]/95 backdrop-blur-sm border-b border-white/40">
              <tr className="font-bold text-[1.35rem] text-left">
                <th className="pb-[0.8vh]">ID Peserta</th>
                <th className="pb-[0.8vh]">Nama</th>
                <th className="pb-[0.8vh] w-[34px]" />
              </tr>
            </thead>

            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center text-[#8B6A4A] py-[5vh]">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id}>
                    <td colSpan={3}>
                      <div className="w-full grid grid-cols-[100px_minmax(0,1fr)_32px] font-sans font-semibold text-[1.3rem] items-center gap-3 px-[1.6vh] py-[1.1vh] rounded-[1.2vh] bg-gradient-to-r from-avocado-500 to-avocado-500/00 text-left">
                        <span className="font-semibold">#{row.id}</span>
                        <span className="truncate">{row.name}</span>
                        <button
                          type="button"
                          onClick={row.onDelete}
                          className="flex justify-end text-error-500 hover:text-error-700 text-xl"
                          aria-label={`Hapus ${row.name}`}
                        >
                          ✖
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}