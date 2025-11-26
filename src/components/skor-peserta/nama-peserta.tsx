'use client';

import Image from 'next/image';

type Props = {
  name: string;
  participantId: string;
  bandul: string;
};

export default function NamaPesertaCard({ name, participantId, bandul }: Props) {
  return (
    <div className="relative w-full max-w-[355px] max-h-[110px] mx-auto">
      {/* background frame */}
      <Image
        src="/container-peserta.webp" // gambar frame yang kamu lampirkan
        alt="Informasi Peserta"
        width={704}
        height={186}
        priority
        className="w-full h-auto pointer-events-none select-none"
      />

      {/* isi */}
      <div className="absolute inset-0 flex flex-col justify-center px-[3.4vh] py-[1vh] text-[1.7vh] font-abhaya font-bold">
        {/* baris Nama + garis di bawahnya */}
        <div className="flex items-end justify-between pb-[0.3vh] border-b border-[#3D2B1F]">
          <span className="font-semibold">Nama</span>
          <span className="font-semibold">{name}</span>
        </div>

        {/* baris No Peserta */}
        <div className="mt-[0.3vh] flex items-center justify-between">
          <span className="font-semibold ">No Peserta</span>
          <span className="font-semibold">#{participantId}</span>
        </div>

        {/* baris Bandul */}
        <div className="mt-[0.3vh] flex items-center justify-between">
          <span className="font-semibold">Bandul</span>
          <span className="font-semibold">{bandul}</span>
        </div>
      </div>
    </div>
  );
}