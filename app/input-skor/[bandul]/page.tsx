'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockParticipants } from '@/data/participants.mock';
import BottomNav from '@/components/ui/BottomNav';
import type { Bandul } from '@/modules/scoring/types';

export default function BandulDetailPage() {
  const router = useRouter();
  const params = useParams();

  const rawBandul = (params?.bandul as string) || '';
  const bandul = rawBandul.trim().charAt(0).toUpperCase() as Bandul;
  
  // Validate bandul
  if (!['A', 'B', 'C', 'D'].includes(bandul)) {
    return (
      <div className="min-h-screen bg-avocado-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bandul Tidak Ditemukan</h1>
          <button 
            onClick={() => router.push('/input-skor')}
            className="px-6 py-2 bg-twine-400 text-white rounded-lg"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const [moloSearch, setMoloSearch] = useState('');
  const [awakSearch, setAwakSearch] = useState('');
  const [moloEntries, setMoloEntries] = useState(10);
  const [awakEntries, setAwakEntries] = useState(10);

  // Mock data for Molo (Kepala/Merah)
  const moloArrows = mockParticipants
    .filter(p => p.bandul === bandul)
    .slice(0, moloEntries)
    .map((p, idx) => ({
      arrowId: `A${idx + 10}-3`,
      participantId: p.participantId,
      name: p.name,
    }))
    .filter(a => 
      a.arrowId.toLowerCase().includes(moloSearch.toLowerCase()) ||
      a.name?.toLowerCase().includes(moloSearch.toLowerCase())
    );

  // Mock data for Awak (Badan/Putih)
  const awakArrows = mockParticipants
    .filter(p => p.bandul === bandul)
    .slice(0, awakEntries)
    .map((p, idx) => ({
      arrowId: `A${idx + 1}-4`,
      participantId: p.participantId,
      name: p.name,
    }))
    .filter(a => 
      a.arrowId.toLowerCase().includes(awakSearch.toLowerCase()) ||
      a.name?.toLowerCase().includes(awakSearch.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-avocado-100 pb-20">
      {/* Header */}
      <div className="bg-twine-400 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Bandul {bandul}</h1>
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center bg-twine-100 rounded-full hover:bg-twine-200 transition-colors"
            >
              <span className="text-twine-500 text-xl">✕</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Molo Submit Option */}
        <div className="bg-twine-400 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Molo Submit Option</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-twine-400 text-gray-700 text-sm font-medium">
                Arrow ID
              </button>
              <button 
                onClick={() => router.push('/scan-barcode')}
                className="px-4 py-2 bg-twine-600 text-avocado-50 rounded-lg text-sm font-medium hover:bg-twine-500 transition-colors"
              >
                Barcode
              </button>
            </div>
          </div>

          {/* Molo Table */}
          <div className="bg-twine-400 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-twine-300 border-b border-gray-100">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-gray-900">Arrow ID</span>
                <span className="text-xs text-twine-900">⇅</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-gray-900">Participant Name</span>
                <span className="text-xs text-twine-900">⇅</span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-50">
              {moloArrows.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  Tidak ada data
                </div>
              ) : (
                moloArrows.map((arrow) => (
                  <div key={arrow.arrowId} className="grid grid-cols-2 gap-4 px-4 py-4 hover:bg-twine-300 transition-colors">
                    <span className="text-sm font-medium text-gray-900">{arrow.arrowId}</span>
                    <span className="text-sm text-gray-700">{arrow.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Molo Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Show</span>
              <select
                value={moloEntries}
                onChange={(e) => setMoloEntries(Number(e.target.value))}
                className="px-3 py-1.5 bg-twine-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-twine-300"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-gray-600">entries</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={moloSearch}
                onChange={(e) => setMoloSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-twine-400 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-twine-300 w-40"
              />
            </div>
          </div>
        </div>

        {/* Awak Submit Option */}
        <div className="bg-twine-400 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Awak Submit Option</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-twine-400 text-gray-700 text-sm font-medium">
                Arrow ID
              </button>
              <button 
                onClick={() => router.push('/scan-barcode')}
                className="px-4 py-2 bg-twine-600 text-avocado-50 rounded-lg text-sm font-medium hover:bg-twine-500 transition-colors"
              >
                Barcode
              </button>
            </div>
          </div>

          {/* Awak Table */}
          <div className="bg-twine-400 rounded-2xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-twine-300 border-b border-gray-100">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-gray-900">Arrow ID</span>
                <span className="text-xs text-twine-900">⇅</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-gray-900">Participant Name</span>
                <span className="text-xs text-twine-900">⇅</span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-50">
              {awakArrows.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  Tidak ada data
                </div>
              ) : (
                awakArrows.map((arrow) => (
                  <div key={arrow.arrowId} className="grid grid-cols-2 gap-4 px-4 py-4 hover:bg-twine-300 transition-colors">
                    <span className="text-sm font-medium text-gray-900">{arrow.arrowId}</span>
                    <span className="text-sm text-gray-700">{arrow.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Awak Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Show</span>
              <select
                value={awakEntries}
                onChange={(e) => setAwakEntries(Number(e.target.value))}
                className="px-3 py-1.5 bg-twine-400 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-twine-300"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-gray-600">entries</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={awakSearch}
                onChange={(e) => setAwakSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 bg-twine-400 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-twine-300 w-40"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  );
}