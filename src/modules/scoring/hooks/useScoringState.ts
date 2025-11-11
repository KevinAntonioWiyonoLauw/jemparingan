import { useScoringStore } from '../../../store/scoring.store';
import type { Bandul, ArrowInput } from '../types';
import { useCallback } from 'react';

/**
 * Custom hook yang menyediakan scoring state dan actions
 * dengan API yang clean untuk komponen
 */
export function useScoringState() {
  const store = useScoringStore();

  // Core state
  const currentBandul = store.currentBandul;
  const currentRambahan = store.currentRambahan;
  const isScanning = store.isScanning;
  const isSubmitting = store.isSubmitting;

  // Computed data untuk bandul saat ini
  const currentParticipants = store.getParticipantsByBandul(currentBandul);
  const currentLeaderboard = store.getLeaderboard(currentBandul, 5);
  const currentStats = store.getBandulStats(currentBandul);

  // Actions dengan error handling - wrapped dengan useCallback
  const setBandul = useCallback((bandul: Bandul) => {
    store.setBandul(bandul);
  }, [store]);

  const setRambahan = useCallback((rambahan: number) => {
    if (rambahan > 0) {
      store.setRambahan(rambahan);
    }
  }, [store]);

  const submitArrow = useCallback(async (input: ArrowInput) => {
    try {
      store.setScanning(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      store.addArrow(input);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to submit arrow:', error);
      return { success: false, error: 'Gagal menyimpan skor' };
    } finally {
      store.setScanning(false);
    }
  }, [store]);

  const resetCurrentBandul = useCallback(async () => {
    try {
      store.setSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      store.resetBandul(currentBandul);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to reset bandul:', error);
      return { success: false, error: 'Gagal reset bandul' };
    } finally {
      store.setSubmitting(false);
    }
  }, [store, currentBandul]);

  const submitCurrentBandul = useCallback(async () => {
    try {
      store.setSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      store.submitBandul(currentBandul);
      
      return { success: true };
    } catch (error) {
      console.error('Failed to submit bandul:', error);
      return { success: false, error: 'Gagal submit bandul' };
    } finally {
      store.setSubmitting(false);
    }
  }, [store, currentBandul]);

  const setScanning = useCallback((scanning: boolean) => {
    store.setScanning(scanning);
  }, [store]);

  // Data loading - useCallback untuk stabilitas
  const loadParticipants = useCallback((participants: any[]) => {
    store.setParticipants(participants);
  }, [store]);

  return {
    // State
    currentBandul,
    currentRambahan,
    isScanning,
    isSubmitting,
    
    // Computed
    participants: currentParticipants,
    leaderboard: currentLeaderboard,
    stats: currentStats,
    
    // Actions
    setBandul,
    setRambahan,
    submitArrow,
    resetCurrentBandul,
    submitCurrentBandul,
    setScanning,
    loadParticipants,
  };
}

export default useScoringState;