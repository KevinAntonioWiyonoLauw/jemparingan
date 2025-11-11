import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { mockArrowMapping } from '../data/participants.mock';
import { calculateTotalScore, countHits, rankParticipants } from '../modules/scoring/lib/math';
import type { 
  Bandul, 
  ArrowResult, 
  ParticipantScore, 
  ArrowInput, 
  RankedItem 
} from '../modules/scoring/types';

interface ScoringState {
  // Core state
  currentBandul: Bandul;
  currentRambahan: number;
  participants: ParticipantScore[];
  arrows: ArrowResult[];
  
  // UI state
  isScanning: boolean;
  isSubmitting: boolean;
  
  // Actions
  setBandul: (bandul: Bandul) => void;
  setRambahan: (rambahan: number) => void;
  
  // Arrow management
  addArrow: (input: ArrowInput) => void;
  removeArrow: (arrowId: string) => void;
  updateArrow: (arrowId: string, updates: Partial<ArrowResult>) => void;
  
  // Participant management
  setParticipants: (participants: ParticipantScore[]) => void;
  addParticipant: (participant: ParticipantScore) => void;
  
  // Bulk operations
  resetBandul: (bandul?: Bandul) => void;
  submitBandul: (bandul?: Bandul) => void;
  
  // Computed getters
  getParticipantsByBandul: (bandul: Bandul) => ParticipantScore[];
  getLeaderboard: (bandul: Bandul, limit?: number) => RankedItem[];
  getBandulStats: (bandul: Bandul) => {
    totalParticipants: number;
    totalArrows: number;
    completedRambahan: number;
  };
  
  // UI actions
  setScanning: (isScanning: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
}

export const useScoringStore = create<ScoringState>()(
  devtools(
    immer((set, get) => ({
      // Initial state
      currentBandul: 'A',
      currentRambahan: 1,
      participants: [],
      arrows: [],
      isScanning: false,
      isSubmitting: false,

      // Basic setters
      setBandul: (bandul) => set({ currentBandul: bandul }),
      setRambahan: (rambahan) => set({ currentRambahan: rambahan }),

      // Arrow management
      addArrow: (input) =>
        set((state) => {
          // Find participant by arrow code mapping
          const participantId = input.participantId || mockArrowMapping[input.arrowCode];
          
          if (!participantId) {
            console.warn('Arrow code not found in mapping:', input.arrowCode);
            return; // Don't add if participant not found
          }
          
          const newArrow: ArrowResult = {
            arrowId: input.arrowCode,
            participantId,
            score: input.score,
            isMbedhol: input.isMbedhol || false,
            rambahan: input.rambahan,
          };

          state.arrows.push(newArrow);

          // Update participant arrows
          const participantIndex = state.participants.findIndex(p => p.participantId === participantId);
          if (participantIndex >= 0) {
            const participant = state.participants[participantIndex];
            participant.arrows = state.arrows.filter(a => a.participantId === participantId);
            
            // Update computed values
            const hits = countHits(participant.arrows);
            participant.totalScore = calculateTotalScore(participant.arrows);
            participant.totalMerah = hits.merah;
            participant.totalPutih = hits.putih;
            participant.totalMbedhol = hits.mbedhol;
          }
        }),

      removeArrow: (arrowId) =>
        set((state) => {
          const arrowIndex = state.arrows.findIndex(a => a.arrowId === arrowId);
          if (arrowIndex >= 0) {
            const arrow = state.arrows[arrowIndex];
            state.arrows.splice(arrowIndex, 1);

            // Update participant
            const participant = state.participants.find(p => p.participantId === arrow.participantId);
            if (participant) {
              participant.arrows = state.arrows.filter(a => a.participantId === arrow.participantId);
              const hits = countHits(participant.arrows);
              participant.totalScore = calculateTotalScore(participant.arrows);
              participant.totalMerah = hits.merah;
              participant.totalPutih = hits.putih;
              participant.totalMbedhol = hits.mbedhol;
            }
          }
        }),

      updateArrow: (arrowId, updates) =>
        set((state) => {
          const arrow = state.arrows.find(a => a.arrowId === arrowId);
          if (arrow) {
            Object.assign(arrow, updates);

            // Update participant totals
            const participant = state.participants.find(p => p.participantId === arrow.participantId);
            if (participant) {
              participant.arrows = state.arrows.filter(a => a.participantId === arrow.participantId);
              const hits = countHits(participant.arrows);
              participant.totalScore = calculateTotalScore(participant.arrows);
              participant.totalMerah = hits.merah;
              participant.totalPutih = hits.putih;
              participant.totalMbedhol = hits.mbedhol;
            }
          }
        }),

      // Participant management
      setParticipants: (participants) =>
        set((state) => {
          state.participants = participants.map(p => ({
            ...p,
            arrows: state.arrows.filter(a => a.participantId === p.participantId),
          }));
        }),

      addParticipant: (participant) =>
        set((state) => {
          const existing = state.participants.find(p => p.participantId === participant.participantId);
          if (!existing) {
            state.participants.push({
              ...participant,
              arrows: state.arrows.filter(a => a.participantId === participant.participantId),
            });
          }
        }),

      // Bulk operations
      resetBandul: (bandul) =>
        set((state) => {
          const targetBandul = bandul || state.currentBandul;
          
          // Remove arrows for this bandul
          state.arrows = state.arrows.filter(arrow => {
            const participant = state.participants.find(p => p.participantId === arrow.participantId);
            return participant?.bandul !== targetBandul;
          });

          // Reset participant scores for this bandul
          state.participants.forEach(participant => {
            if (participant.bandul === targetBandul) {
              participant.arrows = [];
              participant.totalScore = 0;
              participant.totalMerah = 0;
              participant.totalPutih = 0;
              participant.totalMbedhol = 0;
            }
          });
        }),

      submitBandul: (bandul) =>
        set((state) => {
          const targetBandul = bandul || state.currentBandul;
          
          // Mark participants as submitted (could add submitted flag)
          state.participants.forEach(participant => {
            if (participant.bandul === targetBandul) {
              participant.submitted = true;
            }
          });
        }),

      // Computed getters
      getParticipantsByBandul: (bandul) => {
        const { participants } = get();
        return participants.filter(p => p.bandul === bandul);
      },

      getLeaderboard: (bandul, limit = 10) => {
        const participants = get().getParticipantsByBandul(bandul);
        const ranked = rankParticipants(participants);
        return ranked.slice(0, limit);
      },

      getBandulStats: (bandul) => {
        const { arrows, participants } = get();
        const bandulParticipants = participants.filter(p => p.bandul === bandul);
        const bandulArrows = arrows.filter(arrow => {
          const participant = participants.find(p => p.participantId === arrow.participantId);
          return participant?.bandul === bandul;
        });

        // Count completed rambahan (assuming 4 arrows per rambahan)
        const maxRambahan = Math.max(...bandulArrows.map(a => a.rambahan), 0);
        let completedRambahan = 0;
        for (let r = 1; r <= maxRambahan; r++) {
          const rambahanArrows = bandulArrows.filter(a => a.rambahan === r);
          if (rambahanArrows.length >= bandulParticipants.length * 4) {
            completedRambahan = r;
          }
        }

        return {
          totalParticipants: bandulParticipants.length,
          totalArrows: bandulArrows.length,
          completedRambahan,
        };
      },

      // UI actions
      setScanning: (isScanning) => set({ isScanning }),
      setSubmitting: (isSubmitting) => set({ isSubmitting }),
    })),
    { name: 'scoring-store' }
  )
);