import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type Props = { step: string; title: string; detail: string; children: ReactNode };

export function StepForm({ step, title, detail, children }: Props) {
  return <Card className="p-4"><div className="mb-4 flex items-start justify-between gap-3"><div className="flex gap-3"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-black text-xs font-bold text-lime-400">{step}</div><div><h2 className="text-sm font-bold">{title}</h2><p className="mt-0.5 text-[10px] text-gray-500">{detail}</p></div></div><span className="rounded-md bg-[#f0efef] px-2 py-1 text-[9px] font-bold text-gray-500">Step {step} of 4</span></div>{children}</Card>;
}
