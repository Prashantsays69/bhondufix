import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "accent" | "bordered";
  sticker?: string;
  stickerColor?: "lime" | "purple" | "cyan" | "warning";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  sticker,
  stickerColor = "lime",
  className = "",
  ...props
}) => {
  const stickerColors = {
    lime: "bg-[#C7FF3D] text-[#09090B] border-[#09090B]",
    purple: "bg-[#8B5CF6] text-white border-[#09090B]",
    cyan: "bg-[#22D3EE] text-[#09090B] border-[#09090B]",
    warning: "bg-[#FBBF24] text-[#09090B] border-[#09090B]",
  };

  const variantStyles = {
    default: "bg-[#18181B] border-2 border-[#27272A] text-[#F4F4F5]",
    elevated:
      "bg-[#111113] border-2 border-[#27272A] shadow-[0_6px_0_0_rgba(0,0,0,0.6)] text-[#F4F4F5]",
    accent:
      "bg-[#18181B] border-2 border-[#C7FF3D]/40 shadow-[0_4px_20px_rgba(199,255,61,0.08)] text-[#F4F4F5]",
    bordered: "bg-transparent border-2 border-[#27272A] text-[#F4F4F5]",
  };

  return (
    <div
      className={`relative rounded-3xl p-6 transition-all duration-200 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {sticker && (
        <div
          className={`absolute -top-3.5 right-6 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 shadow-sm rotate-2 ${stickerColors[stickerColor]}`}
        >
          {sticker}
        </div>
      )}
      {children}
    </div>
  );
};
