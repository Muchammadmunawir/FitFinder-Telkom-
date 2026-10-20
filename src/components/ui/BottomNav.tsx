"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";

type Role = "student" | "owner";

const studentItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/student/home", label: "DISCOVER", icon: "search" },
  { href: "/student/saved", label: "SAVED", icon: "bookmark" },
  { href: "/student/compare", label: "COMPARE", icon: "swap" },
  { href: "/student/profile", label: "PROFILE", icon: "profile" },
];

const ownerItems: { href: string; label: string; icon: IconName }[] = [
  { href: "/owner/dashboard", label: "DASHBOARD", icon: "grid" },
  { href: "/owner/profile-edit", label: "EDIT GYM", icon: "edit" },
  { href: "/owner/profile", label: "PROFILE", icon: "profile" },
];

export function BottomNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = role === "student" ? studentItems : ownerItems;
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e7e5e5] bg-[#fbfafa]/95 px-4 pb-[max(10px,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
      <div className={`mx-auto grid max-w-lg ${role === "owner" ? "grid-cols-3" : "grid-cols-4"}`}>
        {items.map((item) => {
          const active = pathname === item.href || (role === "student" && item.href !== "/student/home" && pathname.startsWith(item.href));
          return <Link key={`${item.href}-${item.label}`} href={item.href} className={`flex flex-col items-center gap-1 text-[9px] font-semibold tracking-wide transition ${active ? "text-black" : "text-gray-400"}`}><Icon name={item.icon} size={20} /><span>{item.label}</span>{active && <span className="h-1 w-1 rounded-full bg-lime-500" />}</Link>;
        })}
      </div>
    </nav>
  );
}

