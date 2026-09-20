import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lime" | "purple" | "cyan" | "warning" | "error" | "muted";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "lime",
  size = "md",
  dot = false,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    sm: "text-[11px] px-2.5 py-0.5 font-bold",
    md: "text-xs px-3 py-1 font-bold",
  };

  const variantStyles = {
    lime: "bg-[#C7FF3D]/15 text-[#C7FF3D] border-[#C7FF3D]/30",
    purple: "bg-[#8B5CF6]/15 text-[#A78BFA] border-[#8B5CF6]/30",
    cyan: "bg-[#22D3EE]/15 text-[#22D3EE] border-[#22D3EE]/30",
    warning: "bg-[#FBBF24]/15 text-[#FBBF24] border-[#FBBF24]/30",
    error: "bg-[#FB7185]/15 text-[#FB7185] border-[#FB7185]/30",
    muted: "bg-[#27272A]/80 text-[#A1A1AA] border-[#3F3F46]",
  };

  const dotColors = {
    lime: "bg-[#C7FF3D]",
    purple: "bg-[#8B5CF6]",
    cyan: "bg-[#22D3EE]",
    warning: "bg-[#FBBF24]",
    error: "bg-[#FB7185]",
    muted: "bg-[#A1A1AA]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} shrink-0 animate-pulse`} />}
      {children}
    </span>
  );
};
