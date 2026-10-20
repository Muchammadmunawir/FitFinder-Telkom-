import Link from "next/link";
import { Icon } from "./Icon";

export function AppHeader({ role }: { role: "student" | "owner" }) {
  const profileHref = role === "student" ? "/student/profile" : "/owner/profile";
  return (
    <header className="sticky top-0 z-30 border-b border-[#e8e8e8] bg-[#fbfafa]/95 px-5 py-3 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href={role === "student" ? "/student/home" : "/owner/dashboard"} className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-black text-lg font-black text-lime-400 shadow-sm">F</div>
          <div className="leading-none"><div className="text-sm font-black tracking-tight">FITFINDER<span className="ml-0.5 align-top text-[7px] text-gray-400">TLU</span></div><div className="mt-1 text-[9px] font-medium tracking-wide text-gray-500">Telkom University Gym Pass</div></div>
        </Link>
        <div className="flex items-center gap-2"><button type="button" aria-label="Settings" className="rounded-full p-2 text-gray-600 hover:bg-gray-100"><Icon name="sliders" size={19} /></button><Link href={profileHref} className="grid h-9 w-9 place-items-center rounded-full bg-[#d8b08c] text-xs font-bold text-white">{role === "owner" ? "TO" : "AP"}</Link></div>
      </div>
    </header>
  );
}
