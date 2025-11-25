'use client';

import React, { useMemo, useState } from 'react';
import { mockParticipants } from '@/data/participants.mock';
import Navbar from '@/components/navbar/navbarA';
import BottomNav from '@/components/ui/BottomNav';
import TreeBackground from '@/components/tree/tree-background';
import DataPesertaTable from '@/components/data-peserta/data-peserta-table';

export default function DataPesertaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filtered = useMemo(
    () =>
      mockParticipants.filter(
        (p) =>
          p.participantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

const rows = filtered.slice(0, entriesPerPage).map((item) => ({
    id: item.participantId,
    name: item.name ?? '-',
    origin: item.bandul ? `Bandul ${item.bandul}` : '-',
  }));

  return (
    <div className="relative min-h-screen bg-avocado-200 pb-24 overflow-hidden">
      <TreeBackground className="bottom-[-12vh]" width={1300} height={1100} />

      <div className="relative z-10 flex flex-col min-h-screen font-['Montserrat'] text-[#3D2B1F]">
        <Navbar title="Data Peserta" />

        <main className="flex-1 w-full max-w-[428px] mx-auto px-[2vh] pt-[2vh] space-y-[2.4vh]">
          <div className="flex gap-[1vh] items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-[4vh] pr-[1.8vh] py-[1.4vh] bg-white border border-[#D7C6AA] rounded-[1.4vh] text-[1.6vh] focus:outline-none focus:ring-2 focus:ring-[#B6925D]"
              />
            </div>
            <button className="px-[3vh] py-[1.4vh] bg-[#C4874C] text-white rounded-[1.4vh] text-[1.6vh] font-semibold hover:bg-[#aa7440]">
              Cari
            </button>
          </div>

          <DataPesertaTable rows={rows} />

          <div className="flex items-center justify-between text-sm font-sans font-semibold text-[#3D2B1F]">
            <div className="flex items-center gap-2 font-sans font-semibold">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-3 py-1.2 bg-white/80 border border-[#D7C6AA] rounded-full focus:outline-none focus:ring-2 focus:ring-[#B6925D]"
              >
                {[10, 25, 50, 100].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>

            <span className="text-sm text-[#6E5336] font-sans font-semibold">
              Showing {rows.length} of {filtered.length}
            </span>
          </div>
        </main>

        <BottomNav activeTab="explore" />
      </div>
    </div>
  );
}