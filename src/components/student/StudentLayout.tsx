import type { ReactNode } from "react";
import { AppHeader } from "@/components/ui/AppHeader";
import { BottomNav } from "@/components/ui/BottomNav";

export function StudentLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f8f9fa] text-[#111]"><AppHeader role="student" />{children}<BottomNav role="student" /></div>;
}
