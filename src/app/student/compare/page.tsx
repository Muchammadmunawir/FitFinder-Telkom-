"use client";

import { useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { gyms } from "@/lib/fitfinder-data";

const rows = [
  { label: "Match Score", get: (gym: typeof gyms[number]) => `${gym.match}%` },
  { label: "Daily Pass", get: (gym: typeof gyms[number]) => gym.daily },
  { label: "Student Monthly", get: (gym: typeof gyms[number]) => gym.monthly },
  { label: "Location", get: (gym: typeof gyms[number]) => gym.location },
  { label: "Rating", get: (gym: typeof gyms[number]) => `${gym.rating} (${gym.reviews})` },
  { label: "Facilities", get: (gym: typeof gyms[number]) => gym.facilities.join(" • ") },
];

export default function StudentComparePage() {
  const [selectedIds, setSelectedIds] = useState<[string | null, string | null]>([null, null]);
  const selectedGyms = selectedIds.map((id) => gyms.find((gym) => gym.id === id) ?? null);
  const ready = selectedGyms.every(Boolean);

  const selectGym = (slot: 0 | 1, id: string) => setSelectedIds((current) => { const next: [string | null, string | null] = [...current]; next[slot] = id || null; return next; });
  const reset = () => setSelectedIds([null, null]);

  return <StudentLayout><main className="mx-auto max-w-5xl px-5 pb-28 pt-6 sm:px-8"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-600">DECISION HELPER</p><h1 className="mt-1 text-3xl font-black">Compare Gyms</h1><p className="mt-2 text-sm text-gray-500">Pilih dua gym untuk melihat perbandingan side-by-side.</p><div className="mt-7 grid gap-4 md:grid-cols-2">{selectedIds.map((selectedId, index) => <Card key={index} className="p-5"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wide text-gray-400">Option {index + 1}</p><h2 className="mt-1 text-lg font-bold">{selectedId ? gyms.find((gym) => gym.id === selectedId)?.name : `Select Gym ${index + 1}`}</h2></div><span className="grid h-9 w-9 place-items-center rounded-xl bg-lime-50 text-lime-700">{index + 1}</span></div><select value={selectedId ?? ""} onChange={(event) => selectGym(index as 0 | 1, event.target.value)} className="mt-5 w-full rounded-xl border border-[#dedcdb] bg-[#f5f3f3] px-3 py-3 text-sm outline-none focus:border-black"><option value="">Select Gym {index + 1}</option>{gyms.map((gym) => <option key={gym.id} value={gym.id} disabled={gym.id === selectedIds[index === 0 ? 1 : 0]}>{gym.name}</option>)}</select>{selectedId && <Badge variant="lime" className="mt-3">{gyms.find((gym) => gym.id === selectedId)?.match}% match</Badge>}</Card>)}</div>{ready ? <><div className="mt-6 flex items-center justify-between"><h2 className="text-xl font-black">Comparison Result</h2><button type="button" onClick={reset} className="text-xs font-semibold text-red-600 underline">Reset selection</button></div><Card className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead><tr className="border-b border-[#efeded]"><th className="p-4 text-xs uppercase tracking-wide text-gray-500">Criteria</th>{selectedGyms.map((gym) => <th key={gym!.id} className="p-4 font-bold">{gym!.name}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.label} className="border-b border-[#f1eeee] last:border-0"><th className="p-4 text-xs font-medium text-gray-500">{row.label}</th>{selectedGyms.map((gym) => <td key={gym!.id} className={`max-w-[220px] p-4 ${row.label === "Match Score" ? "font-bold text-lime-700" : "text-gray-700"}`}>{row.get(gym!)}</td>)}</tr>)}</tbody></table></Card></> : <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center"><Icon name="swap" size={26} className="mx-auto text-gray-400" /><p className="mt-3 text-sm font-semibold">Pilih dua gym untuk mulai membandingkan.</p><p className="mt-1 text-xs text-gray-500">Tabel akan muncul setelah kedua slot terisi.</p></div>}</main></StudentLayout>;
}
