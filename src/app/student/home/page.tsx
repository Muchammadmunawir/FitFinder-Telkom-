"use client";

import { useEffect, useState, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { locations, Gym } from "@/lib/fitfinder-data";
import { GymCard } from "@/components/student/GymCard";
import { SearchFilterBar, type StudentFilter } from "@/components/student/SearchFilterBar";
import { StudentLayout } from "@/components/student/StudentLayout";
export default function StudentHomePage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("ALL");
  const [activeFilters, setActiveFilters] = useState<StudentFilter[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gymList, setGymList] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEmptyStateAlternative, setIsEmptyStateAlternative] = useState(false);

  // Fetch gyms from live PostgreSQL API with filters
  const fetchGyms = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (location !== "ALL") params.set("location", location);

      const requestedEquipments: string[] = [];
      const requestedFacilities: string[] = [];

      if (activeFilters.includes("rack")) requestedEquipments.push("Power Racks");
      if (activeFilters.includes("ac")) requestedFacilities.push("AC");
      if (activeFilters.includes("parking")) requestedFacilities.push("Motor Area");
      if (activeFilters.includes("under150")) {
        params.set("maxBudget", "150000");
        params.set("budgetType", "monthly");
      }

      if (requestedEquipments.length > 0) {
        params.set("equipments", requestedEquipments.join(","));
      }
      if (requestedFacilities.length > 0) {
        params.set("facilities", requestedFacilities.join(","));
      }

      const res = await fetch(`/api/gyms?${params.toString()}`);
      const json = await res.json();

      if (json.success && Array.isArray(json.data)) {
        setGymList(json.data);
        setIsEmptyStateAlternative(Boolean(json.isEmptyStateAlternative));
      }
    } catch (error) {
      console.error("Failed to load gyms from API:", error);
    } finally {
      setLoading(false);
    }
  }, [activeFilters, location, query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGyms();
    }, 150);
    return () => clearTimeout(timer);
  }, [fetchGyms]);

  const toggleFilter = (filter: StudentFilter) =>
    setActiveFilters((filters) =>
      filters.includes(filter) ? filters.filter((item) => item !== filter) : [...filters, filter]
    );

  return (
    <StudentLayout>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-28 md:pb-16">
        {/* Desktop Web Hero Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
            Find your fit.
          </h1>
          <p className="mt-1 text-sm text-[#737373]">
            Cari dan bandingkan gym terbaik di sekitar kawasan kampus Telkom University.
          </p>
        </div>

        {/* Desktop Search & Filter Toolbar */}
        <SearchFilterBar
          query={query}
          location={location}
          locations={locations}
          activeFilters={activeFilters}
          onQueryChange={setQuery}
          onLocationChange={setLocation}
          onFilterChange={toggleFilter}
          onFilterClick={() => setFiltersOpen(!filtersOpen)}
        />

        {filtersOpen && (
          <div className="my-5 rounded-xl border border-[#e5e5e0] bg-white p-5 text-sm">
            <div className="flex items-center justify-between">
              <strong className="text-[#171717] font-bold">Smart filters aktif (PostgreSQL Live)</strong>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close filters"
                className="grid h-7 w-7 place-items-center rounded-md hover:bg-gray-100"
              >
                <Icon name="x" size={16} />
              </button>
            </div>
            <p className="mt-1 text-xs text-[#737373]">
              Pencarian terhubung langsung ke database PostgreSQL dengan formula Match Score IMPAL.
            </p>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveFilters([])}
                className="mt-3 text-xs font-bold text-red-600 hover:underline"
              >
                Reset filter chips
              </button>
            )}
          </div>
        )}

        {/* SKPL-F-06: Empty State Handling Notification */}
        {isEmptyStateAlternative && (
          <div className="my-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
            <div className="flex items-center gap-2 font-bold">
              <Icon name="spark" size={16} className="text-amber-600" />
              <span>Rekomendasi Alternatif Terdekat (SKPL-F-06)</span>
            </div>
            <p className="mt-1 leading-relaxed">
              Tidak ada gym yang memenuhi 100% kriteria filter yang Anda pilih. Sistem menyajikan alternatif gym dengan
              skor kecocokan terdekat.
            </p>
          </div>
        )}

        {/* Section Header: Discovery Count & Auto-Rank Badge */}
        <div className="mb-4 mt-8 flex flex-wrap items-end justify-between gap-2 border-b border-[#efeded] pb-3">
          <div>
            <p className="text-xl font-black text-[#171717]">
              Curated for You{" "}
              <span className="text-sm font-semibold text-gray-400 tabular-nums">
                ({loading ? "memuat..." : `${gymList.length} locations`})
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-md bg-[#171717] px-2.5 py-1 text-[10px] font-extrabold text-[#c8f169]">
              AUTO-RANKED <Icon name="spark" size={12} />
            </span>
          </div>
        </div>

        {/* Active Filter Tags */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {activeFilters.length === 0 && <Badge>Semua preferensi</Badge>}
          {activeFilters.length > 0 &&
            activeFilters.map((filter) => (
              <Badge key={filter} variant="lime">
                Filter: {filter}
              </Badge>
            ))}
        </div>

        {/* Desktop Responsive Gym Grid (3 columns on lg, 2 columns on sm) */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 animate-pulse rounded-xl bg-gray-200/60 p-4 border border-[#e5e5e0]" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gymList.map((gym) => (
              <GymCard key={gym.id} gym={gym} />
            ))}
          </div>
        )}

        {!loading && gymList.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-[#737373]">
            <Icon name="search" size={28} className="mx-auto mb-2 text-gray-400" />
            <p className="font-semibold text-[#171717]">Tidak ada gym yang cocok dengan pencarian dan filter ini.</p>
            <p className="mt-1 text-xs text-gray-400">Coba ubah kata kunci atau reset filter untuk melihat opsi lainnya.</p>
          </div>
        )}
      </main>
    </StudentLayout>
  );
}
