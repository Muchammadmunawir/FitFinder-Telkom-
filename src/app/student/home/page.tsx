"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { gyms, locations } from "@/lib/fitfinder-data";
import { GymCard } from "@/components/student/GymCard";
import { SearchFilterBar, type StudentFilter } from "@/components/student/SearchFilterBar";
import { StudentLayout } from "@/components/student/StudentLayout";

function matchesFilter(gym: (typeof gyms)[number], filter: StudentFilter) {
  const monthlyPrice = Number(gym.monthly.replace(/\D/g, ""));
  if (filter === "under150") return monthlyPrice < 150000;
  if (filter === "rack") return gym.tags.some((tag) => /rack|squat/i.test(tag));
  if (filter === "ac") return gym.facilities.some((item) => /ac|air conditioning/i.test(item));
  return gym.facilities.some((item) => /parking|motor/i.test(item));
}

export default function StudentHomePage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("ALL");
  const [activeFilters, setActiveFilters] = useState<StudentFilter[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filteredGyms = useMemo(() => gyms.filter((gym) => {
    const locationMatch = location === "ALL" || gym.location.toUpperCase() === location;
    const searchableText = `${gym.name} ${gym.location} ${gym.tags.join(" ")} ${gym.facilities.join(" ")}`.toLowerCase();
    const searchMatch = searchableText.includes(query.toLowerCase());
    const filterMatch = activeFilters.every((filter) => matchesFilter(gym, filter));
    return locationMatch && searchMatch && filterMatch;
  }), [activeFilters, location, query]);

  const toggleFilter = (filter: StudentFilter) => setActiveFilters((filters) => filters.includes(filter) ? filters.filter((item) => item !== filter) : [...filters, filter]);

  return <StudentLayout><main className="mx-auto max-w-6xl px-5 pb-28 pt-6 sm:px-8"><div className="mb-6 flex items-end justify-between"><div><p className="text-sm text-gray-500">Halo, <span className="font-semibold text-[#111]">Arya</span> 👋</p><h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Find your fit.</h1></div><span className="hidden text-[10px] font-bold text-lime-600 sm:block">STUDENT PASS ACTIVE</span></div><SearchFilterBar query={query} location={location} locations={locations} activeFilters={activeFilters} onQueryChange={setQuery} onLocationChange={setLocation} onFilterChange={toggleFilter} onFilterClick={() => setFiltersOpen(!filtersOpen)} />{filtersOpen && <div className="my-5 rounded-2xl border border-[#e5e2e1] bg-white p-4 text-sm shadow-sm"><div className="flex items-center justify-between"><strong>Smart filters aktif</strong><button type="button" onClick={() => setFiltersOpen(false)}><Icon name="x" size={18} /></button></div><p className="mt-2 text-xs text-gray-500">Search mencakup nama gym, equipment, dan fasilitas. Pilih beberapa chip untuk mempersempit hasil.</p>{activeFilters.length > 0 && <button type="button" onClick={() => setActiveFilters([])} className="mt-3 text-xs font-bold text-red-600 underline">Reset filter chips</button>}</div>}<div className="mb-4 mt-7 flex items-end justify-between"><p className="text-xl font-black">Curated for You <span className="text-sm font-normal text-gray-400">({filteredGyms.length} locations)</span></p><span className="flex items-center gap-1 text-[10px] font-bold text-lime-600">AUTO-RANKED <Icon name="spark" size={13} /></span></div><div className="mb-5 flex flex-wrap gap-2">{activeFilters.length === 0 && <Badge>Semua preferensi</Badge>}{activeFilters.length > 0 && activeFilters.map((filter) => <Badge key={filter} variant="lime">Filter aktif</Badge>)}</div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{filteredGyms.map((gym) => <GymCard key={gym.id} gym={gym} />)}</div>{filteredGyms.length === 0 && <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">Tidak ada gym yang cocok dengan pencarian dan filter ini.</div>}</main></StudentLayout>;
}
