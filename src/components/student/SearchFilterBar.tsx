import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export type StudentFilter = "under150" | "rack" | "ac" | "parking";

const filterChips: { key: StudentFilter; label: string }[] = [
  { key: "under150", label: "< Rp 150k" },
  { key: "rack", label: "Squat / Power Rack" },
  { key: "ac", label: "AC" },
  { key: "parking", label: "Parking" },
];

export function SearchFilterBar({ query, location, locations, activeFilters, onQueryChange, onLocationChange, onFilterChange, onFilterClick }: { query: string; location: string; locations: string[]; activeFilters: StudentFilter[]; onQueryChange: (value: string) => void; onLocationChange: (value: string) => void; onFilterChange: (filter: StudentFilter) => void; onFilterClick: () => void }) {
  return <><div className="mb-4 flex gap-2 overflow-x-auto pb-1"><Badge variant="dark"><span className="text-lime-400">▣</span> TEL-U CAMPUS <Icon name="chevron-down" size={12} /></Badge><Badge><Icon name="map-pin" size={12} /> Radius 2.5 km <Icon name="chevron-down" size={12} /></Badge></div><p className="mb-4 text-xs text-gray-500">Cari & bandingkan gym sekitar kampus.</p><div className="relative mb-4"><Icon name="search" size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Cari gym, squat rack, AC..." aria-label="Cari gym atau fasilitas" className="w-full rounded-xl border border-[#e0dede] bg-white py-3.5 pl-11 pr-12 text-sm outline-none focus:border-black" /><button type="button" onClick={onFilterClick} aria-label="Open filters" className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg bg-[#f2f0f0]"><Icon name="sliders" size={17} /></button></div><div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1">{locations.map((item) => <button type="button" key={item} onClick={() => onLocationChange(item)} className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-semibold ${location === item ? "border-black bg-black text-white" : "border-[#e2e0df] bg-white text-gray-600"}`}>{item}</button>)}</div><div className="flex flex-wrap gap-2">{filterChips.map((filter) => <button type="button" key={filter.key} onClick={() => onFilterChange(filter.key)} className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold transition ${activeFilters.includes(filter.key) ? "border-lime-600 bg-lime-100 text-lime-800" : "border-[#e2e0df] bg-white text-gray-600"}`}>◉ {filter.label}</button>)}</div></>;
}
