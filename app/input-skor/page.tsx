'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockBandulStatus } from '../../../src/data/scoring.mock';
import BottomNav from '@/components/ui/BottomNav';

export default function InputSkorPage() {
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
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Input Skor</h1>
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full"
            >
              <span className="text-pink-500 text-xl">✕</span>
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
                className="w-full pl-10 pr-4 py-2.5 bg-pink-50 border border-pink-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
            <button className="px-6 py-2.5 bg-pink-400 text-white rounded-lg font-medium hover:bg-pink-500 transition-colors">
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-3 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">Bandul</span>
              <span className="text-xs text-gray-400">⇅</span>
            </div>
            <div className="col-span-6 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">Nama Pengawas</span>
              <span className="text-xs text-gray-400">⇅</span>
            </div>
            <div className="col-span-3"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-50">
            {filteredBanduls.map((bandul) => (
              <div 
                key={bandul.bandul}
                className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/input-skor/${bandul.bandul.toLowerCase()}`)}
              >
                <div className="col-span-3">
                  <span className="text-sm font-medium text-gray-900">
                    {bandul.bandul}
                  </span>
                </div>
                <div className="col-span-6">
                  <span className="text-sm text-gray-700">
                    {bandul.supervisor}
                  </span>
                </div>
                <div className="col-span-3 flex justify-end items-center">
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-medium
                    ${bandul.status === 'done' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-white text-gray-700 border border-gray-300'
                    }
                  `}>
                    {bandul.status === 'done' ? 'Done' : 'Submit'}
                  </span>
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
              className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
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
              className="pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 w-40"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  );
}
