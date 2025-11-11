import React, { useState } from "react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/Modal";
import { validateScore } from "../lib/math";
import type { ArrowScore, ArrowInput } from "../types";

interface ArrowScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (arrowInput: ArrowInput) => void;
  currentRambahan: number;
  disabled?: boolean;
}

export const ArrowScanner: React.FC<ArrowScannerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  currentRambahan,
  disabled = false
}) => {
  const [arrowCode, setArrowCode] = useState("");
  const [score, setScore] = useState<string>("");
  const [isMbedhol, setIsMbedhol] = useState(false);
  const [scanMode, setScanMode] = useState<"barcode" | "manual">("barcode");

  const handleSubmit = () => {
    if (!arrowCode.trim()) return;
    
    const validatedScore = validateScore(Number(score));
    if (validatedScore === null) return;

    onSubmit({
      arrowCode: arrowCode.trim(),
      score: validatedScore,
      isMbedhol,
      rambahan: currentRambahan
    });

    // Reset form
    setArrowCode("");
    setScore("");
    setIsMbedhol(false);
    onClose();
  };

  const isValid = arrowCode.trim() && score && validateScore(Number(score)) !== null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white rounded-2xl max-w-sm mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Input Skor Anak Panah</h2>
          <button onClick={onClose} className="p-1">
            ✕
          </button>
        </div>

        {/* Mode Switch */}
        <div className="flex gap-2 mb-4">
          <Button
            variant={scanMode === "barcode" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setScanMode("barcode")}
            className="flex-1"
          >
            📷 Scan Barcode
          </Button>
          <Button
            variant={scanMode === "manual" ? "primary" : "secondary"}
            size="sm"
            onClick={() => setScanMode("manual")}
            className="flex-1"
          >
            ✍️ Input Manual
          </Button>
        </div>

        {/* Barcode Scanner (Mockup) */}
        {scanMode === "barcode" && (
          <div className="mb-4 aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-2">📱</div>
              <p className="text-sm">Arahkan ke barcode anak panah</p>
              <div className="mt-4 border-2 border-dashed border-pink-300 w-32 h-20 mx-auto rounded"></div>
            </div>
          </div>
        )}

        {/* Arrow Code Input */}
        <div className="mb-4">
          <Input
            label="ID Anak Panah"
            placeholder={scanMode === "barcode" ? "Hasil scan..." : "Masukkan kode"}
            value={arrowCode}
            onChange={(e) => setArrowCode(e.target.value)}
            disabled={scanMode === "barcode"}
          />
        </div>

        {/* Score Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Skor</label>
          <div className="flex gap-2">
            {[0, 1, 3].map((s) => (
              <button
                key={s}
                onClick={() => setScore(s.toString())}
                className={`
                  flex-1 py-3 rounded-lg font-semibold text-sm
                  ${score === s.toString() 
                    ? "bg-pink-500 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {s === 0 && "0 - Tidak Sah"}
                {s === 1 && "1 - Putih"}
                {s === 3 && "3 - Merah"}
              </button>
            ))}
          </div>
        </div>

        {/* Mbedhol Toggle */}
        <div className="mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isMbedhol}
              onChange={(e) => setIsMbedhol(e.target.checked)}
              className="w-5 h-5 text-pink-500 rounded"
            />
            <span className="text-sm font-medium">🏆 Mbedhol (Bandhul lepas)</span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid || disabled}
          variant="primary"
          className="w-full"
        >
          Submit Skor
        </Button>
      </div>
    </Modal>
  );
};

export default ArrowScanner;