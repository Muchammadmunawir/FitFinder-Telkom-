import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { prisma } from "@/lib/prisma";

export const instant = false;

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return [
    { id: "barbell-house" },
    { id: "nusantara" },
    { id: "titan" },
  ];
}

export default async function StudentGymDetailPage({ params }: Props) {
  const { id } = await params;

  // Search by slug first, or parsed integer id
  const isNum = /^\d+$/.test(id);
  const gym = await prisma.gym.findFirst({
    where: isNum
      ? { OR: [{ id: parseInt(id, 10) }, { slug: id }] }
      : { slug: id },
    include: {
      owner: {
        select: { name: true, phone: true, email: true },
      },
      equipments: {
        include: { equipment: true },
      },
      facilities: true,
    },
  });

  if (!gym) notFound();

  // Prepare contact WhatsApp link
  const rawPhone = gym.owner.phone || "081234567890";
  const cleanPhone = rawPhone.replace(/\D/g, "").replace(/^0/, "62");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Halo ${gym.name}, saya mahasiswa Telkom University ingin bertanya tentang paket membership dan fasilitas gym.`
  )}`;

  const dailyFormatted = `Rp ${Number(gym.dailyPrice).toLocaleString("id-ID")}`;
  const monthlyFormatted = `Rp ${Number(gym.monthlyPrice).toLocaleString("id-ID")}`;

  return (
    <StudentLayout>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-28 md:pb-16">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/student/home"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#737373] transition hover:text-[#171717]"
          >
            <Icon name="arrow-left" size={16} /> Back to Discover
          </Link>
          <span className="hidden text-xs font-semibold text-gray-400 sm:inline">
            Telkom University Verified Gym Partner
          </span>
        </div>

        {/* Desktop Web 2-Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content Column (Left: 8 Cols) */}
          <div className="space-y-6 lg:col-span-8">
            {/* Gym Photo Hero Frame */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden rounded-xl border border-[#e5e5e0] bg-[#efeded]">
              {gym.image ? (
                <Image
                  src={gym.image}
                  alt={gym.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 850px"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              {gym.accent && (
                <span className="absolute right-4 top-4 rounded-md bg-[#171717]/90 px-3 py-1.5 text-xs font-bold text-[#c8f169]">
                  {gym.accent}
                </span>
              )}
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl font-black text-white sm:text-4xl">{gym.name}</h1>
                <p className="mt-1 text-xs font-medium text-gray-300">
                  {gym.address} • {gym.distance}
                </p>
              </div>
            </div>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="lime">
                <Icon name="map-pin" size={13} />
                {gym.locationZone} • {gym.distance}
              </Badge>
              <Badge>
                <Icon name="star" size={13} className="text-lime-600" /> {Number(gym.rating).toFixed(1)} ({gym.reviewsCount} reviews)
              </Badge>
              {gym.ktmDiscount && <Badge variant="dark">Diskon KTM Aktif</Badge>}
            </div>

            {/* Gym Description Card */}
            <div className="rounded-xl border border-[#e5e5e0] bg-white p-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Tentang Gym</h2>
              <p className="text-sm leading-relaxed text-[#171717]">{gym.description}</p>
            </div>

            {/* Equipment Inventory */}
            <div className="rounded-xl border border-[#e5e5e0] bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#171717]">Peralatan Latihan Terverifikasi</h2>
                  <p className="text-xs text-[#737373]">
                    Peralatan gym yang diinspeksi untuk kebutuhan mahasiswa Telkom University.
                  </p>
                </div>
                <span className="rounded-md bg-[#f5f3f3] px-2.5 py-1 text-xs font-bold tabular-nums text-[#171717]">
                  {gym.equipments.length} Alat
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {gym.equipments.map((eq) => (
                  <div
                    key={eq.id}
                    className="flex items-center gap-2 rounded-lg border border-[#efeded] bg-[#fbf9f9] p-3 text-xs font-medium text-[#171717]"
                  >
                    <span className="text-lime-600 font-bold">✓</span>
                    <span>{eq.detail || eq.equipment.equipmentName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Supporting Facilities */}
            <div className="rounded-xl border border-[#e5e5e0] bg-white p-6">
              <h2 className="text-base font-bold text-[#171717] mb-1">Fasilitas Pendukung</h2>
              <p className="text-xs text-[#737373] mb-4">
                Fasilitas penunjang kenyamanan sebelum atau sesudah jam kuliah.
              </p>
              <div className="flex flex-wrap gap-2">
                {gym.facilities.map((fac) => (
                  <Badge key={fac.id} variant="lime">
                    {fac.facilityName}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Operations Hours */}
            <div className="rounded-xl border border-[#e5e5e0] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#f5f3f3] text-[#171717]">
                  <Icon name="clock" size={20} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#171717]">Jam Operasional (WIB)</h2>
                  <p className="text-xs text-[#737373]">
                    Buka pukul <strong className="text-[#171717]">{gym.openingHours} WIB</strong> — Tutup pukul <strong className="text-[#171717]">{gym.closingHours} WIB</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Booking & Pricing Column (Right: 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-[#e5e5e0] bg-white p-6 space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-lime-700">
                  TELKOM STUDENT RATES
                </span>
                <h2 className="mt-1 text-lg font-black text-[#171717]">Paket & Akses Gym</h2>
              </div>

              {/* Pricing Cards */}
              <div className="space-y-3">
                <div className="rounded-lg border border-[#e5e5e0] bg-[#fbf9f9] p-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Daily Pass</div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <strong className="text-2xl font-black text-[#171717] tabular-nums">{dailyFormatted}</strong>
                    <span className="text-xs text-[#737373]">/ kunjungan</span>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-[#171717] bg-white p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Student Monthly</span>
                    <span className="rounded bg-[#171717] px-2 py-0.5 text-[9px] font-black text-[#c8f169]">
                      HEMAT
                    </span>
                  </div>
                  <div className="mt-1 flex items-baseline gap-1">
                    <strong className="text-2xl font-black text-[#171717] tabular-nums">{monthlyFormatted}</strong>
                    <span className="text-xs text-[#737373]">/ 30 hari</span>
                  </div>
                  <p className="mt-2 text-[10px] text-gray-500">Akses gym tak terbatas untuk mahasiswa Telkom.</p>
                </div>
              </div>

              {/* KTM Discount Callout */}
              {gym.ktmDiscount && (
                <div className="rounded-lg bg-lime-50 border border-lime-200 p-3 text-xs text-lime-900">
                  <p className="font-bold flex items-center gap-1.5">
                    <Icon name="check" size={14} className="text-lime-700" />
                    KTM Telkom University Direct Discount
                  </p>
                  <p className="mt-0.5 text-[11px] text-lime-800">
                    Tunjukkan Kartu Tanda Mahasiswa (KTM) aktif saat kunjungan pertama untuk potongan harga langsung.
                  </p>
                </div>
              )}

              {/* Direct WhatsApp CTA */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#171717] py-4 text-sm font-bold text-white transition hover:bg-[#2c2c2c]"
                >
                  <span>Contact Gym via WhatsApp</span>
                  <Icon name="arrow-right" size={16} className="text-[#c8f169]" />
                </a>

                <p className="text-center text-[10px] text-gray-400">
                  Terhubung langsung dengan pengelola: <span className="font-semibold text-gray-600">{gym.owner?.name || "Mitra Resmi"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </StudentLayout>
  );
}
