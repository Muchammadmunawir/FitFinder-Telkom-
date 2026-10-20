"use client";

import Link from "next/link";
import { GymCard } from "@/components/student/GymCard";
import { StudentLayout } from "@/components/student/StudentLayout";
import { useStudent } from "@/context/StudentContext";
import { gyms } from "@/lib/fitfinder-data";

export default function StudentSavedPage() {
  const { savedIds } = useStudent();
  const savedGyms = gyms.filter((gym) => savedIds.includes(gym.id));

  return <StudentLayout><main className="mx-auto max-w-6xl px-5 pb-28 pt-6 sm:px-8"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-600">MY COLLECTION</p><h1 className="mt-1 text-3xl font-black">Saved Gyms <span className="text-lg font-medium text-gray-400">({savedGyms.length})</span></h1><p className="mt-2 text-sm text-gray-500">Gym yang kamu simpan untuk dibandingkan nanti.</p>{savedGyms.length > 0 ? <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{savedGyms.map((gym) => <GymCard key={gym.id} gym={gym} />)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center"><p className="text-sm font-semibold">Belum ada gym tersimpan.</p><p className="mt-2 text-xs text-gray-500">Klik ikon bookmark pada kartu gym untuk menyimpannya.</p><Link href="/student/home" className="mt-5 inline-flex rounded-xl bg-black px-4 py-3 text-xs font-semibold text-white">Explore gyms</Link></div>}</main></StudentLayout>;
}
