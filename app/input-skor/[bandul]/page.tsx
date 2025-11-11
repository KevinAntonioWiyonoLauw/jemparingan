'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockArrowMapping } from '../../../src/data/participants.mock';
import BottomNav from '../../../src/components/ui/BottomNav';

export default function BandulDetailPage() {
  const router = useRouter();
  const params = useParams();
  const bandul = (params.bandul as string)?.toUpperCase() || 'A';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Mock data for Molo (Kepala/Merah) - Filter arrows that start with bandul letter
  const moloArrows = Object.entries(mockArrowMapping)
    .filter(([arrowId]) => arrowId.startsWith(`${bandul}`) && arrowId.includes('-'))
    .slice(0, 4)
    .map(([arrowId, participantId]) => ({
      arrowId,
      participantName: `Participant ${participantId}`,
    }));

  // Mock data for Awak (Badan/Putih)
  const awakArrows = Object.entries(mockArrowMapping)
    .filter(([arrowId]) => arrowId.startsWith(`${bandul}`) && arrowId.includes('-'))
    .slice(4, 7)
    .map(([arrowId, participantId]) => ({
      arrowId,
      participantName: `Participant ${participantId}`,
    }));

  return (
    <div className="min-h-screen bg-[#FBF7F3] pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Bandul {bandul}</h1>
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full"
            >
              <span className="text-pink-500 text-xl">✕</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Molo Submit Option */}
        <div className="bg-pink-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Molo Submit Option</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white text-gray-900 border border-gray-300">
                Arrow ID
              </button>
              <button
                onClick={() => router.push('/scan-barcode')}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-pink-400 text-white hover:bg-pink-500 transition-colors"
              >
                Barcode
              </button>
            </div>
          </div>

          {/* Molo Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 border-b">
              <div className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                <span>⇅</span> Arrow ID
              </div>
              <div className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                <span>⇅</span> Participant Name
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {moloArrows.map((arrow) => (
                <div key={arrow.arrowId} className="grid grid-cols-2 gap-4 px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{arrow.arrowId}</div>
                  <div className="text-sm text-gray-700">{arrow.participantName}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Show</span>
              <select className="px-2 py-1 bg-white border rounded text-xs">
                <option>10</option>
              </select>
              <span className="text-gray-600">entries</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-2 py-1 bg-white border rounded text-xs w-32"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
            </div>
          </div>
        </div>

        {/* Awak Submit Option */}
        <div className="bg-pink-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">Awak Submit Option</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white text-gray-900 border border-gray-300">
                Arrow ID
              </button>
              <button
                onClick={() => router.push('/scan-barcode')}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-pink-400 text-white hover:bg-pink-500 transition-colors"
              >
                Barcode
              </button>
            </div>
          </div>

          {/* Awak Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 border-b">
              <div className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                <span>⇅</span> Arrow ID
              </div>
              <div className="text-xs font-semibold text-gray-900 flex items-center gap-1">
                <span>⇅</span> Participant Name
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {awakArrows.map((arrow) => (
                <div key={arrow.arrowId} className="grid grid-cols-2 gap-4 px-4 py-3">
                  <div className="text-sm font-medium text-gray-900">{arrow.arrowId}</div>
                  <div className="text-sm text-gray-700">{arrow.participantName}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Show</span>
              <select className="px-2 py-1 bg-white border rounded text-xs">
                <option>10</option>
              </select>
              <span className="text-gray-600">entries</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-2 py-1 bg-white border rounded text-xs w-32"
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  );
}
