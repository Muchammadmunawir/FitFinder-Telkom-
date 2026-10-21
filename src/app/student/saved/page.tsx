"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GymCard } from "@/components/student/GymCard";
import { StudentLayout } from "@/components/student/StudentLayout";
import { useStudent } from "@/context/StudentContext";
import { Gym } from "@/lib/fitfinder-data";

export default function StudentSavedPage() {
  const { savedIds } = useStudent();
  const [gymList, setGymList] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGyms() {
      try {
        const res = await fetch("/api/gyms");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setGymList(json.data);
        }
      } catch (err) {
        console.error("Failed to load gyms:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGyms();
  }, []);

  const savedGyms = gymList.filter((gym) => savedIds.includes(gym.id));

  return (
    <StudentLayout>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-28 md:pb-16">
        <div className="mb-6 border-b border-[#efeded] pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-700">MY COLLECTION</p>
          <h1 className="mt-1 text-3xl font-black text-[#171717] sm:text-4xl">
            Saved Gyms <span className="text-lg font-medium text-gray-400 tabular-nums">({savedGyms.length})</span>
          </h1>
          <p className="mt-1 text-sm text-[#737373]">Gym yang kamu simpan untuk dibandingkan nanti.</p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 animate-pulse rounded-xl bg-gray-200/60 p-4 border border-[#e5e5e0]" />
            ))}
          </div>
        ) : savedGyms.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedGyms.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-[#dedcdb] bg-white p-12 text-center">
            <p className="text-base font-bold text-[#171717]">Belum ada gym tersimpan.</p>
            <p className="mt-1 text-xs text-[#737373]">Klik ikon bookmark pada kartu gym untuk menyimpannya.</p>
            <Link
              href="/student/home"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#2c2c2c]"
            >
              Explore gyms
            </Link>
          </div>
        )}
      </main>
    </StudentLayout>
  );
}
