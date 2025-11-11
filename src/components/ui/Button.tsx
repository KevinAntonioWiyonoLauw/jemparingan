import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function Button({ 
  variant = "primary", 
  size = "md",
  className = "", 
  ...props 
}: ButtonProps) {
  const baseStyles = "rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm", 
    lg: "px-6 py-3 text-base"
  };

  const variantStyles = {
    primary: "bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100"
  };

  return (
    <button 
      {...props} 
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} 
    />
  );
}