import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-black text-white hover:bg-[#252525]",
  lime: "bg-lime-500 text-black hover:bg-lime-400",
  secondary: "border border-[#dedcdb] bg-white text-[#111] hover:border-black",
  ghost: "text-gray-600 hover:bg-gray-100",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  return <button className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`} {...props} />;
}
