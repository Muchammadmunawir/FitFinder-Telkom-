import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export type StudentFilter = "under150" | "rack" | "ac" | "parking";

const filterChips: { key: StudentFilter; label: string }[] = [
  { key: "under150", label: "< Rp 150k" },
  { key: "rack", label: "Squat / Power Rack" },
  { key: "ac", label: "AC" },
  { key: "parking", label: "Parking" },
];

export function SearchFilterBar({
  query,
  location,
  locations,
  activeFilters,
  onQueryChange,
  onLocationChange,
  onFilterChange,
  onFilterClick,
}: {
  query: string;
  location: string;
  locations: string[];
  activeFilters: StudentFilter[];
  onQueryChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onFilterChange: (filter: StudentFilter) => void;
  onFilterClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-[#e5e5e0] bg-white p-4 sm:p-5">
      {/* Top Meta Strip: Telkom Campus Boundary & Description */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#efeded] pb-3">
        <div className="flex items-center gap-2">
          <Badge variant="dark">
            <Icon name="map-pin" size={12} className="text-[#c8f169]" /> TEL-U CAMPUS <Icon name="chevron-down" size={12} />
          </Badge>
          <Badge>
            <Icon name="map-pin" size={12} /> Radius 2.5 km <Icon name="chevron-down" size={12} />
          </Badge>
        </div>
        <p className="text-xs font-medium text-[#737373]">
          Cari & bandingkan gym sekitar kampus.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="relative mb-4">
        <Icon
          name="search"
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari gym, squat rack, AC..."
          aria-label="Cari gym atau fasilitas"
          className="w-full rounded-lg border border-[#e5e5e0] bg-[#fbf9f9] py-3.5 pl-11 pr-12 text-sm text-[#171717] outline-none transition placeholder:text-gray-400 focus:border-[#171717] focus:bg-white"
        />
        <button
          type="button"
          onClick={onFilterClick}
          aria-label="Open filters"
          className="absolute right-2.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md bg-white border border-[#e5e5e0] text-gray-600 transition hover:bg-[#171717] hover:text-white"
        >
          <Icon name="sliders" size={16} />
        </button>
      </div>

      {/* Filters Row: Location Zone Buttons & Quick Filter Chips */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between pt-1">
        {/* Location Zone Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="hidden text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1 sm:inline">
            Zona:
          </span>
          {locations.map((item) => {
            const isSelected = location === item;
            return (
              <button
                type="button"
                key={item}
                onClick={() => onLocationChange(item)}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-bold transition ${
                  isSelected
                    ? "bg-[#171717] text-white"
                    : "border border-[#e5e5e0] bg-white text-[#737373] hover:border-[#171717] hover:text-[#171717]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Quick Criteria Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="hidden text-[10px] font-bold uppercase tracking-wider text-gray-400 mr-1 xl:inline">
            Kriteria:
          </span>
          {filterChips.map((filter) => {
            const isActive = activeFilters.includes(filter.key);
            return (
              <button
                type="button"
                key={filter.key}
                onClick={() => onFilterChange(filter.key)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "border border-[#171717] bg-[#171717] text-[#c8f169]"
                    : "border border-[#e5e5e0] bg-white text-[#737373] hover:border-gray-400 hover:text-[#171717]"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
