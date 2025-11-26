'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockParticipants } from '@/data/participants.mock';
import BottomNav from '@/components/ui/BottomNav';
import Navbar from '@/components/navbar/navbarA';
import TreeBackground from '@/components/tree/tree-background';
import TabelSkorPeserta, { SkorRow } from '@/components/skor-peserta/tabel-skor';
import NamaPesertaCard from '@/components/skor-peserta/nama-peserta';

export default function SkorPesertaPage() {
  const router = useRouter();
  const params = useParams();
  const participantId = params.participantId as string;

  const participant = mockParticipants.find(
    (p) => p.participantId === participantId
  );

  // contoh data skor; nanti bisa diganti dari API / state
  const [scores] = useState<(number | null)[]>([3, 1, 0, 0, 1, 1]);

  if (!participant) {
    return (
      <div className="min-h-screen bg-[#FBF7F3] flex items-center justify-center">
        <p>Peserta tidak ditemukan</p>
      </div>
    );
  }

  const rows: SkorRow[] = scores.map((s, i) => ({
    no: i + 1,
    target: s === 3 ? 'Molo' : s === 1 ? 'Awak' : '-',
    skor: s ?? 0,
  }));

  return (
    <div className="relative min-h-screen bg-avocado-200 pb-24 overflow-hidden">
      <TreeBackground className="bottom-[-12vh]" width={1300} height={1100} />

      <div className="relative z-10 flex flex-col min-h-screen font-['Montserrat'] text-[#3D2B1F]">
        <Navbar title="Skor Peserta" />

        <main className="flex-1 w-full max-w-[428px] mx-auto px-[2vh] pt-[2vh] space-y-[2.5vh]">
          <NamaPesertaCard
            name={participant.name ?? '-'}
            participantId={participant.participantId}
            bandul={participant.bandul ?? '-'}
          />

          <TabelSkorPeserta rows={rows} />
        </main>

        <BottomNav activeTab="explore" />
      </div>
    </div>
  );
}