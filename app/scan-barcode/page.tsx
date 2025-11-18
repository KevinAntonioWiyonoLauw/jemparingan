'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BarcodeScannerPage() {
  const router = useRouter();
  const [zoomLevel, setZoomLevel] = useState(50);
  const [flashOn, setFlashOn] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-twine-400/10 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-white font-semibold">Scan Barkode Anak Panah</h1>
          <button
            onClick={() => setFlashOn(!flashOn)}
            className={`p-2 rounded-lg transition-colors ${
              flashOn ? 'bg-yellow-500/30 text-yellow-300' : 'bg-twine-400/10 text-white hover:bg-twine-400/20'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Camera View with Scanning Frame */}
      <div className="h-screen w-full flex items-center justify-center relative">
        {/* Mock Camera Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>
        
        {/* Scanning Frame */}
        <div className="relative z-10 w-80 h-64">
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-white rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-white rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-white rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-white rounded-br-2xl"></div>
          
          {/* Mock Arrow Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-48 h-32">
              {/* Simulated barcode on arrow */}
              <div className="absolute inset-0 flex items-center justify-center rotate-12">
                <div className="bg-twine-400 px-4 py-2 rounded shadow-lg">
                  <div className="flex gap-px">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-black" 
                        style={{ width: '3px', height: '40px' }}
                      />
                    ))}
                  </div>
                  <div className="text-center text-xs mt-1 font-mono">A10-3</div>
                </div>
              </div>
            </div>
          </div>

          {/* Scanning Line Animation */}
          <div className="absolute inset-x-0 top-0 h-1 bg-twine-500 shadow-lg shadow-twine-500/50 animate-pulse"></div>
        </div>
      </div>

      {/* Zoom Control */}
      <div className="absolute bottom-32 left-0 right-0 z-10">
        <div className="max-w-md mx-auto px-8">
          <input
            type="range"
            min="0"
            max="100"
            value={zoomLevel}
            onChange={(e) => setZoomLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-twine-500"
          />
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-twine-500 rounded-t-3xl z-10">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="text-white text-center mb-3 font-medium">
            Gagal scan barkode anak panah?
          </div>
          <button
            onClick={() => router.push('/input-manual')}
            className="w-full bg-twine-400 text-gray-900 py-4 rounded-xl font-semibold flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Pindah ke Input ID anak panah?
          </button>
        </div>
      </div>
    </div>
  );
}
