'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockBandulStatus } from '@/data/scoring.mock';
import BottomNav from '@/components/ui/BottomNav';
import Navbar from '@/components/navbar/navbarA';
import TreeBackground from '@/components/tree/tree-background';
import TabelPengawas from '@/components/input-skor/tabel-pengawas';

export default function InputSkorPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [pageTitle, setPageTitle] = useState('Input Score');

  const filteredBanduls = mockBandulStatus.filter(
    (b) =>
      b.bandul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.supervisor.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="relative min-h-screen bg-avocado-200 pb-20 overflow-hidden">
      <TreeBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="pt-2">
          <Navbar title={pageTitle} onTitleChange={setPageTitle} />
        </header>

        <main className="flex-1 px-4 py-6">
          <TabelPengawas
            data={filteredBanduls.slice(0, entriesPerPage)}
            entriesPerPage={entriesPerPage}
            onEntriesChange={setEntriesPerPage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onRowClick={(bandul) => router.push(`/input-skor/${bandul.toLowerCase()}`)}
          />
        </main>

        <footer className="relative z-10">
          <BottomNav activeTab="explore" />
        </footer>
      </div>
    </div>
  );
}