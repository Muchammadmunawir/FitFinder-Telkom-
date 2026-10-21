"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { clearSession } from "@/lib/auth-session";

type OwnerProfile = {
  name: string;
  email: string;
  phone: string;
  gymName: string;
  avatar: string;
};

const defaultProfile: OwnerProfile = {
  name: "Taufik Owner",
  email: "partner@titanpower.id",
  phone: "+62 812-3456-7890",
  gymName: "Titan Power Sukabirus",
  avatar: "",
};

export default function OwnerProfilePage() {
  const router = useRouter();
  const [draft, setDraft] = useState<OwnerProfile>(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("fitfinder-owner-profile");
    if (!stored) return;
    const timer = window.setTimeout(() => {
      try {
        setDraft({ ...defaultProfile, ...JSON.parse(stored) as Partial<OwnerProfile> });
      } catch {
        return;
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const update = (field: keyof OwnerProfile, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const saveProfile = () => {
    window.localStorage.setItem("fitfinder-owner-profile", JSON.stringify(draft));
    setSaved(true);
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("avatar", String(reader.result));
    reader.readAsDataURL(file);
  };

  const initials = draft.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <OwnerLayout>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="mb-8 border-b border-[#E5E5E0] pb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4d6700]">
              PORTAL MITRA TELKOM • AKUN
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[11px] font-semibold text-gray-500">Partner Credentials</span>
          </div>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
            Owner Profile & Partner Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Kelola informasi profil pengelola gym, kontak operasional, serta pengaturan keamanan akun mitra.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Partner Credential Card & Security Actions */}
          <div className="space-y-6 lg:col-span-5">
            {/* Credential Card */}
            <Card className="border border-[#E5E5E0] bg-white p-6 shadow-none">
              <div className="flex items-center justify-between border-b border-[#E5E5E0] pb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8F169] bg-[#C8F169]/20 px-3 py-1 text-[10px] font-bold text-[#394d00]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4d6700]" />
                  VERIFIED PARTNER
                </span>
                <span className="text-[11px] font-semibold text-gray-500">Tel-U Fitness Network</span>
              </div>

              <div className="mt-6 flex flex-col items-center text-center">
                <div className="relative grid h-28 w-28 place-items-center overflow-hidden rounded-2xl border-2 border-[#171717] bg-[#171717] text-3xl font-black text-[#C8F169] shadow-sm">
                  {draft.avatar ? (
                    <Image
                      src={draft.avatar}
                      alt="Foto profil owner"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <h2 className="mt-4 text-lg font-black text-[#171717]">{draft.name}</h2>
                <p className="text-xs font-semibold text-gray-500">{draft.gymName}</p>
                <p className="mt-0.5 text-[11px] text-gray-400">{draft.email}</p>

                <div className="mt-5">
                  <label
                    htmlFor="owner-photo"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#E5E5E0] bg-[#FBF9F9] px-4 py-2 text-xs font-bold text-[#171717] transition hover:border-[#171717] hover:bg-white"
                  >
                    <Icon name="upload" size={15} /> Upload Foto Baru
                  </label>
                  <input
                    id="owner-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => handlePhoto(event.target.files?.[0])}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2.5 rounded-xl border border-[#E5E5E0] bg-[#FBF9F9] p-4 text-xs">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Status Kemitraan</span>
                  <span className="font-bold text-[#394d00]">Aktif & Terdaftar</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Wilayah Operasional</span>
                  <span className="font-semibold text-[#171717]">Bandung Selatan (Tel-U)</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Integrasi WhatsApp</span>
                  <span className="font-semibold tabular-nums text-[#171717]">{draft.phone}</span>
                </div>
              </div>
            </Card>

            {/* Account Settings / Security Card */}
            <Card className="border border-[#E5E5E0] bg-white p-6 shadow-none">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#C8F169]/20 text-[#394d00]">
                  <Icon name="lock" size={19} />
                </span>
                <div>
                  <h3 className="font-bold text-[#171717]">Account & Security</h3>
                  <p className="text-xs text-gray-500">Pengaturan akses dan keamanan akun mitra.</p>
                </div>
              </div>

              <div className="mt-5 divide-y divide-[#E5E5E0] border-t border-[#E5E5E0]">
                <div className="flex items-center justify-between gap-4 py-3 text-xs">
                  <div>
                    <p className="font-semibold text-[#171717]">Email Akun Mitra</p>
                    <p className="text-gray-500">Dipakai untuk notifikasi & laporan mingguan.</p>
                  </div>
                  <span className="rounded-full bg-lime-100 px-2.5 py-1 text-[10px] font-bold text-lime-800">
                    TERVERIFIKASI
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4 py-3 text-xs">
                  <div>
                    <p className="font-semibold text-[#171717]">Keamanan Sesi</p>
                    <p className="text-gray-500">Terenkripsi dengan token sesi HTTP-only.</p>
                  </div>
                  <Icon name="check" size={18} className="text-lime-600" />
                </div>
              </div>
            </Card>

            {/* Log Out Button */}
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                clearSession();
                router.replace("/auth/login-owner");
              }}
              className="flex w-full items-center justify-center gap-2 border-red-200 bg-white py-3.5 text-xs font-bold text-red-600 hover:border-red-500 hover:bg-red-50"
            >
              <Icon name="arrow-left" size={16} /> Log Out
            </Button>
          </div>

          {/* Right Column: Edit Profile Form */}
          <div className="space-y-6 lg:col-span-7">
            <Card className="border border-[#E5E5E0] bg-white p-6 shadow-none">
              <div className="border-b border-[#E5E5E0] pb-4">
                <h2 className="text-base font-bold text-[#171717]">Edit Informasi Profil Mitra</h2>
                <p className="text-xs text-gray-500">
                  Data ini digunakan oleh tim administrasi FitFinder Telkom dan ditampilkan pada katalog kontak mahasiswa.
                </p>
              </div>

              <div className="mt-6 space-y-5">
                <Input
                  label="Nama Owner / Pengelola"
                  icon="user"
                  value={draft.name}
                  onChange={(event) => update("name", event.target.value)}
                />
                <Input
                  label="Email Mitra / Bisnis"
                  icon="mail"
                  type="email"
                  value={draft.email}
                  onChange={(event) => update("email", event.target.value)}
                />
                <Input
                  label="Nomor WhatsApp / Hotline Gym"
                  icon="phone"
                  type="tel"
                  value={draft.phone}
                  onChange={(event) => update("phone", event.target.value)}
                />
                <Input
                  label="Nama Gym yang Dikelola"
                  icon="building"
                  value={draft.gymName}
                  onChange={(event) => update("gymName", event.target.value)}
                />
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#E5E5E0] pt-6">
                <p className="text-xs text-gray-500">
                  {saved ? "✓ Perubahan profil disimpan lokal." : "Perubahan belum disimpan."}
                </p>
                <Button
                  type="button"
                  onClick={saveProfile}
                  className="px-6 py-3 text-xs font-bold"
                >
                  {saved ? "Perubahan Tersimpan" : "Simpan Info Akun"}
                </Button>
              </div>
            </Card>

            {/* Partner Guidance Card */}
            <Card className="border border-[#E5E5E0] bg-[#FBF9F9] p-6 shadow-none">
              <div className="flex items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#171717] text-[#C8F169]">
                  <Icon name="spark" size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#171717]">Panduan Mitra FitFinder Telkom</h4>
                  <p className="mt-1 text-xs leading-relaxed text-gray-600">
                    Pastikan nomor WhatsApp aktif untuk menerima kontak reservasi langsung dari mahasiswa Telkom University. Nomor yang tertera di profil akan otomatis dihubungkan ke tombol <em>&ldquo;Contact Gym via WhatsApp&rdquo;</em> pada halaman detail gym.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </OwnerLayout>
  );
}
