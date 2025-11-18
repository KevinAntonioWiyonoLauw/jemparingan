'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InputManualPage() {
  const router = useRouter();
  const [arrowId, setArrowId] = useState('');

  const handleSubmit = () => {
    if (arrowId.trim()) {
      // Navigate to score input or process the arrow ID
      router.push(`/input-skor/${arrowId}`);
    }
  };

  return (
    <div className="min-h-screen bg-avocado-100">
      {/* Header */}
      <div className="bg-twine-400 sticky top-0 z-10 shadow-sm">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="p-2 hover:bg-twine-300 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Input ID Anak Panah</h1>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            ID Anak Panah <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={arrowId}
            onChange={(e) => setArrowId(e.target.value)}
            placeholder="masukkan ID"
            className="w-full px-4 py-3 bg-twine-50 border border-twine-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-twine-300 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!arrowId.trim()}
          className="w-full bg-twine-600 text-avocado-50 py-3 rounded-xl font-semibold hover:bg-twine-500 active:bg-twine-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
