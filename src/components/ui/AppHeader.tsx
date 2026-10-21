"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";

type NavLink = {
  href: string;
  label: string;
  icon: IconName;
};

const studentNavLinks: NavLink[] = [
  { href: "/student/home", label: "Discover", icon: "search" },
  { href: "/student/saved", label: "Saved", icon: "bookmark" },
  { href: "/student/compare", label: "Compare", icon: "swap" },
  { href: "/student/profile", label: "Profile", icon: "profile" },
];

const ownerNavLinks: NavLink[] = [
  { href: "/owner/dashboard", label: "Dashboard", icon: "grid" },
  { href: "/owner/profile-edit", label: "Edit Gym", icon: "edit" },
  { href: "/owner/analytics", label: "Analytics", icon: "spark" },
  { href: "/owner/profile", label: "Profile", icon: "profile" },
];

export function AppHeader({ role }: { role: "student" | "owner" }) {
  const pathname = usePathname();
  const navLinks = role === "student" ? studentNavLinks : ownerNavLinks;
  const profileHref = role === "student" ? "/student/profile" : "/owner/profile";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#e5e5e0] bg-white/95 px-4 backdrop-blur-none sm:px-8">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link
            href={role === "student" ? "/student/home" : "/owner/dashboard"}
            className="group flex items-center gap-3 transition"
          >
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#171717] text-xl font-black text-[#c8f169] transition group-hover:scale-105">
              F
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 text-base font-extrabold tracking-tight text-[#171717]">
                <span>FITFINDER</span>
                <span className="rounded bg-[#171717] px-1.5 py-0.5 text-[9px] font-black text-[#c8f169]">
                  TLU
                </span>
              </div>
              <p className="text-[10px] font-medium text-[#737373]">
                Telkom University Gym Pass
              </p>
            </div>
          </Link>

          {/* Desktop Web Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Desktop primary navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/student/home" &&
                  link.href !== "/owner/dashboard" &&
                  pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                    isActive
                      ? "bg-[#171717] text-white"
                      : "text-[#737373] hover:bg-[#f5f3f3] hover:text-[#171717]"
                  }`}
                >
                  <Icon
                    name={link.icon}
                    size={16}
                    className={isActive ? "text-[#c8f169]" : "text-gray-400"}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Utility: Settings & profile avatar */}
        <div className="flex items-center gap-3">

          <button
            type="button"
            aria-label="Settings"
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#e5e5e0] bg-white text-gray-600 transition hover:bg-[#f5f3f3] hover:text-[#171717]"
          >
            <Icon name="sliders" size={17} />
          </button>

          <Link
            href={profileHref}
            className="flex items-center gap-2 rounded-lg border border-[#e5e5e0] bg-white p-1 pl-1 pr-2.5 transition hover:border-[#171717]"
            title="Open Profile"
          >
            <div className="grid h-8 w-8 place-items-center rounded-md bg-[#171717] text-xs font-black text-white">
              {role === "owner" ? "TO" : "AP"}
            </div>
            <span className="hidden text-xs font-bold text-[#171717] sm:inline">
              {role === "owner" ? "Taufik H." : "Arya P."}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
