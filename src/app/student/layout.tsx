import type { ReactNode } from "react";
import { StudentProvider } from "@/context/StudentContext";

export default function StudentRouteLayout({ children }: { children: ReactNode }) {
  return <StudentProvider>{children}</StudentProvider>;
}
