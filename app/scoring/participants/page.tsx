'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mockParticipants } from '../../../src/data/participants.mock';
import BottomNav from '@/components/ui/BottomNav';
import type { ParticipantScore } from '../../../src/modules/scoring/types';

export default function ParticipantsPage() {
  const router = useRouter();
  const [participants, setParticipants] = useState<ParticipantScore[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load participants
  useEffect(() => {
    if (!isLoaded) {
      setParticipants(mockParticipants);
      setIsLoaded(true);
    }
  }, [isLoaded]);

  // Filter participants based on search
  const filteredParticipants = participants.filter(p => 
    p.participantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const displayedParticipants = filteredParticipants.slice(0, entriesPerPage);

  const handleDelete = (participantId: string) => {
    if (confirm('Yakin ingin menghapus peserta ini?')) {
      setParticipants(prev => prev.filter(p => p.participantId !== participantId));
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF7F3] pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Data Peserta</h1>
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
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="col-span-1 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-600">⇅</span>
            </div>
            <div className="col-span-4 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">ID Peserta</span>
              <span className="text-xs text-gray-400">⇅</span>
            </div>
            <div className="col-span-5 flex items-center gap-1">
              <span className="text-xs font-semibold text-gray-900">Nama</span>
              <span className="text-xs text-gray-400">⇅</span>
            </div>
            <div className="col-span-2"></div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-50">
            {displayedParticipants.length === 0 ? (
              <div className="px-4 py-12 text-center text-gray-500">
                Tidak ada peserta ditemukan
              </div>
            ) : (
              displayedParticipants.map((participant) => (
                <div 
                  key={participant.participantId}
                  className="grid grid-cols-12 gap-4 px-4 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="col-span-1"></div>
                  <div className="col-span-4">
                    <span className="text-sm font-medium text-gray-900">
                      {participant.participantId}
                    </span>
                  </div>
                  <div className="col-span-5">
                    <span className="text-sm text-gray-700">
                      {participant.name}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      onClick={() => handleDelete(participant.participantId)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
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

        {/* Results Info */}
        <div className="mt-4 text-center text-sm text-gray-500">
          Menampilkan {displayedParticipants.length} dari {filteredParticipants.length} peserta
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  );
}
