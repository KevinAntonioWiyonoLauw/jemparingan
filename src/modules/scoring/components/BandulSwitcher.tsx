import React from "react";
import type { Bandul } from "../types";

interface BandulSwitcherProps {
  value: Bandul;
  onChange: (bandul: Bandul) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Mobile-first bandul switcher (A-D) sesuai design mockup.
 * Uses pink-500 untuk active state, white untuk inactive.
 */
export const BandulSwitcher: React.FC<BandulSwitcherProps> = ({ 
  value, 
  onChange, 
  disabled = false, 
  className = "" 
}) => {
  const banduls: Bandul[] = ["A", "B", "C", "D"];

  return (
    <div className={`w-full ${className}`} role="tablist" aria-label="Pilih bandul">
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
        {banduls.map((bandul) => {
          const isActive = bandul === value;
          
          return (
            <button
              key={bandul}
              role="tab"
              aria-selected={isActive}
              aria-disabled={disabled}
              onClick={() => !disabled && onChange(bandul)}
              className={`
                flex-1 py-3 px-4 rounded-lg font-semibold text-sm min-h-[44px]
                transition-all duration-200 min-w-[64px]
                ${isActive 
                  ? "bg-pink-500 text-white shadow-lg" 
                  : "bg-transparent text-gray-700 hover:bg-white/50"
                }
                ${disabled 
                  ? "opacity-50 cursor-not-allowed" 
                  : "active:scale-95 hover:scale-[1.02]"
                }
              `}
              style={{
                boxShadow: isActive ? "0 4px 14px rgba(236, 72, 153, 0.25)" : undefined
              }}
            >
              {bandul}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BandulSwitcher;