'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar/navbarB';
import Bottom from '@/components/bottom/bottom-scan-barcode';
import TreeBackground from '@/components/tree/tree-background';

export default function InputManualPage() {
  const router = useRouter();
  const [arrowId, setArrowId] = useState('');
  const [pageTitle] = useState('Input ID Anak Panah');

  const handleSubmit = () => {
    if (arrowId.trim()) {
      router.push(`/input-skor/${arrowId}`);
    }
  };

  return (
    <div className="relative min-h-screen bg-avocado-600 pb-[12vh] overflow-hidden">
      <TreeBackground className="bottom-[-1vh]" />

      <div className="relative z-10">
        <header className="shrink-0">
          <Navbar title={pageTitle} />
        </header>

        <div className="max-w-[428px] mx-auto px-[2vh] pt-[3vh]">
          <div className="relative w-full">
            <Image
              src="/input-manual/id-anak-panah-container.webp"
              alt="ID Anak Panah Container"
              width={856}
              height={540}
              priority
              className="w-full h-auto max-w-full pointer-events-none select-none"
            />

            <div className="absolute inset-0 px-[3vh] mt-[1.5vh] flex flex-col ">
              <label className="text-[2.2vh] font-abhaya font-semibold text-avocado-900 drop-shadow-sm">
                ID Anak Panah
              </label>

              <input
                type="text"
                value={arrowId}
                onChange={(e) => setArrowId(e.target.value)}
                placeholder="Masukkan ID Anak Panah"
                className="w-full px-[1vh] py-[0.7vh] mt-[0.5vh] bg-white/95 border border-[#E4C18F] rounded-md text-[1.5vh] text-[#3D2B1F] placeholder:text-[#9E8B71] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#F1D9A9]"
              />

              <button
                onClick={handleSubmit}
                disabled={!arrowId.trim()}
                className="absolute right-[0vh] bottom-[-6.5vh] px-[2.8vh] py-[0.6vh] bg-twine-600 text-white font-semibold rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full">
          <Bottom />
        </div>
      </div>
    </div>
  );
}