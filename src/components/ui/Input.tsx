import React, { forwardRef, useId } from "react";

export type InputSize = "sm" | "md" | "lg";
export type InputVariant = "outline" | "filled";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "suffix"> {
  size?: InputSize;
  label?: React.ReactNode;
  helper?: React.ReactNode;
  error?: string | boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  clearable?: boolean;
  variant?: "outline" | "filled";
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles: Record<InputSize, React.CSSProperties> = {
  sm: { fontSize: 12, padding: "6px 8px", height: 32 },
  md: { fontSize: 14, padding: "8px 10px", height: 40 },
  lg: { fontSize: 16, padding: "10px 12px", height: 48 },
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    label,
    helper,
    error,
    prefix,
    suffix,
    clearable = false,
    size = "md",
    variant = "outline",
    disabled,
    className,
    style,
    value,
    defaultValue,
    onChange,
    placeholder,
    type = "text",
    ...rest
  } = props;

  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const helperId = helper ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const sStyle = sizeStyles[size];
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    ...style,
  };

  const controlWrapStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: 0,
    height: sStyle.height,
    minWidth: 120,
    borderRadius: 8,
    background: variant === "filled" ? "rgba(0,0,0,0.04)" : "transparent",
    border: variant === "outline" ? `1px solid ${error ? "rgb(220, 38, 38)" : "rgba(0,0,0,0.12)"}` : "none",
    opacity: disabled ? 0.6 : 1,
  };

  const inputStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    fontSize: sStyle.fontSize,
    padding: "0",
    height: "100%",
    flex: 1,
    background: "transparent",
    color: "inherit",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  const showClear = clearable && !disabled && value !== undefined && value !== "" && value !== null;

  return (
    <div className={className} style={containerStyle}>
      {label ? (
        <label htmlFor={inputId} style={{ fontSize: 13, marginBottom: 2, userSelect: "none" }}>
          {label}
        </label>
      ) : null}

      <div style={controlWrapStyle} role="group" aria-disabled={disabled}>
        {prefix ? <span aria-hidden style={{ marginLeft: 8, display: "inline-flex", alignItems: "center" }}>{prefix}</span> : null}

        <input
          id={inputId}
          ref={ref}
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helper ? helperId : undefined}
          style={inputStyle}
          {...rest}
        />

        {showClear ? (
          <button
            type="button"
            onClick={(e) => {
              // create synthetic input event for controlled components
              const nativeInput = (e.currentTarget.previousElementSibling as HTMLInputElement) ?? null;
              if (nativeInput) {
                nativeInput.value = "";
                const ev = new Event("input", { bubbles: true });
                nativeInput.dispatchEvent(ev);
              }
            }}
            aria-label="Clear"
            title="Clear"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 6,
              marginRight: 6,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}

        {suffix ? <span aria-hidden style={{ marginRight: 8, display: "inline-flex", alignItems: "center" }}>{suffix}</span> : null}
      </div>

      {error ? (
        <div id={errorId} style={{ color: "rgb(220, 38, 38)", fontSize: 12 }}>
          {typeof error === "string" ? error : "Error"}
        </div>
      ) : helper ? (
        <div id={helperId} style={{ color: "rgba(0,0,0,0.6)", fontSize: 12 }}>
          {helper}
        </div>
      ) : null}
    </div>
  );
});

export default Input;