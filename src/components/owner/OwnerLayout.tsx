import type { ReactNode } from "react";
import { AppHeader } from "@/components/ui/AppHeader";
import { BottomNav } from "@/components/ui/BottomNav";

export function OwnerLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f8f9fa] text-[#111]"><AppHeader role="owner" />{children}<BottomNav role="owner" /></div>;
}
