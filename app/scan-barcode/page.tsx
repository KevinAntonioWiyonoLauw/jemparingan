'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbarB';
import Bottom from '@/components/bottom/bottom-scan';

export default function BarcodeScannerPage() {
  const router = useRouter();
  const [zoomLevel, setZoomLevel] = useState(50);
  const [flashOn, setFlashOn] = useState(false);
  const [pageTitle] = useState('Scan Barkode Anak Panah');

  return (
    <div className="h-svh w-full bg-[#101A2B] text-white flex flex-col overflow-hidden">
      <header className="shrink-0">
        <Navbar title={pageTitle} />
      </header>

      <section className="flex-1 relative flex items-center justify-center px-[2vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#142035] to-[#0C1120]" />

        <button
          type="button"
          onClick={() => setFlashOn((prev) => !prev)}
          className="absolute top-[2vh] right-[2vh] z-20 w-[5vh] h-[5vh] rounded-full bg-white/15 border border-white/30 flex items-center justify-center text-white"
          aria-label="Toggle flash"
        >
          <svg
            className="w-[2.6vh] h-[2.6vh]"
            viewBox="0 0 24 24"
            fill={flashOn ? '#F8C35E' : 'none'}
            stroke="#F8C35E"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
            <circle cx="19" cy="5" r="1.4" fill="#F8C35E" />
          </svg>
        </button>

        <div className="relative z-10 w-[38vh] h-[28vh] mt-[4vh] flex items-center justify-center">
          <div className="absolute top-0 left-0 w-[8vh] h-[8vh] border-t-[0.6vh] border-l-[0.6vh] border-white/80 rounded-tl-[2vh]" />
          <div className="absolute top-0 right-0 w-[8vh] h-[8vh] border-t-[0.6vh] border-r-[0.6vh] border-white/80 rounded-tr-[2vh]" />
          <div className="absolute bottom-0 left-0 w-[8vh] h-[8vh] border-b-[0.6vh] border-l-[0.6vh] border-white/80 rounded-bl-[2vh]" />
          <div className="absolute bottom-0 right-0 w-[8vh] h-[8vh] border-b-[0.6vh] border-r-[0.6vh] border-white/80 rounded-br-[2vh]" />

          <div className="absolute inset-x-[5vh] top-[0.5vh] h-[0.4vh] bg-[#cda36b] rounded-full" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[20vh] h-[14vh] rotate-12">
              <div className="bg-[#D9B07A] px-[2vh] py-[1vh] rounded-[1vh] shadow-xl shadow-black/40">
                <div className="flex gap-[0.2vh]">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{ width: '0.4vh', height: '5vh' }}
                    />
                  ))}
                </div>
                <div className="text-center text-[1.3vh] mt-[0.7vh] font-mono text-black">
                  A10-3
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[6vh] h-[0.4vh] bg-twine-500 shadow-[0_0_1.5vh_rgba(255,165,81,0.7)] animate-pulse" />
        </div>
      </section>

      <div className="shrink-0 px-[3vh] mb-[5vh]">
        <input
          type="range"
          min="0"
          max="100"
          value={zoomLevel}
          onChange={(e) => setZoomLevel(Number(e.target.value))}
          className="w-full h-[0.8vh] bg-white/20 rounded-full appearance-none accent-twine-400"
        />
      </div>

      <Bottom />
    </div>
  );
}