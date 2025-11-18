'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockBandulStatus } from '@/data/scoring.mock';
import BottomNav from '@/components/ui/BottomNav';

export default function RekapitulasiPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredBanduls = mockBandulStatus.filter(b =>
    b.bandul.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.supervisor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FBF7F3] pb-20">
      {/* Header */}
      <div className="bg-twine-400 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Rekapitulasi Score Sementara</h1>
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center bg-twine-100 rounded-full"
            >
              <span className="text-twine-500 text-xl">✕</span>
            </button>
          </div>

          {/* Search and Cari Button */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-twine-50 border border-twine-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-twine-300"
              />
            </div>
            <button className="px-6 py-2.5 bg-twine-400 text-white rounded-lg font-medium hover:bg-twine-500 transition-colors">
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-twine-400 rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-3 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">Bandul</span>
              <span className="text-xs text-gray-400">⇅</span>
            </div>
            <div className="col-span-7 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">Nama Pengawas</span>
              <span className="text-xs text-gray-400">⇅</span>
            </div>
            <div className="col-span-2"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-50">
            {filteredBanduls.map((bandul) => (
              <div 
                key={bandul.bandul}
                className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/leaderboard/${bandul.bandul.toLowerCase()}`)}
              >
                <div className="col-span-3">
                  <span className="text-sm font-medium text-gray-900">
                    {bandul.bandul}
                  </span>
                </div>
                <div className="col-span-7">
                  <span className="text-sm text-gray-700">
                    {bandul.supervisor}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end items-center">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Controls */}
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
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  );
}
