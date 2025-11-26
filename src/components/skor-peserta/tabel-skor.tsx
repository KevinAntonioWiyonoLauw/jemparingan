'use client';

import Image from 'next/image';

export type SkorRow = {
  no: number;
  target: string;
  skor: number;
};

type Props = {
  rows: SkorRow[];
  totalScoreLabel?: string;
  totalScoreValue?: string;
};

export default function TabelSkorPeserta({
  rows,
  totalScoreLabel = 'Total Score',
  totalScoreValue,
}: Props) {
  const total =
    totalScoreValue ?? `${rows.reduce((acc, r) => acc + (r.skor ?? 0), 0)}/${rows.length}`;

  return (
    <div className="relative w-full max-w-[355px] mx-auto text-[#3D2B1F]">
      <Image
        src="/container-skor.webp"
        alt="Container Skor Peserta"
        width={355}
        height={900}
        priority
        className="w-full h-auto pointer-events-none select-none"
      />

      {/* padding atas kecil, padding bawah diperkecil supaya area tabel + garis total
          memakai hampir seluruh tinggi kertas */}
      <div className="absolute inset-0 flex flex-col px-[3.6vh] pt-[1.8vh] pb-[1.6vh]">
        {/* AREA HEADER + ROWS (scroll) */}
        <div className="flex-1 min-h-0">
          {/* tingginya diperbesar (dari 24vh -> 30vh) supaya baris bisa turun
              sampai mendekati area merah yang kamu tandai */}
          <div className="score-scroll max-h-[35vh] overflow-y-auto pr-[0.4vh]">
            <table className="w-full text-[1.4vh] border-separate border-spacing-y-[0.8vh]">
              <thead className="sticky top-0 z-10 font-abhaya font-extrabold">
                <tr className="font-extrabold text-[16px]">
                  <th className="py-[0.6vh] pr-2 pl-[1vh] text-left border-b border-[#E4C89A]">
                    No Anak Panah
                  </th>
                  <th className="py-[0.6vh] px-2 text-left border-b border-[#E4C89A]">
                    Target
                  </th>
                  <th className="py-[0.6vh] pl-2 pr-[1vh] text-right border-b border-[#E4C89A]">
                    Skor
                  </th>
                </tr>
              </thead>

<tbody className="bg-transparent">
  {rows.map((row, index) => {
    const baseGradient =
      'w-full font-sans font-semibold grid  grid-cols-[minmax(0,1fr)_minmax(0,1fr)_40px] items-center gap-3 px-[1.6vh] py-[0.7vh] rounded-md';

    // baris 1,3,5,...  => full avocado
    const oddGradient = 'bg-gradient-to-r from-avocado-500 to-avocado-500/0';
    // baris 2,4,6,...  => avocado-500/30 -> avocado-500 -> avocado-500/0
    const evenGradient =
      'bg-gradient-to-r from-avocado-500/30 via-avocado-500 to-avocado-500/0';

    const rowGradient = index % 2 === 0 ? oddGradient : evenGradient;

    return (
      <tr key={row.no}>
        <td colSpan={3}>
          <div className={`${baseGradient} ${rowGradient}`}>
            <span className="text-center font-sans font-semibold">{row.no}</span>
            <span className="text-center font-sans font-semibold">{row.target || '-'}</span>
            <span className="text-right font-sans font-semibold">{row.skor}</span>
          </div>
        </td>
      </tr>
    );
  })}
</tbody>
            </table>
          </div>
        </div>

        {/* garis pembatas + total score, ditempel persis di bawah area scroll */}
        <div className="mt-[1vh] border-t border-black pt-[1vh] text-[1.6vh] font-bold flex items-center justify-between">
          <span>{totalScoreLabel}</span>
          <span>{total}</span>
        </div>
      </div>

      <style jsx>{`
        .score-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .score-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}