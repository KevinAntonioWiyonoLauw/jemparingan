'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockBandulStatus } from '@/data/scoring.mock';
import Navbar from '@/components/navbar/navbarA';
import BottomNav from '@/components/ui/BottomNav';
import TreeBackground from '@/components/tree/tree-background';
import RekapitulasiTabel from '@/components/rekapitulasi-skor/tabel';

export default function RekapitulasiPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [pageTitle, setPageTitle] = useState('Rekapitulasi Score Sementara');

  const filteredBanduls = mockBandulStatus.filter(
    (b) =>
      b.bandul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.supervisor.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedBanduls = filteredBanduls.slice(0, entriesPerPage);

  return (
    <div className="relative min-h-screen bg-avocado-200 pb-24 overflow-hidden">
      <TreeBackground className="bottom-[-14vh]" width={1300} height={1100} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar  title={pageTitle}/>

        <main className="flex-1 w-full max-w-[428px] mx-auto px-4 pt-4 space-y-5">
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

          <RekapitulasiTabel
            rows={paginatedBanduls.map((item) => ({
              bandul: item.bandul,
              pengawas: item.supervisor,
              onClick: () => router.push(`/leaderboard/${item.bandul.toLowerCase()}`),
            }))}
          />

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
              Showing {paginatedBanduls.length} of {filteredBanduls.length}
            </span>
          </div>
        </main>

        <BottomNav activeTab="explore" />
      </div>
    </div>
  );
}