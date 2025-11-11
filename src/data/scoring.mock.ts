import type { BandulStatus } from '../modules/scoring/types';

// Mock bandul status dengan pengawas
export const mockBandulStatus: BandulStatus[] = [
  {
    bandul: 'A',
    supervisor: 'Bambang',
    status: 'pending',
  },
  {
    bandul: 'B',
    supervisor: 'Harianto',
    status: 'done',
  },
  {
    bandul: 'C',
    supervisor: 'Windah',
    status: 'done',
  },
  {
    bandul: 'D',
    supervisor: 'Zakir',
    status: 'pending',
  },
];

// Mock event info
export const mockEventInfo = {
  name: 'Lomba Jemparingan DIY 2025',
  date: '2025-11-11',
  time: '08:00 - 17:00',
  location: 'Alun-alun Kidul Yogyakarta',
};

export default mockBandulStatus;
