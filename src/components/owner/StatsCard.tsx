import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

type Props = { label: string; value: string; note: string; icon: ReactNode; accent?: boolean };

export function StatsCard({ label, value, note, icon, accent = false }: Props) {
  return <Card className={`flex items-center justify-between p-4 ${accent ? "border-lime-200 bg-lime-50" : ""}`}><div><p className="text-[10px] font-medium uppercase tracking-wide text-gray-500">{label}</p><p className="mt-1 text-2xl font-black">{value}</p><p className="mt-1 text-[10px] text-gray-500">{note}</p></div><span className="grid h-10 w-10 place-items-center rounded-xl bg-black text-lime-400">{icon}</span></Card>;
}
