'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { mockParticipants } from '@/data/participants.mock';
import BottomNav from '@/components/ui/BottomNav';

export default function SkorPesertaPage() {
  const router = useRouter();
  const params = useParams();
  const participantId = params.participantId as string;
  
  const participant = mockParticipants.find(p => p.participantId === participantId);
  
  // State for 6 arrow scores
  const [scores, setScores] = useState<(number | null)[]>([null, null, null, null, null, null]);

  if (!participant) {
    return (
      <div className="min-h-screen bg-[#FBF7F3] flex items-center justify-center">
        <p>Peserta tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF7F3] pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Skor Peserta</h1>
            <button 
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center bg-pink-100 rounded-full"
            >
              <span className="text-pink-500 text-xl">✕</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* Nama Field */}
        <div>
          <label className="block text-sm font-semibold mb-2">Nama</label>
          <input
            type="text"
            value={participant.name}
            disabled
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900"
          />
        </div>

        {/* Bandul Field */}
        <div>
          <label className="block text-sm font-semibold mb-2">Bandul</label>
          <input
            type="text"
            value={participant.bandul}
            disabled
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-900"
          />
        </div>

        {/* Skor Anak Panah */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Skor Anak Panah</h2>
          
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-900">ID Anak Panah</div>
              <div className="text-xs font-semibold text-gray-900 text-right">Total Skor</div>
            </div>

            {/* Arrow Rows */}
            <div className="divide-y divide-gray-50">
              {[1, 2, 3, 4, 5, 6].map((arrowNum) => (
                <div 
                  key={arrowNum}
                  className="grid grid-cols-2 gap-4 px-4 py-4 items-center"
                >
                  <div className="text-sm font-medium text-gray-900">
                    {arrowNum}
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    -/-
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  );
}
