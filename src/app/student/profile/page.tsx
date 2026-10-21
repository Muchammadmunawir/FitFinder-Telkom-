"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { useStudent, type StudentProfile } from "@/context/StudentContext";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { clearSession } from "@/lib/auth-session";

export default function StudentProfilePage() {
  const router = useRouter();
  const { profile, updateProfile } = useStudent();
  const [draft, setDraft] = useState<StudentProfile>(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setDraft(profile), 0);
    return () => window.clearTimeout(timer);
  }, [profile]);

  const update = (field: keyof StudentProfile, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const saveProfile = () => {
    updateProfile(draft);
    setSaved(true);
  };

  const handlePhoto = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("avatar", String(reader.result));
    reader.readAsDataURL(file);
  };

  const initials = draft.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <StudentLayout>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 pb-28 md:pb-16">
        <div className="mb-6 border-b border-[#efeded] pb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-700">STUDENT PASS</p>
          <h1 className="mt-1 text-3xl font-black text-[#171717] sm:text-4xl">Student Profile</h1>
          <p className="mt-1 text-sm text-[#737373]">Kelola informasi akun dan verifikasi profil mahasiswa Telkom University.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Digital Student Pass Card */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border-2 border-[#171717] bg-[#171717] p-6 text-white shadow-md">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-md bg-[#c8f169] text-sm font-black text-[#171717]">
                    TLU
                  </div>
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-white">Telkom University</h2>
                    <p className="text-[9px] text-[#c8f169] font-bold">DIGITAL GYM PASS</p>
                  </div>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold text-[#c8f169]">
                  ACTIVE PASS
                </span>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/20 bg-white/10 text-xl font-black text-white">
                  {draft.avatar ? (
                    <Image
                      src={draft.avatar}
                      alt="Foto profil student"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{draft.name}</h3>
                  <p className="text-xs text-gray-300">{draft.program}</p>
                  <p className="text-[11px] font-mono text-[#c8f169] tracking-wider mt-0.5 tabular-nums">
                    NIM: {draft.studentId}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-white/5 p-3.5 border border-white/10 text-[11px] text-gray-300">
                <div className="flex justify-between items-center">
                  <span>Domain Institusi</span>
                  <span className="font-semibold text-white">@telkomuniversity.ac.id</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span>KTM Direct Discount</span>
                  <span className="font-bold text-[#c8f169]">Eligible (10% Off)</span>
                </div>
              </div>
            </div>

            {/* Account Settings / Security Card */}
            <div className="rounded-xl border border-[#e5e5e0] bg-white p-5">
              <div className="flex items-start gap-3 mb-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#f5f3f3] text-[#171717]">
                  <Icon name="lock" size={18} />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-[#171717]">Keamanan Akun & Sesi</h2>
                  <p className="text-xs text-[#737373]">Sesi tersimpan secara aman dengan enkripsi cookie.</p>
                </div>
              </div>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  clearSession();
                  router.replace("/auth/login-student");
                }}
                className="w-full flex items-center justify-center gap-2 border-red-200 text-red-600 hover:border-red-500 hover:bg-red-50 py-3"
              >
                <Icon name="arrow-left" size={16} /> Log Out
              </Button>
            </div>
          </div>

          {/* Right Column: Edit Profile Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#e5e5e0] bg-white p-6 sm:p-7">
              <div className="flex items-center gap-4 pb-6 border-b border-[#efeded]">
                <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-[#171717] text-xl font-black text-white">
                  {draft.avatar ? (
                    <Image
                      src={draft.avatar}
                      alt="Foto profil student"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#171717]">Foto Profil Student</h2>
                  <p className="mt-0.5 text-xs text-[#737373]">Gunakan foto formal atau foto KTM yang mudah dikenali.</p>
                  <label
                    htmlFor="student-photo"
                    className="mt-2.5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#e5e5e0] bg-white px-3 py-1.5 text-xs font-semibold text-[#171717] hover:border-black transition"
                  >
                    <Icon name="upload" size={14} /> Upload Photo
                  </label>
                  <input
                    id="student-photo"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => handlePhoto(event.target.files?.[0])}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <Input
                  label="Nama Student"
                  icon="user"
                  value={draft.name}
                  onChange={(event) => update("name", event.target.value)}
                />
                <Input
                  label="Email Student"
                  icon="mail"
                  type="email"
                  value={draft.email}
                  onChange={(event) => update("email", event.target.value)}
                />
                <Input
                  label="NIM / Student ID"
                  icon="id-card"
                  value={draft.studentId}
                  onChange={(event) => update("studentId", event.target.value)}
                />
                <Input
                  label="Program Studi"
                  icon="building"
                  value={draft.program}
                  onChange={(event) => update("program", event.target.value)}
                />
                <Input
                  label="Nomor WhatsApp / Telepon"
                  icon="phone"
                  type="tel"
                  value={draft.phone}
                  onChange={(event) => update("phone", event.target.value)}
                />
              </div>

              <Button
                type="button"
                onClick={saveProfile}
                className="mt-6 w-full py-3.5 text-sm font-bold"
              >
                {saved ? "✓ Perubahan Tersimpan" : "Simpan Info Akun"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </StudentLayout>
  );
}
