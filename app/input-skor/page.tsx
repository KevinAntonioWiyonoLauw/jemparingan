'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockBandulStatus } from '@/data/scoring.mock';
import BottomNav from '@/components/ui/BottomNav';
import Navbar from '@/components/navbar/navbarA';
import TreeBackground from '@/components/tree/tree-background';

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

        <main className="flex-1 max-w-md mx-auto px-4 py-6 w-full">
          <div className="bg-twine-400 rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-twine-300 border-b border-gray-100">
              <div className="col-span-3 flex items-center gap-1">
                <span className="text-xs font-semibold text-gray-900">Bandul</span>
                <span className="text-xs text-twine-900">⇅</span>
              </div>
              <div className="col-span-6 flex items-center gap-1">
                <span className="text-xs font-semibold text-gray-900">Nama Pengawas</span>
                <span className="text-xs text-twine-900">⇅</span>
              </div>
              <div className="col-span-3" />
            </div>

            <div className="divide-y divide-gray-50">
              {filteredBanduls.map((bandul) => (
                <div
                  key={bandul.bandul}
                  className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-twine-300 transition-colors cursor-pointer"
                  onClick={() => router.push(`/input-skor/${bandul.bandul.toLowerCase()}`)}
                >
                  <div className="col-span-3">
                    <span className="text-sm font-medium text-gray-900">{bandul.bandul}</span>
                  </div>
                  <div className="col-span-6">
                    <span className="text-sm text-gray-700">{bandul.supervisor}</span>
                  </div>
                  <div className="col-span-3 flex justify-end items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        bandul.status === 'done'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-white text-red-700 border border-red-300'
                      }`}
                    >
                      {bandul.status === 'done' ? 'Done' : 'Submit'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-3 py-1.5 bg-twine-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-twine-300"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-gray-600">entries</span>
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-twine-400 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-twine-300 w-40"
              />
            </div>
          </div>
        </main>

        <footer className="relative z-10">
          <BottomNav activeTab="explore" />
        </footer>
      </div>
    </div>
  );
}