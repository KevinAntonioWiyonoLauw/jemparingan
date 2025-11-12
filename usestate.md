## **List useState untuk Semua Pages**

### 1. **`/scoring` (Event Committee Pages)**
**File:** page.tsx
```tsx
// Tidak ada useState - page ini static
```

---

### 2. **`/participants` (Data Peserta)**
**File:** page.tsx
```tsx
const [participants, setParticipants] = useState<ParticipantScore[]>([]);
const [searchQuery, setSearchQuery] = useState('');
const [entriesPerPage, setEntriesPerPage] = useState(10);
const [isLoaded, setIsLoaded] = useState(false);
```

---

### 3. **`/input-skor` (Input Skor List)**
**File:** page.tsx
```tsx
const [searchQuery, setSearchQuery] = useState('');
const [entriesPerPage, setEntriesPerPage] = useState(10);
```

---

### 4. **`/input-skor/[bandul]` (Bandul Detail - Molo/Awak)**
**File:** [`app/input-skor/[bandul]/page.tsx`](app/input-skor/[bandul]/page.tsx)
```tsx
const [moloSearch, setMoloSearch] = useState('');
const [awakSearch, setAwakSearch] = useState('');
const [moloEntries, setMoloEntries] = useState(10);
const [awakEntries, setAwakEntries] = useState(10);
```

---

### 5. **`/scan-barcode` (Barcode Scanner)**
**File:** page.tsx
```tsx
const [zoomLevel, setZoomLevel] = useState(50);
const [flashOn, setFlashOn] = useState(false);
```

---

### 6. **`/input-manual` (Input ID Manual)**
**File:** page.tsx
```tsx
const [arrowId, setArrowId] = useState('');
```

---

### 7. **`/rekapitulasi` (Rekapitulasi Skor Sementara)**
**File:** page.tsx
```tsx
const [searchQuery, setSearchQuery] = useState('');
const [entriesPerPage, setEntriesPerPage] = useState(10);
```

---

### 8. **`/leaderboard/[bandul]` (Score Bandul)**
**File:** [`app/leaderboard/[bandul]/page.tsx`](app/leaderboard/[bandul]/page.tsx)
```tsx
const [searchQuery, setSearchQuery] = useState('');
const [entriesPerPage, setEntriesPerPage] = useState(10);
```

---

### 9. **`/skor-peserta/[participantId]` (Skor Peserta Detail)**
**File:** page.tsx
```tsx
const [participant, setParticipant] = useState<ParticipantScore | null>(null);
const [scores, setScores] = useState<Array<{ id: number; score: string }>>([
  { id: 1, score: '-/-' },
  { id: 2, score: '-/-' },
  { id: 3, score: '-/-' },
  { id: 4, score: '-/-' },
  { id: 5, score: '-/-' },
  { id: 6, score: '-/-' },
]);
```

---

## 📊 **Summary useState by Category:**

### **Search & Filter States (6 pages):**
```tsx
const [searchQuery, setSearchQuery] = useState('');
const [entriesPerPage, setEntriesPerPage] = useState(10);
```
**Used in:**
- `/participants`
- `/input-skor`
- `/input-skor/[bandul]` (moloSearch, awakSearch)
- `/rekapitulasi`
- `/leaderboard/[bandul]`

### **Data Loading States (2 pages):**
```tsx
const [participants, setParticipants] = useState<ParticipantScore[]>([]);
const [isLoaded, setIsLoaded] = useState(false);
```
**Used in:**
- `/participants`

### **Scanner/Camera States (1 page):**
```tsx
const [zoomLevel, setZoomLevel] = useState(50);
const [flashOn, setFlashOn] = useState(false);
```
**Used in:**
- `/scan-barcode`

### **Form Input States (2 pages):**
```tsx
const [arrowId, setArrowId] = useState('');
const [participant, setParticipant] = useState<ParticipantScore | null>(null);
const [scores, setScores] = useState<Array<{ id: number; score: string }>>(...)
```
**Used in:**
- `/input-manual`
- `/skor-peserta/[participantId]`

### **Pagination Variants (1 page):**
```tsx
const [moloSearch, setMoloSearch] = useState('');
const [awakSearch, setAwakSearch] = useState('');
const [moloEntries, setMoloEntries] = useState(10);
const [awakEntries, setAwakEntries] = useState(10);
```
**Used in:**
- `/input-skor/[bandul]`

---

## 🎯 **Total useState Count:**

| Page | useState Count |
|------|----------------|
| `/scoring` | 0 |
| `/participants` | 4 |
| `/input-skor` | 2 |
| `/input-skor/[bandul]` | 4 |
| `/scan-barcode` | 2 |
| `/input-manual` | 1 |
| `/rekapitulasi` | 2 |
| `/leaderboard/[bandul]` | 2 |
| `/skor-peserta/[participantId]` | 2 |
| **TOTAL** | **19 useState** |