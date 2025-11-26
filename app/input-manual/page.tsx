'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/navbarB';
import Bottom from '@/components/bottom/bottom-scan-barcode';
import TreeBackground from '@/components/tree/tree-background';
import InputManual from '@/components/input-manual/input';

export default function InputManualPage() {

  const [pageTitle] = useState('Input ID Anak Panah');

  return (
    <div className="relative min-h-screen bg-avocado-600 pb-[12vh] overflow-hidden">
      <TreeBackground className="bottom-[-1vh]" />

      <div className="relative z-10">
        <header className="shrink-0">
          <Navbar title={pageTitle} />
        </header>

        <InputManual/>

        <div className="fixed bottom-0 left-0 w-full">
          <Bottom />
        </div>
      </div>
    </div>
  );
}