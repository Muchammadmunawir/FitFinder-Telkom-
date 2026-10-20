import type { ReactNode } from "react";

type IconName =
  | "arrow-left" | "arrow-right" | "bookmark" | "building" | "check" | "chevron-down"
  | "clock" | "cloud" | "edit" | "eye" | "filter" | "grid" | "graduation-cap" | "id-card" | "lock" | "mail" | "map-pin"
  | "more" | "phone" | "plus" | "profile" | "search" | "sliders" | "spark" | "star" | "swap"
  | "upload" | "user" | "users" | "wifi" | "x";

type Props = { name: IconName; size?: number; className?: string };

export function Icon({ name, size = 20, className = "" }: Props) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className, "aria-hidden": true };
  const paths: Record<IconName, ReactNode> = {
    "arrow-left": <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    "arrow-right": <><path d="M5 12h14" /><path d="m13 5 7 7-7 7" /></>,
    bookmark: <><path d="M6 4.5A2.5 2.5 0 0 1 8.5 2h7A2.5 2.5 0 0 1 18 4.5V21l-6-3-6 3Z" /></>,
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" /><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01" /><path d="M9 21v-4h6v4" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    "chevron-down": <><path d="m6 9 6 6 6-6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    cloud: <><path d="M7 18h10a4 4 0 0 0 .5-8A5.5 5.5 0 0 0 7 9.5 4.25 4.25 0 0 0 7 18Z" /></>,
    edit: <><path d="m4 16.5-.7 3.7 3.7-.7L18.5 8a2.5 2.5 0 0 0-3.5-3.5Z" /><path d="m14 6 4 4" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    filter: <><path d="M4 6h16M7 12h10M10 18h4" /><circle cx="7" cy="6" r="2" /><circle cx="17" cy="12" r="2" /><circle cx="12" cy="18" r="2" /></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
    "graduation-cap": <><path d="m3 9 9-4 9 4-9 4-9-4Z" /><path d="M7 11v4c2.8 2 7.2 2 10 0v-4" /><path d="M21 10v5" /></>,
    "id-card": <><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="8" cy="11" r="2" /><path d="M12 10h5M12 14h5" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
    "map-pin": <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
    phone: <><path d="M5 4h3l1.5 4-2 1.5a14 14 0 0 0 7 7l1.5-2 4 1.5v3a2 2 0 0 1-2 2C10.8 21 3 13.2 3 5a2 2 0 0 1 2-2Z" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    profile: <><circle cx="12" cy="8" r="3.5" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 5 5" /></>,
    sliders: <><path d="M4 6h16M7 12h10M10 18h4" /><circle cx="7" cy="6" r="2" /><circle cx="17" cy="12" r="2" /><circle cx="12" cy="18" r="2" /></>,
    spark: <><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7Z" /></>,
    star: <path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9Z" fill="currentColor" stroke="none" />,
    swap: <><path d="M7 7h13l-3-3M17 17H4l3 3" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5M5 20h14" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    users: <><path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" /><circle cx="10" cy="7" r="3" /><path d="M20 19v-1a4 4 0 0 0-3-3.8M16 4.2a4 4 0 0 1 0 7.6" /></>,
    wifi: <><path d="M2.5 9.5a15 15 0 0 1 19 0M5.5 13.5a10 10 0 0 1 13 0M9 17.5a5 5 0 0 1 6 0M12 21h.01" /></>,
    x: <><path d="m5 5 14 14M19 5 5 19" /></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
}

export type { IconName };
