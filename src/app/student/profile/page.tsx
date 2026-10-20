"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StudentLayout } from "@/components/student/StudentLayout";
import { useStudent, type StudentProfile } from "@/context/StudentContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";

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
      <main className="mx-auto max-w-2xl px-5 pb-28 pt-6 sm:px-8">
        <div className="mb-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime-600">STUDENT PASS</p>
          <h1 className="mt-1 text-3xl font-black">Student Profile</h1>
          <p className="mt-2 text-sm text-gray-500">Kelola informasi akun dan verifikasi profil mahasiswa.</p>
        </div>

        <Card className="p-5">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-full bg-[#d8b08c] text-2xl font-black text-white">
              {draft.avatar ? <img src={draft.avatar} alt="Foto profil student" className="h-full w-full object-cover" /> : initials}
            </div>
            <div>
              <h2 className="font-bold">Foto Profil Student</h2>
              <p className="mt-1 text-xs text-gray-500">Gunakan foto yang mudah dikenali.</p>
              <label htmlFor="student-photo" className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#dedcdb] bg-white px-3 py-2 text-xs font-semibold hover:border-black">
                <Icon name="upload" size={15} /> Upload Photo
              </label>
              <input id="student-photo" type="file" accept="image/*" className="sr-only" onChange={(event) => handlePhoto(event.target.files?.[0])} />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <Input label="Nama Student" icon="user" value={draft.name} onChange={(event) => update("name", event.target.value)} />
            <Input label="Email Student" icon="mail" type="email" value={draft.email} onChange={(event) => update("email", event.target.value)} />
            <Input label="NIM / Student ID" icon="id-card" value={draft.studentId} onChange={(event) => update("studentId", event.target.value)} />
            <Input label="Program Studi" icon="building" value={draft.program} onChange={(event) => update("program", event.target.value)} />
            <Input label="Nomor WhatsApp / Telepon" icon="phone" type="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} />
          </div>

          <Button type="button" onClick={saveProfile} className="mt-5 w-full">
            {saved ? "Perubahan Tersimpan" : "Simpan Info Akun"}
          </Button>
        </Card>

        <Card className="mt-4 p-5">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-lime-50 text-lime-700"><Icon name="lock" size={19} /></span>
            <div>
              <h2 className="font-bold">Account Settings</h2>
              <p className="mt-1 text-xs text-gray-500">Pengaturan keamanan akun Student.</p>
            </div>
          </div>
          <div className="mt-5 divide-y divide-[#efeded] border-t border-[#efeded]">
            <div className="flex items-center justify-between gap-4 py-3">
              <div><p className="text-sm font-semibold">Status Student Pass</p><p className="mt-1 text-xs text-gray-500">KTM Telkom University aktif.</p></div>
              <span className="rounded-full bg-lime-50 px-2.5 py-1 text-[10px] font-bold text-lime-700">TERVERIFIKASI</span>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <div><p className="text-sm font-semibold">Keamanan sesi</p><p className="mt-1 text-xs text-gray-500">Logout tersedia di bawah halaman.</p></div>
              <Icon name="check" size={18} className="text-lime-600" />
            </div>
          </div>
        </Card>

        <Button type="button" variant="secondary" onClick={() => router.replace("/auth/login-student")} className="mt-6 flex w-full items-center justify-center gap-2 border-red-200 text-red-600 hover:border-red-500 hover:bg-red-50">
          <Icon name="arrow-left" size={17} /> Log Out
        </Button>
      </main>
    </StudentLayout>
  );
}
