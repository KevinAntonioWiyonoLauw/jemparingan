'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockParticipants } from '../../../src/data/participants.mock';
import BottomNav from '../../../src/components/ui/BottomNav';
import type { ParticipantScore } from '../../../src/modules/scoring/types';

export default function BandulLeaderboardPage() {
  const router = useRouter();
  const params = useParams();
  const bandul = (params.bandul as string)?.toUpperCase() || 'A';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Filter participants for this bandul and by search
  const participants = mockParticipants
    .filter(p => p.bandul === bandul)
    .filter(p => 
      p.participantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));

  const displayedParticipants = participants.slice(0, entriesPerPage);

  return (
    <div className="min-h-screen bg-[#FBF7F3] pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Score Bandul {bandul}</h1>
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full"
            >
              <span className="text-pink-500 text-xl">✕</span>
            </button>
          </div>

          {/* Search and Edit Button */}
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
              Edit Peserta
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-2 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">Peringkat</span>
            </div>
            <div className="col-span-3 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">ID Peserta</span>
            </div>
            <div className="col-span-4 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">Nama</span>
            </div>
            <div className="col-span-3 flex items-center gap-1 justify-end">
              <span className="text-xs font-semibold text-gray-900">Skor</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-50">
            {displayedParticipants.length === 0 ? (
              <div className="px-4 py-12 text-center text-gray-500">
                Tidak ada data tersedia
              </div>
            ) : (
              displayedParticipants.map((participant, index) => (
                <div 
                  key={participant.participantId}
                  className="grid grid-cols-12 gap-2 px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-gray-900">
                      {index + 1}
                    </span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-sm font-medium text-gray-900">
                      #{participant.participantId}
                    </span>
                  </div>
                  <div className="col-span-4">
                    <span className="text-sm text-gray-700">
                      {participant.name}
                    </span>
                  </div>
                  <div className="col-span-3 flex justify-end">
                    <span className="text-sm font-bold text-gray-900">
                      {participant.totalScore || 0}
                    </span>
                  </div>
                </div>
              ))
            )}
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
