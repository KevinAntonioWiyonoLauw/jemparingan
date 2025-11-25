'use client';

import Image from 'next/image';

export type LeaderboardRow = {
  rank: number;
  participantId: string;
  name: string;
  score: number;
};

type Props = {
  rows: LeaderboardRow[];
  emptyText?: string;
};

export default function LeaderboardTable({ rows, emptyText = 'Tidak ada data tersedia' }: Props) {
  return (
    <div className="relative w-full">
      <Image
        src="/container.webp"
        alt="Leaderboard container"
        width={900}
        height={1400}
        priority
        className="w-full h-auto pointer-events-none select-none"
      />

      <div className="absolute inset-0 px-[4vh] pt-[2.4vh] pb-[2.4vh]">
        <table className="w-full text-[1.5vh] border-separate border-spacing-y-[0.9vh] text-left">
          <thead>
            <tr className="font-bold text-[1.7vh] border-b border-white/50">
              <th className="pb-[0.8vh]">Peringkat</th>
              <th className="pb-[0.8vh]">ID Peserta</th>
              <th className="pb-[0.8vh]">Nama</th>
              <th className="pb-[0.8vh] text-right">Skor</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-[#8B6A4A] py-[6vh]">
                  {emptyText}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={`${row.participantId}-${row.rank}`}>
                  <td colSpan={4}>
                    <div className="w-full grid grid-cols-[90px_minmax(0,1fr)_minmax(0,1fr)_10px] font-semibold font-sans text-[1.3rem] items-center gap-3 px-[1.5vh] py-[1.1vh] rounded-[1.2vh] bg-gradient-to-r from-avocado-500 to-avocado-500/00">
                      <span className="font-semibold">{row.rank}</span>
                      <span className="font-semibold">#{row.participantId}</span>
                      <span className="truncate">{row.name}</span>
                      <span className="text-right font-bold">{row.score}</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}