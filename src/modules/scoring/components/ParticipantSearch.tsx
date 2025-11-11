import React from "react";
import Input from "../../../components/ui/Input";

interface ParticipantSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Search input untuk mencari peserta berdasarkan nama/ID.
 * Reuse Input component yang sudah ada.
 */
export const ParticipantSearch: React.FC<ParticipantSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  disabled = false,
  className = ""
}) => {
  return (
    <div className={className}>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        clearable
        size="md"
        prefix={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
        }
        className="w-full"
      />
    </div>
  );
};

export default ParticipantSearch;