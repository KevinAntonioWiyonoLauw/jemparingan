import React, { useMemo } from "react";
import Button from "../../../components/ui/Button";
import { calculateTotalScore, countHits } from "../lib/math";
import type { Bandul, ParticipantScore } from "../types";

interface ScoringTableProps {
  bandul: Bandul;
  participants: ParticipantScore[];
  currentRambahan: number;
  onOpenScanner: () => void;
  onResetBandul: () => void;
  onSubmitBandul: () => void;
  disabled?: boolean;
}

export const ScoringTable: React.FC<ScoringTableProps> = ({
  bandul,
  participants,
  currentRambahan,
  onOpenScanner,
  onResetBandul,
  onSubmitBandul,
  disabled = false
}) => {
  // Filter participants untuk bandul ini
  const bandulParticipants = useMemo(() => 
    participants.filter(p => p.bandul === bandul),
    [participants, bandul]
  );

  const hasAnyScore = bandulParticipants.some(p => p.arrows.length > 0);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Bandul {bandul}</h3>
        <div className="text-sm text-gray-500">
          Rambahan ke-{currentRambahan}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-4">
        <Button
          onClick={onOpenScanner}
          variant="primary"
          size="sm"
          disabled={disabled}
          className="flex-1"
        >
          📱 Scan Anak Panah
        </Button>
        <Button
          onClick={onResetBandul}
          variant="secondary"
          size="sm"
          disabled={!hasAnyScore || disabled}
        >
          🔄 Reset
        </Button>
        <Button
          onClick={onSubmitBandul}
          variant="primary"
          size="sm"
          disabled={!hasAnyScore || disabled}
        >
          ✅ Submit
        </Button>
      </div>

      {/* Participants Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 font-medium">Peserta</th>
              <th className="text-center p-3 font-medium">Merah</th>
              <th className="text-center p-3 font-medium">Putih</th>
              <th className="text-center p-3 font-medium">Total</th>
              <th className="text-center p-3 font-medium">Mbedhol</th>
            </tr>
          </thead>
          <tbody>
            {bandulParticipants.map((participant) => {
              const hits = countHits(participant.arrows);
              const total = calculateTotalScore(participant.arrows);
              
              return (
                <tr key={participant.participantId} className="border-t">
                  <td className="p-3">
                    <div>
                      <div className="font-medium">{participant.name}</div>
                      <div className="text-xs text-gray-500">
                        ID: {participant.participantId}
                      </div>
                    </div>
                  </td>
                  <td className="text-center p-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      {hits.merah}
                    </span>
                  </td>
                  <td className="text-center p-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                      {hits.putih}
                    </span>
                  </td>
                  <td className="text-center p-3">
                    <span className="inline-flex items-center justify-center w-10 h-8 bg-pink-100 text-pink-700 rounded-full text-sm font-bold">
                      {total}
                    </span>
                  </td>
                  <td className="text-center p-3">
                    {hits.mbedhol > 0 && (
                      <span className="text-amber-500 text-lg">🏆</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {bandulParticipants.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Belum ada peserta terdaftar untuk Bandul {bandul}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoringTable;