export type Bandul = "A" | "B" | "C" | "D";

// Skor Jemparingan yang benar: 0, 1, atau 3
export type ArrowScore = 0 | 1 | 3 | null;

export type ArrowIndex = 1 | 2 | 3 | 4 | 5 | 6;

export interface ArrowResult {
  arrowId: string; // barcode/kode anak panah
  participantId: string;
  score: ArrowScore; // 0=tidak sah, 1=putih, 3=merah, null=belum diinput
  isMbedhol?: boolean; // bonus achievement
  rambahan: number; // ronde ke berapa
}

export interface ParticipantScore {
  participantId: string;
  name?: string;
  bandul?: Bandul;
  // Track per rambahan (4-6 panah per rambahan)
  arrows: ArrowResult[];
  totalScore?: number;
  totalMerah?: number; // jumlah kena kepala
  totalPutih?: number; // jumlah kena badan
  totalMbedhol?: number;
  submitted?: boolean;
}

export interface RankedItem {
  participantId: string;
  name?: string;
  totalScore: number;
  totalMerah: number;
  totalPutih: number;
  totalMbedhol: number;
  rank: number;
}

export interface BandulStatus {
  bandul: Bandul;
  supervisor: string;
  status: "pending" | "submitted" | "done";
}

// Untuk input barcode/manual
export interface ArrowInput {
  arrowCode: string; // dari barcode scan atau manual input
  participantId?: string; // otomatis dari mapping arrow -> participant
  score: ArrowScore;
  isMbedhol?: boolean;
  rambahan: number;
}