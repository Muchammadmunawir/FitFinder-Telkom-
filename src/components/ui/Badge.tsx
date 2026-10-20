import type { ReactNode } from "react";

type Props = { children: ReactNode; variant?: "dark" | "lime" | "muted" | "outline"; className?: string };

const variants = {
  dark: "border-black bg-black text-white",
  lime: "border-lime-200 bg-lime-50 text-lime-700",
  muted: "border-[#e2e0df] bg-white text-gray-600",
  outline: "border-[#dedcdb] bg-transparent text-gray-600",
};

export function Badge({ children, variant = "muted", className = "" }: Props) {
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-semibold ${variants[variant]} ${className}`}>{children}</span>;
}
