import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={`rounded-2xl border border-[#e7e5e4] bg-white shadow-[0_4px_13px_rgba(0,0,0,0.04)] ${className}`} {...props} />;
}
