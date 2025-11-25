'use client';
import Image from 'next/image';
import { mockBandulStatus } from '@/data/scoring.mock';

type Props = {
  data: typeof mockBandulStatus;
  entriesPerPage: number;
  onEntriesChange: (value: number) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onRowClick: (bandul: string) => void;
};

export default function TabelPengawas({ data, entriesPerPage, onEntriesChange, searchQuery, onSearchChange, onRowClick }: Props) {
const rowLayout = 'grid grid-cols-[70px_minmax(0,1fr)_auto] items-center';

  return (
    <div className="relative w-full max-w-[380px] mx-auto font-montserrat text-[#3D2B1F]">
      <Image
        src="/input-skor/pengawas-container.webp"
        alt="Kontainer tabel pengawas"
        width={760}
        height={760}
        priority
        className="w-full h-auto select-none pointer-events-none"
      />

      <div className="absolute inset-0 px-6 pt-5 pb-6 flex flex-col">
        <div className={`${rowLayout} text-[2.2vh] font-bold tracking-[0.02em] pb-[0.8vh]  py-2  px-3 border-b border-white/40`}>
          <span className="flex items-center gap-2 whitespace-nowrap">
            ⇵ Bandul
          </span>
          <span className="flex items-center gap-2 px-3 whitespace-nowrap ml-[3.2vh]">
            Nama Pengawas
          </span>
          <span />
        </div>

        <div className="flex-1 flex flex-col divide-y divide-white/15 text-[14px] font-normal">
        
          {data.map((item) => (
            <button
              key={item.bandul}
              onClick={() => onRowClick(item.bandul)}
              className={`${rowLayout} py-[1.5vh] text-left hover:bg-white/50 transition-colors`}
            >
            <div className="pl-[6.5vh] text-[2vh]">
              <span className="font-semibold">{item.bandul}</span>
              <span className="truncate pl-[11vh]">{item.supervisor}</span>
              </div>
              <span className="flex justify-end items-center pr-[1vh]">
  <Image src="/next.webp" alt="Lihat detail" width={26} height={26} />
</span>
            </button>
          ))}
          
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-[1.5vh] font-normal items-center">
          <label className="gap-2 flex items-center whitespace-nowrap">
            Show
            <select
              value={entriesPerPage}
              onChange={(e) => onEntriesChange(Number(e.target.value))}
              className="bg-transparent focus:outline-none items-center gap-2 bg-white/70 px-[0.5vh] py-[0.5vh] rounded-lg"
            >
              {[10, 25, 50, 100].map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
            entries
          </label>

          <div className="flex-1 min-w-[130px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full border border-white px-2 py-1 rounded-lg text-[1.5vh] placeholder:text-white focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}