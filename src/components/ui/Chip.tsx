import React, { forwardRef } from "react";

export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps {
  label?: React.ReactNode;
  avatar?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  onDelete?: (e: React.MouseEvent) => void;
  clickable?: boolean;
  removable?: boolean;
  disabled?: boolean;
  size?: ChipSize;
  variant?: "filled" | "outlined";
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

const sizeStyles: Record<ChipSize, { fontSize: number; padding: string; height: number }> = {
  sm: { fontSize: 12, padding: "0 8px", height: 24 },
  md: { fontSize: 14, padding: "0 10px", height: 32 },
  lg: { fontSize: 16, padding: "0 12px", height: 40 },
};

export const Chip = forwardRef<HTMLButtonElement | HTMLDivElement, ChipProps>(
  (
    {
      label,
      avatar,
      onClick,
      onDelete,
      clickable = false,
      removable = false,
      disabled = false,
      size = "md",
      variant = "filled",
      className,
      style,
      title,
      ...rest
    },
    ref
  ) => {
    const s = sizeStyles[size];

    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: s.padding,
      height: s.height,
      fontSize: s.fontSize,
      borderRadius: 999,
      border: variant === "outlined" ? "1px solid rgba(0,0,0,0.12)" : "none",
      background: variant === "filled" ? "rgba(0,0,0,0.06)" : "transparent",
      color: "inherit",
      cursor: disabled ? "not-allowed" : clickable || onClick ? "pointer" : "default",
      userSelect: "none",
      lineHeight: 1,
      outline: "none",
      ...style,
    };

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      onDelete?.(e);
    };

    const content = (
      <>
        {avatar ? <span style={{ display: "inline-flex", marginLeft: 4 }}>{avatar}</span> : null}
        {label !== undefined ? <span>{label}</span> : null}
        {removable && onDelete ? (
          <button
            type="button"
            aria-label="Remove"
            onClick={handleDelete}
            disabled={disabled}
            style={{
              marginLeft: 4,
              border: "none",
              background: "transparent",
              cursor: disabled ? "not-allowed" : "pointer",
              padding: 4,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
            }}
            title="Remove"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </>
    );

    if (clickable || onClick) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={disabled ? undefined : onClick}
          disabled={disabled}
          className={className}
          style={baseStyle}
          aria-pressed={false}
          title={title}
          {...rest}
        >
          {content}
        </button>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={className}
        style={baseStyle}
        role="status"
        title={title}
        {...rest}
      >
        {content}
      </div>
    );
  }
);

export default Chip;