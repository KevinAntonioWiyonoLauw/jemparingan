'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { mockParticipants } from '@/data/participants.mock';
import Navbar from '@/components/navbar/navbarA';
import BottomNav from '@/components/ui/BottomNav';
import TreeBackground from '@/components/tree/tree-background';
import LeaderboardTable, { LeaderboardRow } from '@/components/leaderboard/leaderboard-table';

export default function BandulLeaderboardPage() {
  const router = useRouter();
  const params = useParams();
  const bandul = (params.bandul as string)?.toUpperCase() || 'A';

  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const participants = mockParticipants
    .filter((p) => p.bandul === bandul)
    .filter(
      (p) =>
        p.participantId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0));

  const displayedParticipants = participants.slice(0, entriesPerPage);

  const rows: LeaderboardRow[] = displayedParticipants.map((participant, index) => ({
    rank: index + 1,
    participantId: participant.participantId,
    name: participant.name || '',
    score: participant.totalScore || 0,
  }));

  return (
    <div className="relative min-h-screen bg-avocado-200 pb-24 overflow-hidden">
      <TreeBackground className="bottom-[-12vh]" width={1300} height={1100} />

      <div className="relative z-10 flex flex-col min-h-screen font-['Montserrat'] text-[#3D2B1F]">
        <Navbar title={`Score Bandul ${bandul}`} />

        <main className="flex-1 w-full max-w-[428px] mx-auto px-[2vh] pt-[2vh] space-y-[2.5vh]">
          <div className="flex gap-[1vh] items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-[4vh] pr-[1.8vh] py-[1.4vh] bg-white border border-[#D7C6AA] rounded-[1.4vh] text-[1.6vh] focus:outline-none focus:ring-2 focus:ring-[#B6925D]"
              />
            </div>
            <button className="px-[3vh] py-[1.4vh] bg-[#C4874C] text-white rounded-[1.4vh] text-[1.6vh] font-semibold hover:bg-[#aa7440]">
              Cari
            </button>
          </div>

          <LeaderboardTable rows={rows} />

          <div className="flex items-center justify-between text-sm font-sans font-semibold text-[#3D2B1F]">
            <div className="flex items-center gap-2 font-sans font-semibold">
              <span>Show</span>
              <select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="px-3 py-1.2 bg-white/80 border border-[#D7C6AA] rounded-full focus:outline-none focus:ring-2 focus:ring-[#B6925D]"
              >
                {[10, 25, 50, 100].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>

            <span className="text-sm text-[#6E5336] font-sans font-semibold">
              Showing {displayedParticipants.length} of {participants.length}
            </span>
          </div>
        </main>

        <BottomNav activeTab="explore" />
      </div>
    </div>
  );
}