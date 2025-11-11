import type { ArrowScore, ArrowResult, ParticipantScore, RankedItem } from "../types";

// Skor valid dalam Jemparingan
export const VALID_SCORES = [0, 1, 3] as const;
export const SCORE_MERAH = 3; // Kepala/Mustaka
export const SCORE_PUTIH = 1; // Badan/Awak  
export const SCORE_TIDAK_SAH = 0; // Nggrempet, mentul, meleset

/**
 * Validate jemparingan score
 */
export function validateScore(value: number | null | undefined): ArrowScore {
  if (value === null || value === undefined || Number.isNaN(value)) return null;
  const n = Number(value);
  if (VALID_SCORES.includes(n as any)) return n as ArrowScore;
  return null;
}

/**
 * Calculate total score from arrow results
 */
export function calculateTotalScore(arrows: ArrowResult[]): number {
  return arrows.reduce((total, arrow) => {
    return total + (typeof arrow.score === "number" ? arrow.score : 0);
  }, 0);
}

/**
 * Count hits by score type
 */
export function countHits(arrows: ArrowResult[]) {
  const counts = { merah: 0, putih: 0, tidakSah: 0, mbedhol: 0 };
  
  arrows.forEach(arrow => {
    if (arrow.score === SCORE_MERAH) counts.merah++;
    else if (arrow.score === SCORE_PUTIH) counts.putih++;
    else if (arrow.score === SCORE_TIDAK_SAH) counts.tidakSah++;
    
    if (arrow.isMbedhol) counts.mbedhol++;
  });
  
  return counts;
}

/**
 * Rank participants by total score, then by merah count (tiebreaker)
 */
export function rankParticipants(participants: ParticipantScore[]): RankedItem[] {
  const items = participants.map(p => {
    const hits = countHits(p.arrows);
    return {
      participantId: p.participantId,
      name: p.name,
      totalScore: calculateTotalScore(p.arrows),
      totalMerah: hits.merah,
      totalPutih: hits.putih, 
      totalMbedhol: hits.mbedhol,
    };
  });

  // Sort: total score desc, then merah count desc (tiebreaker)
  items.sort((a, b) => {
    if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
    return b.totalMerah - a.totalMerah;
  });

  // Assign ranks
  const ranked: RankedItem[] = [];
  let lastScore: number | null = null;
  let lastMerah: number | null = null;
  let lastRank = 0;

  items.forEach((item, index) => {
    if (lastScore === null || 
        item.totalScore !== lastScore || 
        item.totalMerah !== lastMerah) {
      lastRank = index + 1;
      lastScore = item.totalScore;
      lastMerah = item.totalMerah;
    }
    
    ranked.push({ ...item, rank: lastRank });
  });

  return ranked;
}

/**
 * Check if rambahan is complete (all arrows scored)
 */
export function isRambahanComplete(arrows: ArrowResult[], rambahan: number): boolean {
  const rambahanArrows = arrows.filter(a => a.rambahan === rambahan);
  return rambahanArrows.length > 0 && rambahanArrows.every(a => typeof a.score === "number");
}