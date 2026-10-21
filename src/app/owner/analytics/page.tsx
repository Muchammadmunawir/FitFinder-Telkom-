import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { StatsCard } from "@/components/owner/StatsCard";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export default function OwnerAnalyticsPage() {
  return (
    <OwnerLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#E5E5E0] pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4d6700]">
                PERFORMANCE CENTER • TELKOM FITNESS
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-[11px] font-semibold text-gray-500">Telemetry & Traffic</span>
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
              Partner Gym Analytics
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Analisis impresi pencarian, kunjungan profil, dan konversi KTM Telkom untuk Titan Power Sukabirus.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C8F169] bg-[#C8F169]/20 px-3.5 py-1.5 text-xs font-bold text-[#394d00]">
              <span className="h-2 w-2 rounded-full bg-[#4d6700]" />
              LIVE TELEMETRY
            </span>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StatsCard
            label="Profile Views"
            value="1,420"
            note="Bulan ini • +14% dari mahasiswa"
            icon={<Icon name="eye" size={20} />}
          />
          <StatsCard
            label="KTM Check-ins"
            value="128"
            note="Bulan ini • +8% member baru"
            icon={<Icon name="users" size={20} />}
          />
          <StatsCard
            label="Search Match"
            value="98%"
            note="Top 5% gym terpopuler di kampus"
            icon={<Icon name="spark" size={20} />}
            accent
          />
        </div>

        {/* 30-Day Activity Chart Card */}
        <Card className="mt-6 border border-[#E5E5E0] bg-white p-6 shadow-none">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-base font-bold text-[#171717]">Views & Check-ins Trajectory</h2>
              <p className="text-xs text-gray-500">Frekuensi interaksi mahasiswa dalam 30 hari terakhir</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#E5E5E0] bg-[#F5F3F3] px-3 py-1.5 text-xs font-semibold text-gray-700">
              Last 30 days <Icon name="chevron-down" size={13} />
            </span>
          </div>

          <div className="mt-8 flex h-60 items-end gap-2 border-b border-l border-[#E5E5E0] px-2 pb-2 sm:gap-3">
            {[32, 44, 38, 50, 62, 48, 72, 65, 81, 76, 93, 87, 98].map((height, index) => (
              <div key={index} className="group flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-[10px] font-bold tabular-nums text-gray-400">
                  {height * 10}
                </span>
                <div
                  className={`w-full rounded-t transition-all ${
                    index === 12 ? "bg-[#171717]" : "bg-[#C8F169] hover:bg-[#add450]"
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C8F169]" />
                Kunjungan Profil Harian
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#171717]" />
                Hari Ini (Peak Tel-U Workout Hours)
              </span>
            </div>
            <span className="font-mono text-[11px] text-gray-400">Data ter-update per jam</span>
          </div>
        </Card>

        {/* 2-Column Analytics Details */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Top Discovery Keywords */}
          <Card className="border border-[#E5E5E0] bg-white p-6 shadow-none">
            <h3 className="text-base font-bold text-[#171717]">Top Discovery Keywords</h3>
            <p className="text-xs text-gray-500">Kata kunci alat & fasilitas yang paling sering dicari mahasiswa</p>

            <div className="mt-5 space-y-4">
              {[
                ["Power Rack & Squat Station", "82%"],
                ["Gym Sukabirus Dekat Gerbang", "68%"],
                ["Student Monthly Telkom Promo", "54%"],
                ["Olympic Barbell & Bumper Plate", "46%"],
              ].map(([label, value]) => (
                <div key={label}>
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-700">{label}</span>
                    <strong className="tabular-nums text-[#171717]">{value}</strong>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[#F5F3F3]">
                    <div className="h-2 rounded-full bg-[#C8F169]" style={{ width: value }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Conversion Summary */}
          <Card className="border border-[#E5E5E0] bg-white p-6 shadow-none">
            <h3 className="text-base font-bold text-[#171717]">Conversion & Engagement Metrics</h3>
            <p className="text-xs text-gray-500">Rasio konversi dari pencarian ke kedatangan mahasiswa</p>

            <div className="mt-5 divide-y divide-[#E5E5E0]">
              <div className="flex items-center justify-between pb-3.5 text-xs">
                <div>
                  <p className="font-semibold text-gray-700">Profile view → check-in</p>
                  <p className="text-gray-400">Konversi dari melihat profil ke kedatangan fisik</p>
                </div>
                <strong className="text-sm font-black tabular-nums text-[#171717]">9.0%</strong>
              </div>

              <div className="flex items-center justify-between py-3.5 text-xs">
                <div>
                  <p className="font-semibold text-gray-700">Search list → detail view</p>
                  <p className="text-gray-400">Mahasiswa yang membuka halaman spesifik gym</p>
                </div>
                <strong className="text-sm font-black tabular-nums text-[#171717]">34.2%</strong>
              </div>

              <div className="flex items-center justify-between pt-3.5 text-xs">
                <div>
                  <p className="font-semibold text-gray-700">KTM Discount Redemption</p>
                  <p className="text-gray-400">Persentase pengunjung yang mengklaim diskon KTM</p>
                </div>
                <strong className="rounded bg-lime-100 px-2 py-0.5 text-xs font-black tabular-nums text-lime-800">
                  76% (High Impact)
                </strong>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </OwnerLayout>
  );
}
