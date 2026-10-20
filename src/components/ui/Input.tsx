import type { InputHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: IconName;
  action?: ReactNode;
};

export function Input({ label, icon, action, id, className = "", ...props }: Props) {
  const inputId = id ?? props.name ?? label?.toLowerCase().replaceAll(" ", "-");
  return (
    <label htmlFor={inputId} className="block space-y-2">
      {label && <span className="text-sm font-medium text-[#202020]">{label}</span>}
      <span className="flex items-center gap-3 rounded-xl border border-[#dedddd] bg-[#f3f1f1] px-4 py-3.5 focus-within:border-black focus-within:bg-white">
        {icon && <Icon name={icon} size={20} className="shrink-0 text-gray-500" />}
        <input id={inputId} className={`min-w-0 flex-1 bg-transparent text-sm text-[#111] outline-none placeholder:text-gray-400 ${className}`} {...props} />
        {action}
      </span>
    </label>
  );
}
