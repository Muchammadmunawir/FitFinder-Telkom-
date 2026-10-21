"use client";

import { useEffect, useState } from "react";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Icon } from "@/components/ui/Icon";
import { Gym } from "@/lib/fitfinder-data";

const rows = [
  { label: "Match Score", get: (gym: Gym) => `${gym.match}%` },
  { label: "Daily Pass", get: (gym: Gym) => gym.daily },
  { label: "Student Monthly", get: (gym: Gym) => gym.monthly },
  { label: "Location", get: (gym: Gym) => gym.location },
  { label: "Rating", get: (gym: Gym) => `${gym.rating} (${gym.reviews})` },
  { label: "Facilities", get: (gym: Gym) => gym.facilities.join(" • ") },
];

export default function StudentComparePage() {
  const [gymsList, setGymsList] = useState<Gym[]>([]);
  const [selectedIds, setSelectedIds] = useState<[string | null, string | null]>([null, null]);

  useEffect(() => {
    async function loadGyms() {
      try {
        const res = await fetch("/api/gyms");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setGymsList(json.data);
        }
      } catch (err) {
        console.error("Failed to load gyms for comparison:", err);
      }
    }
    loadGyms();
  }, []);

  const selectedGyms = selectedIds.map((id) => gymsList.find((gym) => gym.id === id) ?? null);
  const ready = selectedGyms.every(Boolean);

  const selectGym = (slot: 0 | 1, id: string) =>
    setSelectedIds((current) => {
      const next: [string | null, string | null] = [...current];
      next[slot] = id || null;
      return next;
    });

  const reset = () => setSelectedIds([null, null]);

  return (
    <StudentLayout>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-28 md:pb-16">
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end border-b border-[#efeded] pb-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-700">DECISION HELPER</p>
            <h1 className="mt-1 text-3xl font-black text-[#171717] sm:text-4xl">Compare Gyms</h1>
            <p className="mt-1 text-sm text-[#737373]">Pilih dua gym untuk melihat perbandingan side-by-side.</p>
          </div>
          {ready && (
            <button
              type="button"
              onClick={reset}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Reset selection
            </button>
          )}
        </div>

        {/* 2-Gym Selector Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {selectedIds.map((selectedId, index) => {
            const currentGym = selectedId ? gymsList.find((g) => g.id === selectedId) : null;
            return (
              <div key={index} className="rounded-xl border border-[#e5e5e0] bg-white p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Option {index + 1}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-[#171717]">
                      {currentGym ? currentGym.name : `Select Gym ${index + 1}`}
                    </h2>
                  </div>
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-white text-xs font-black">
                    {index + 1}
                  </span>
                </div>

                <select
                  value={selectedId ?? ""}
                  onChange={(event) => selectGym(index as 0 | 1, event.target.value)}
                  className="mt-4 w-full rounded-lg border border-[#e5e5e0] bg-[#fbf9f9] px-3.5 py-3 text-sm font-semibold text-[#171717] outline-none transition focus:border-[#171717] focus:bg-white"
                >
                  <option value="">Pilih Gym {index + 1}</option>
                  {gymsList.map((gym) => (
                    <option key={gym.id} value={gym.id} disabled={gym.id === selectedIds[index === 0 ? 1 : 0]}>
                      {gym.name} ({gym.location})
                    </option>
                  ))}
                </select>

                {currentGym && (
                  <div className="mt-4 flex items-center justify-between border-t border-[#efeded] pt-3">
                    <span className="rounded bg-[#171717] px-2.5 py-1 text-xs font-black text-[#c8f169] tabular-nums">
                      {currentGym.match}% match
                    </span>
                    <span className="text-xs font-bold text-[#171717] tabular-nums">
                      {currentGym.monthly} <span className="text-gray-400 font-normal">/ mo</span>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison Result Matrix */}
        {ready ? (
          <div className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-black text-[#171717]">Comparison Result</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-[#e5e5e0] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e5e5e0] bg-[#fbf9f9]">
                      <th className="p-4 text-xs font-bold uppercase tracking-wider text-gray-500 w-1/4">Criteria</th>
                      {selectedGyms.map((gym) => (
                        <th key={gym!.id} className="p-4 font-black text-[#171717] w-3/8 text-base">
                          {gym!.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#efeded]">
                    {rows.map((row) => (
                      <tr key={row.label} className="hover:bg-[#fbf9f9] transition">
                        <th className="p-4 text-xs font-bold uppercase tracking-wide text-gray-400 bg-white">
                          {row.label}
                        </th>
                        {selectedGyms.map((gym) => (
                          <td
                            key={gym!.id}
                            className={`p-4 ${
                              row.label === "Match Score"
                                ? "font-black text-lg text-[#171717] tabular-nums"
                                : row.label === "Daily Pass" || row.label === "Student Monthly"
                                ? "font-bold text-[#171717] tabular-nums"
                                : "text-gray-700"
                            }`}
                          >
                            {row.get(gym!)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-[#dedcdb] bg-white p-12 text-center">
            <Icon name="swap" size={28} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm font-bold text-[#171717]">Pilih dua gym untuk mulai membandingkan.</p>
            <p className="mt-1 text-xs text-gray-400">Tabel perbandingan akan muncul setelah kedua gym dipilih.</p>
          </div>
        )}
      </main>
    </StudentLayout>
  );
}
