import type { ParticipantScore } from '../modules/scoring/types';

export const mockParticipants: ParticipantScore[] = [
  // Bandul A
  {
    participantId: 'A001',
    name: 'Agus Budiman',
    bandul: 'A',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  {
    participantId: 'A002',
    name: 'Bambang Suharto',
    bandul: 'A',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  {
    participantId: 'A003',
    name: 'Catur Winarno',
    bandul: 'A',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  
  // Bandul B
  {
    participantId: 'B001',
    name: 'Dwi Hartanto',
    bandul: 'B',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  {
    participantId: 'B002',
    name: 'Eko Prasetyo',
    bandul: 'B',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  
  // Bandul C
  {
    participantId: 'C001',
    name: 'Fajar Wijaya',
    bandul: 'C',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  {
    participantId: 'C002',
    name: 'Gede Kusuma',
    bandul: 'C',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  
  // Bandul D
  {
    participantId: 'D001',
    name: 'Hendra Gunawan',
    bandul: 'D',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
  {
    participantId: 'D002',
    name: 'Indra Kurniawan',
    bandul: 'D',
    arrows: [],
    totalScore: 0,
    totalMerah: 0,
    totalPutih: 0,
    totalMbedhol: 0,
    submitted: false,
  },
];

// Mock mapping arrow code ke participant (untuk barcode simulation)
export const mockArrowMapping: Record<string, string> = {
  // Format: arrowCode -> participantId
  'ARW001': 'A001', 'ARW002': 'A001', 'ARW003': 'A001', 'ARW004': 'A001',
  'ARW005': 'A002', 'ARW006': 'A002', 'ARW007': 'A002', 'ARW008': 'A002',
  'ARW009': 'A003', 'ARW010': 'A003', 'ARW011': 'A003', 'ARW012': 'A003',
  
  'ARW013': 'B001', 'ARW014': 'B001', 'ARW015': 'B001', 'ARW016': 'B001',
  'ARW017': 'B002', 'ARW018': 'B002', 'ARW019': 'B002', 'ARW020': 'B002',
  
  'ARW021': 'C001', 'ARW022': 'C001', 'ARW023': 'C001', 'ARW024': 'C001',
  'ARW025': 'C002', 'ARW026': 'C002', 'ARW027': 'C002', 'ARW028': 'C002',
  
  'ARW029': 'D001', 'ARW030': 'D001', 'ARW031': 'D001', 'ARW032': 'D001',
  'ARW033': 'D002', 'ARW034': 'D002', 'ARW035': 'D002', 'ARW036': 'D002',
};

export default mockParticipants;