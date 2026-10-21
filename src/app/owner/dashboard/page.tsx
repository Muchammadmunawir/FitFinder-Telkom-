"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { StatsCard } from "@/components/owner/StatsCard";
import { Icon } from "@/components/ui/Icon";

type GymData = {
  id: number;
  name: string;
  locationZone: string;
  dailyPrice: string;
  monthlyPrice: string;
  equipments: Array<{ id: number }>;
  facilities: Array<{ id: number }>;
};

export default function OwnerDashboardPage() {
  const [gym, setGym] = useState<GymData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOwnerGym() {
      try {
        const res = await fetch("/api/owner/gym");
        const json = await res.json();
        if (json.success && json.data) {
          setGym(json.data);
        }
      } catch (err) {
        console.error("Failed to load owner gym:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOwnerGym();
  }, []);

  const gymName = gym?.name || "Titan Power Sukabirus";
  const gymLocation = gym?.locationZone || "Sukabirus";

  return (
    <OwnerLayout>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-28 md:pb-16">
        {/* Desktop Header */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end border-b border-[#efeded] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#c8f169]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-700">PORTAL MITRA RESMI</p>
            </div>
            <h1 className="mt-1 text-3xl font-black text-[#171717] sm:text-4xl">Owner Dashboard</h1>
            <p className="mt-1 text-sm text-[#737373]">Pantau status gym dan statistik utama kamu di lingkungan Telkom University.</p>
          </div>
          <span className="rounded-lg border border-[#e5e5e0] bg-white px-3.5 py-2 text-xs font-bold text-[#171717]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#c8f169] mr-1.5" /> ACTIVE & LISTED (POSTGRESQL)
          </span>
        </div>

        {/* Gym Status Highlight Card */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e5e5e0] bg-white p-5 sm:p-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#171717] px-2 py-0.5 text-[9px] font-black text-[#c8f169]">
                VERIFIED PARTNER
              </span>
              <span className="text-xs text-gray-400 font-mono">ID: FTP-40257</span>
            </div>
            <h2 className="mt-1.5 text-2xl font-black text-[#171717]">{loading ? "Memuat..." : gymName}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-[#737373]">
              <Icon name="map-pin" size={13} className="text-gray-400" />
              <span>Zona: <strong>{gymLocation}</strong></span>
              <span>•</span>
              <span>Sinkronisasi database PostgreSQL aktif</span>
            </p>
          </div>
          <Link
            href="/owner/profile-edit"
            className="flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#2c2c2c]"
          >
            Edit Gym <Icon name="arrow-right" size={15} className="text-[#c8f169]" />
          </Link>
        </div>

        {/* 3-Column Telemetry Metrics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatsCard label="Today Views" value="342" note="+14% from last month" icon={<Icon name="eye" size={19} />} />
          <StatsCard label="KTM Check-ins" value="28" note="+8% conversion" icon={<Icon name="users" size={19} />} />
          <StatsCard label="Search Match" value="98%" note="Top 5% around Tel-U" icon={<Icon name="spark" size={19} />} accent />
        </div>

        {/* Quick Actions & Live Operations Grid */}
        <div className="mt-6 rounded-xl border border-[#e5e5e0] bg-white p-6">
          <div className="flex items-center justify-between border-b border-[#efeded] pb-4">
            <div>
              <h2 className="text-base font-bold text-[#171717]">Quick Actions</h2>
              <p className="mt-0.5 text-xs text-[#737373]">Update data yang paling berpengaruh ke ranking pencarian mahasiswa.</p>
            </div>
            <Icon name="sliders" size={20} className="text-gray-400" />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Link
              href="/owner/profile-edit"
              className="group rounded-lg border border-[#e5e5e0] bg-[#fbf9f9] p-5 transition hover:border-[#171717] hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#171717]">Pricing & KTM Discount</span>
                <Icon name="arrow-right" size={16} className="text-gray-400 group-hover:text-[#171717] transition" />
              </div>
              <span className="mt-2 block text-xs text-[#737373]">
                Edit harga student pass harian, bulanan, dan kebijakan diskon KTM Telkom.
              </span>
            </Link>

            <Link
              href="/owner/profile-edit"
              className="group rounded-lg border border-[#e5e5e0] bg-[#fbf9f9] p-5 transition hover:border-[#171717] hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#171717]">
                  Equipment Inventory ({gym?.equipments?.length ?? 3} alat terpasang)
                </span>
                <Icon name="arrow-right" size={16} className="text-gray-400 group-hover:text-[#171717] transition" />
              </div>
              <span className="mt-2 block text-xs text-[#737373]">
                Kelola inventaris alat latihan yang memengaruhi 50% Match Score mahasiswa.
              </span>
            </Link>
          </div>
        </div>
      </main>
    </OwnerLayout>
  );
}
