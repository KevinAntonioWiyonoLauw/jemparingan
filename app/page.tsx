'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BottomNav from '../src/components/ui/BottomNav';
import Navbar from '@/components/navbar/navbarB';
import TreeBackground from '@/components/tree/tree-background';

export default function EventPage() {
  const router = useRouter();
  const [pageTitle, setPageTitle] = useState('Input Score');

  const menuItems = [
    { title: 'Data Peserta', icon: '', path: '/participants', bookmarked: true },
    { title: 'Input Skor', icon: '', path: '/input-skor', bookmarked: true },
    { title: 'Rekapitulasi Skor Sementara', icon: '', path: '/rekapitulasi', bookmarked: true },
  ];

  return (
    <div className="relative min-h-screen bg-avocado-200 pb-20 overflow-hidden">
      <TreeBackground className="bottom-[-4vh] left-0 right-0 flex justify-center" width={900} height={900} />

      <div className="relative z-10">
        <div className="sticky top-0 z-20">
          <Navbar title={pageTitle} />
        </div>

        <div className="max-w-md mx-auto px-4 py-6">
          <div className="p-4 mb-6 font-hywenhei">
            <h2 className="font-bold text-lg mb-1">Nama Event</h2>
            <p className="text-sm text-gray-600">Tanggal dan Waktu</p>
          </div>

          <div className="space-y-3 font-hywenhei">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className="w-full bg-twine-400 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-left">{item.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.bookmarked && (
                    <svg className="w-6 h-6 text-avocado-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <BottomNav activeTab="explore" />
      </div>
    </div>
  );
}