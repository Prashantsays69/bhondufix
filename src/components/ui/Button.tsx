"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "lime" | "purple" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  variant = "lime",
  size = "md",
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-bold cursor-pointer select-none transition-all duration-150 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7FF3D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5 tracking-wide",
  };

  const variantStyles = {
    lime: "bg-[#C7FF3D] text-[#09090B] border-2 border-[#C7FF3D] shadow-[0_4px_0_0_#84B512] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#84B512] active:translate-y-0.5 active:shadow-[0_1px_0_0_#84B512]",
    purple:
      "bg-[#8B5CF6] text-white border-2 border-[#8B5CF6] shadow-[0_4px_0_0_#5B21B6] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#5B21B6] active:translate-y-0.5 active:shadow-[0_1px_0_0_#5B21B6]",
    outline:
      "bg-transparent text-[#F4F4F5] border-2 border-[#27272A] hover:border-[#C7FF3D] hover:text-[#C7FF3D] hover:bg-[#18181B] active:translate-y-0.5",
    ghost:
      "bg-transparent text-[#A1A1AA] hover:text-[#F4F4F5] hover:bg-[#18181B]",
    danger:
      "bg-[#FB7185] text-[#09090B] border-2 border-[#FB7185] shadow-[0_4px_0_0_#9F1239] hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#9F1239] active:translate-y-0.5 active:shadow-[0_1px_0_0_#9F1239]",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
