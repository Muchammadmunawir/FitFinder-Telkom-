"use client";

import Image from "next/image";
import Link from "next/link";
import type { Gym } from "@/lib/fitfinder-data";
import { useStudent } from "@/context/StudentContext";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";

export function GymCard({ gym }: { gym: Gym }) {
  const { savedIds, toggleSaved } = useStudent();
  const saved = savedIds.includes(gym.id);

  return (
    <article className="overflow-hidden rounded-xl border border-[#e5e5e0] bg-white transition">
      <div className="relative h-48 sm:h-56 overflow-hidden bg-[#efeded]">
        {gym.image ? (
          <Image
            src={gym.image}
            alt={gym.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-[#f5f3f3] text-xs text-gray-400">
            No image available
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />

        {/* Bookmark button */}
        <button
          type="button"
          aria-label={saved ? `Remove ${gym.name} from saved gyms` : `Save ${gym.name}`}
          aria-pressed={saved}
          onClick={() => toggleSaved(gym.id)}
          className={`absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-white/95 transition ${
            saved ? "text-lime-700" : "text-gray-700 hover:text-black"
          }`}
        >
          <Icon name="bookmark" size={16} className={saved ? "fill-current" : ""} />
        </button>

        {/* Match Score Badge */}
        <span className="absolute right-3 top-3 rounded-md bg-[#171717] px-2.5 py-1 text-[10px] font-extrabold text-[#c8f169] tracking-tight tabular-nums">
          {gym.match}% MATCH
        </span>

        {gym.accent && (
          <span className="absolute bottom-3 left-3 rounded-md bg-[#171717]/85 px-2.5 py-1 text-[10px] font-semibold text-white">
            {gym.accent}
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[#171717]">{gym.name}</h2>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-500">
              <Icon name="map-pin" size={12} className="shrink-0" />
              <span>{gym.location}</span>
              <span>•</span>
              <span className="tabular-nums">{gym.distance}</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1 text-xs font-semibold tabular-nums text-[#171717]">
            <Icon name="star" size={14} className="text-lime-600" />
            <span>{gym.rating}</span>
            <span className="text-gray-400 font-normal">({gym.reviews})</span>
          </div>
        </div>

        {/* Pricing Strip with Tabular Numerics */}
        <div className="grid grid-cols-2 gap-3 border-y border-[#efeded] py-3 text-[10px]">
          <div>
            <div className="uppercase tracking-wider text-[9px] font-bold text-gray-500">Daily Pass</div>
            <strong className="text-xs font-bold text-[#171717] tabular-nums">{gym.daily}</strong>
            <span className="text-gray-500"> / day</span>
          </div>
          <div className="text-right">
            <div className="uppercase tracking-wider text-[9px] font-bold text-gray-500">Student Monthly</div>
            <strong className="text-xs font-bold text-[#171717] tabular-nums">{gym.monthly}</strong>
            <span className="text-gray-500"> / mo</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {gym.tags.map((tag) => (
            <Badge key={tag}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* Supporting Facilities */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-500">
          {gym.facilities.map((item) => (
            <span key={item} className="inline-flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-gray-300" />
              {item}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          href={`/student/gym/${gym.id}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] py-3 text-sm font-bold text-white transition hover:bg-[#2b2b2b]"
        >
          <span>View Details</span>
          <Icon name="arrow-right" size={16} />
        </Link>
      </div>
    </article>
  );
}
