import Link from "next/link";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { StatsCard } from "@/components/owner/StatsCard";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export default function OwnerDashboardPage() {
  return (
    <OwnerLayout>
      <main className="mx-auto max-w-6xl px-5 pb-28 pt-6 sm:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-600">PORTAL MITRA</p>
            <h1 className="mt-1 text-3xl font-black">Owner Dashboard</h1>
            <p className="mt-2 text-sm text-gray-500">Pantau status gym dan statistik utama kamu.</p>
          </div>
          <span className="hidden rounded-full bg-lime-50 px-3 py-2 text-[10px] font-bold text-lime-700 sm:block">ACTIVE & LISTED</span>
        </div>

        <Card className="mb-5 flex flex-wrap items-center justify-between gap-4 bg-lime-50 p-4">
          <div>
            <h2 className="text-lg font-black">Titan Power Sukabirus</h2>
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <Icon name="map-pin" size={13} /> Sukabirus • Verified Partner ID FTP-40257
            </p>
          </div>
          <Link href="/owner/profile-edit" className="flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-xs font-semibold text-white">
            Edit Gym <Icon name="arrow-right" size={15} />
          </Link>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3">
          <StatsCard label="Today Views" value="342" note="+14% from last month" icon={<Icon name="eye" size={19} />} />
          <StatsCard label="KTM Check-ins" value="28" note="+8% conversion" icon={<Icon name="users" size={19} />} />
          <StatsCard label="Search Match" value="98%" note="Top 5% around Tel-U" icon={<Icon name="spark" size={19} />} accent />
        </div>

        <Card className="mt-5 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Quick Actions</h2>
              <p className="mt-1 text-xs text-gray-500">Update data yang paling berpengaruh ke ranking.</p>
            </div>
            <Icon name="sliders" size={20} />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link href="/owner/profile-edit" className="rounded-xl bg-[#f4f2f2] p-4 text-sm font-semibold">
              Pricing & KTM Discount
              <span className="mt-2 block text-xs font-normal text-gray-500">Edit harga student dan diskon KTM</span>
            </Link>
            <Link href="/owner/profile-edit" className="rounded-xl bg-[#f4f2f2] p-4 text-sm font-semibold">
              Equipment Inventory
              <span className="mt-2 block text-xs font-normal text-gray-500">Edit peralatan gym</span>
            </Link>
          </div>
        </Card>
      </main>
    </OwnerLayout>
  );
}
