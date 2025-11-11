'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../src/components/ui/BottomNav';

export default function EventPage() {
  const router = useRouter();

  const menuItems = [
    {
      title: 'Data Peserta',
      icon: '',
      path: '/participants',
      bookmarked: true,
    },
    {
      title: 'Input Skor',
      icon: '',
      path: '/input-skor',
      bookmarked: true,
    },
    {
      title: 'Rekapitulasi Skor Sementara',
      icon: '',
      path: '/rekapitulasi',
      bookmarked: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF7F3] pb-20">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Event Committee Pages</h1>
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <h2 className="font-bold text-lg mb-1">Nama Event</h2>
          <p className="text-sm text-gray-600">Tanggal dan Waktu</p>
        </div>

        {/* Menu Cards */}
        <div className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-semibold text-left">{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.bookmarked && (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="explore" />
    </div>
  );
}
