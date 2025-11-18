import React from "react";
import { rankParticipants } from "../lib/math";
import type { Bandul, ParticipantScore } from "../types";

interface LeaderboardCardProps {
  bandul: Bandul;
  participants: ParticipantScore[];
  limit?: number;
  className?: string;
}

export const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  bandul,
  participants,
  limit = 5,
  className = ""
}) => {
  // Filter dan rank participants untuk bandul ini
  const bandulParticipants = participants.filter(p => p.bandul === bandul);
  const ranked = rankParticipants(bandulParticipants).slice(0, limit);

  if (ranked.length === 0) {
    return (
      <div className={`bg-twine-400 rounded-2xl p-4 shadow-sm ${className}`}>
        <h3 className="font-semibold mb-3">🏆 Leaderboard Bandul {bandul}</h3>
        <div className="text-center py-6 text-gray-500">
          Belum ada skor tersedia
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-twine-400 rounded-2xl p-4 shadow-sm ${className}`}>
      <h3 className="font-semibold mb-3">🏆 Leaderboard Bandul {bandul}</h3>
      
      <div className="space-y-2">
        {ranked.map((item) => {
          const isTopThree = item.rank <= 3;
          
          return (
            <div
              key={item.participantId}
              className={`
                flex items-center gap-3 p-3 rounded-lg
                ${isTopThree ? "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200" : "bg-gray-50"}
              `}
            >
              {/* Rank Badge */}
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm
                ${item.rank === 1 ? "bg-yellow-500 text-white" : ""}
                ${item.rank === 2 ? "bg-gray-400 text-white" : ""}  
                ${item.rank === 3 ? "bg-amber-600 text-white" : ""}
                ${item.rank > 3 ? "bg-gray-200 text-gray-700" : ""}
              `}>
                {item.rank}
              </div>

              {/* Participant Info */}
              <div className="flex-1">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-gray-500">
                  {item.totalMerah}M • {item.totalPutih}P
                  {item.totalMbedhol > 0 && ` • ${item.totalMbedhol}🏆`}
                </div>
              </div>

              {/* Total Score */}
              <div className="font-bold text-twine-600 text-lg">
                {item.totalScore}
              </div>
            </div>
          );
        })}
      </div>

      {ranked.length === limit && bandulParticipants.length > limit && (
        <div className="text-center mt-3 text-sm text-gray-500">
          dan {bandulParticipants.length - limit} peserta lainnya...
        </div>
      )}
    </div>
  );
};

export default LeaderboardCard;