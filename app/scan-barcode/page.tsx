'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navbar/navbarB';
import Bottom from '@/components/bottom/bottom-scan';
import { useZxing } from 'react-zxing';
import { useSearchParams, useRouter } from 'next/navigation';
import { useScoringStore } from '@/store/scoring.store';
import { ArrowScore } from '@/modules/scoring/types';
import { mockParticipants } from '@/data/participants.mock';

export default function BarcodeScannerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const urlBandul = searchParams.get('bandul'); // Get bandul from URL

  // Store actions and state
  const addArrow = useScoringStore((state) => state.addArrow);
  const setParticipants = useScoringStore((state) => state.setParticipants);
  const currentRambahan = useScoringStore((state) => state.currentRambahan);
  const participants = useScoringStore((state) => state.participants);

  // Initialize Data
  React.useEffect(() => {
    if (participants.length === 0) {
      setParticipants(mockParticipants);
    }
  }, [participants.length, setParticipants]);

  const [zoomLevel, setZoomLevel] = useState(50);
  const [flashOn, setFlashOn] = useState(false);
  const [pageTitle] = useState('Scan Barkode Anak Panah');
  const [result, setResult] = useState('A10-3'); // Default placeholder
  const [error, setError] = useState<string>('');
  const [constraints, setConstraints] = useState<MediaStreamConstraints>({
    video: { facingMode: 'environment' },
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [lastScannedCode, setLastScannedCode] = useState<string>('');
  const [lastScore, setLastScore] = useState<number>(0);
  const [scannedParticipant, setScannedParticipant] = useState<{ name: string; bandul: string } | null>(null);
  const [selectedBandul, setSelectedBandul] = useState<string>(urlBandul || 'A'); // Default to URL param or 'A'

  // Update selected bandul if URL changes
  React.useEffect(() => {
    if (urlBandul) {
      setSelectedBandul(urlBandul);
    }
  }, [urlBandul]);

  // Check for Secure Context (HTTPS)
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setError('Camera requires HTTPS or localhost. If testing on phone, use a tunnel (ngrok) or enable "Insecure origins treated as secure" in chrome://flags.');
    }
  }, []);

  const { ref } = useZxing({
    onDecodeResult(result) {
      const text = result.getText();

      // Prevent duplicate scans (rapid fire)
      if (showSuccess || text === lastScannedCode) {
        return;
      }

      setResult(text);
      setLastScannedCode(text);
      setError('');

      // Parse Barcode: ParticipantID-ArrowIndex (e.g., 20463-3)
      const [participantId] = text.split('-');

      // Find Participant
      const participant = participants.find(p => p.participantId === participantId);

      if (!participant) {
        setError(`Peserta tidak ditemukan! ID: ${participantId}`);
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
        return;
      }

      const participantName = participant.name || 'Peserta Tidak Dikenal';
      const participantBandul = participant.bandul || 'A';

      // Validate Bandul
      if (participantBandul !== selectedBandul) {
        setError(`Salah Bandul! Peserta ini terdaftar di Bandul ${participantBandul}, tapi Anda sedang scan Bandul ${selectedBandul}.`);

        // Haptic feedback (error pattern)
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([100, 50, 100]);
        }
        return; // Stop processing
      }

      setScannedParticipant({ name: participantName, bandul: participantBandul });

      // Determine score based on URL param
      let score: ArrowScore = 0;
      if (type === 'molo') score = 3;
      else if (type === 'awak') score = 1;

      setLastScore(score || 0);

      // Save to store
      addArrow({
        arrowCode: text,
        participantId: participantId, // Use parsed ID
        score: score,
        rambahan: currentRambahan,
      });

      setShowSuccess(true);

      // Haptic feedback if available
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(200);
      }
    },
    onError(err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        // Auto-fallback if it's a constraint issue
        if (err.name === 'OverconstrainedError' || err.name === 'NotFoundError') {
          setConstraints({ video: true }); // Try any camera
        }
      } else {
        setError('Unknown error occurred');
      }
    },
    constraints,
  });

  return (
    <div className="h-svh w-full bg-[#101A2B] text-white flex flex-col overflow-hidden">
      <header className="shrink-0">
        <Navbar title={pageTitle} />
      </header>

      <section className="flex-1 relative flex items-center justify-center px-[2vh]">
        <div className="absolute inset-0 bg-black">
          <video ref={ref} className="w-full h-full object-cover" />
        </div>

        {/* Overlay Gradient - Optional, maybe remove or make transparent to see camera */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#142035]/50 to-[#0C1120]/50 pointer-events-none" />

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

        <div className="relative z-10 w-[38vh] h-[28vh] mt-[4vh] flex items-center justify-center pointer-events-none">
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
                  {result}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 top-[6vh] h-[0.4vh] bg-twine-500 shadow-[0_0_1.5vh_rgba(255,165,81,0.7)] animate-pulse" />
        </div>

        {error && (
          <div className="absolute top-[10vh] left-0 right-0 mx-auto w-[80%] bg-red-500/90 text-white p-4 rounded-2xl text-center z-50 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-4">
            <p className="font-bold mb-2 text-lg">
              {error.includes('Salah Bandul') || error.includes('Peserta tidak ditemukan') ? 'Gagal Scan!' : 'Error'}
            </p>
            <p className="text-sm mb-4 leading-relaxed">{error}</p>

            {error.includes('Salah Bandul') || error.includes('Peserta tidak ditemukan') ? (
              <button
                onClick={() => setError('')}
                className="bg-white text-red-600 w-full py-3 rounded-xl text-sm font-bold active:scale-95 transition-transform shadow-sm"
              >
                Tutup
              </button>
            ) : (
              <button
                onClick={() => setConstraints({ video: true })}
                className="bg-white text-red-600 px-6 py-2 rounded-full text-sm font-bold active:scale-95 transition-transform shadow-sm"
              >
                Try Any Camera
              </button>
            )}
          </div>
        )}

        {/* Success Popup */}
        {showSuccess && (
          <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6 animate-in fade-in duration-200">
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
                    setLastScannedCode(''); // Allow re-scanning
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                >
                  Scan Lagi
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
      </section>

      <div className="shrink-0 px-[3vh] mb-[5vh] space-y-4">
        {/* Bandul Selector */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <label className="block text-white/80 text-xs mb-2 font-bold uppercase tracking-wider">Bandul Saat Ini</label>
          <div className="flex gap-2">
            {['A', 'B', 'C', 'D'].map((bandul) => (
              <button
                key={bandul}
                onClick={() => setSelectedBandul(bandul)}
                className={`flex-1 py-2 rounded-lg font-bold transition-all ${selectedBandul === bandul
                  ? 'bg-[#F8C35E] text-[#3D2B1F] shadow-lg scale-105'
                  : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
              >
                {bandul}
              </button>
            ))}
          </div>
        </div>

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