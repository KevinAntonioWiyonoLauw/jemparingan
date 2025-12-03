'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useScoringStore } from '@/store/scoring.store';
import { mockParticipants } from '@/data/participants.mock';
import type { ArrowScore } from '@/modules/scoring/types';

export default function InputManual() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const urlBandul = searchParams.get('bandul');

  const [arrowId, setArrowId] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [scannedParticipant, setScannedParticipant] = useState<{ name: string; bandul: string } | null>(null);
  const [lastScore, setLastScore] = useState<number>(0);

  // Store actions
  const addArrow = useScoringStore((state) => state.addArrow);
  const participants = useScoringStore((state) => state.participants);
  const setParticipants = useScoringStore((state) => state.setParticipants);
  const currentRambahan = useScoringStore((state) => state.currentRambahan);

  // Initialize Data if empty
  useEffect(() => {
    if (participants.length === 0) {
      setParticipants(mockParticipants);
    }
  }, [participants.length, setParticipants]);

  const handleSubmit = () => {
    setError('');
    setShowSuccess(false);

    if (!arrowId.trim()) return;

    // Parse ID
    const [participantId] = arrowId.trim().split('-');
    const participant = participants.find((p) => p.participantId === participantId);

    // Validation
    if (!participant) {
      setError(`Peserta tidak ditemukan! ID: ${participantId}`);
      return;
    }

    const participantBandul = participant.bandul || 'A';
    const selectedBandul = urlBandul || 'A';

    if (participantBandul !== selectedBandul) {
      setError(
        `Salah Bandul! Peserta ini terdaftar di Bandul ${participantBandul}, tapi Anda sedang input Bandul ${selectedBandul}.`
      );
      return;
    }

    // Determine Score
    let score: ArrowScore = 0;
    if (type === 'molo') score = 3;
    else if (type === 'awak') score = 1;

    setLastScore(score || 0);
    setScannedParticipant({ name: participant.name || 'Peserta', bandul: participantBandul });

    // Add Arrow
    addArrow({
      arrowCode: arrowId.trim(),
      participantId: participantId,
      score: score,
      rambahan: currentRambahan,
    });

    // Show Success Popup
    setShowSuccess(true);
    setArrowId(''); // Clear input
  };

  return (
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
            placeholder="Masukkan ID Anak Panah (Contoh: 20463-1)"
            className="w-full px-[1vh] py-[0.7vh] mt-[0.5vh] bg-white/95 border border-[#E4C18F] rounded-md text-[1.5vh] text-[#3D2B1F] placeholder:text-[#9E8B71] shadow-inner focus:outline-none focus:ring-2 focus:ring-[#F1D9A9]"
          />

          <button
            onClick={handleSubmit}
            disabled={!arrowId.trim()}
            className="absolute right-[0vh] bottom-[-6.5vh] px-[2.8vh] py-[0.6vh] bg-twine-600 text-white font-semibold rounded-lg active:scale-95 transition-transform"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Error Popup */}
      {error && (
        <div className="fixed top-[10vh] left-0 right-0 mx-auto w-[80%] max-w-sm bg-red-500/90 text-white p-4 rounded-2xl text-center z-50 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-4">
          <p className="font-bold mb-2 text-lg">
            {error.includes('Salah Bandul') || error.includes('Peserta tidak ditemukan') ? 'Gagal Input!' : 'Error'}
          </p>
          <p className="text-sm mb-4 leading-relaxed">{error}</p>

          <button
            onClick={() => setError('')}
            className="bg-white text-red-600 w-full py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform shadow-sm"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Berhasil Tercatat!</h3>
            <p className="text-gray-600 mb-4">
              Berhasil menambahkan <span className="font-bold text-gray-900">{lastScore} poin</span> ke peserta <br />
              <span className="font-bold text-lg text-[#C4874C]">{scannedParticipant?.name}</span>
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowSuccess(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Input Lagi
              </button>

              <button
                onClick={() => router.push(`/leaderboard/${scannedParticipant?.bandul.toLowerCase()}`)}
                className="w-full bg-white border-2 border-[#C4874C] text-[#C4874C] font-bold py-3 px-4 rounded-xl hover:bg-orange-50 transition-colors"
              >
                Lihat Rekapitulasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}