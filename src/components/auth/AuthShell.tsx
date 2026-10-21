"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { setSession } from "@/lib/auth-session";
import { useStudent } from "@/context/StudentContext";

type Role = "student" | "owner";
type Mode = "login" | "register";

export function AuthShell({ role, mode }: { role: Role; mode: Mode }) {
  const router = useRouter();
  let studentContext: ReturnType<typeof useStudent> | null = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    studentContext = useStudent();
  } catch {
    studentContext = null;
  }

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isLogin = mode === "login";
  const loginHref = role === "student" ? "/auth/login-student" : "/auth/login-owner";
  const registerHref = role === "student" ? "/auth/register-student" : "/auth/register-owner";
  const destination = role === "student" ? "/student/home" : "/owner/dashboard";

  const fillDemo = (targetRole: Role) => {
    if (targetRole === "student") {
      setEmail("student@telkomuniversity.ac.id");
      setPassword("TelkomFit2025!");
    } else {
      setEmail("partner@titanpower.id");
      setPassword("TelkomFit2025!");
    }
    setErrorMsg(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!isLogin && password !== confirmPassword) {
      setErrorMsg("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        });
        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.error || "Gagal masuk ke akun.");
          setLoading(false);
          return;
        }

        setSession(data.user);
        if (studentContext && role === "student") {
          studentContext.updateProfile({
            name: data.user.name,
            email: data.user.email,
            studentId: data.user.studentId || "1301210000",
            program: data.user.program || "S1 Informatika",
            phone: data.user.phone || "",
            avatar: data.user.avatar || "",
          });
        }
        setSuccessMsg("Login berhasil! Mengarahkan...");
        window.setTimeout(() => router.push(destination), 400);
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email,
            password,
            role,
          }),
        });
        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.error || "Gagal membuat akun.");
          setLoading(false);
          return;
        }

        setSession(data.user);
        setSuccessMsg("Akun berhasil dibuat! Mengarahkan ke dashboard...");
        window.setTimeout(() => router.push(destination), 600);
      }
    } catch {
      setErrorMsg("Terjadi gangguan koneksi ke server backend.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#FBF9F9] text-[#171717] lg:grid lg:grid-cols-12">
      {/* Desktop Left Editorial Showcase Panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#171717] p-12 text-white lg:col-span-5 lg:flex xl:col-span-5 xl:p-16">
        {/* Subtle geometric grid background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(#C8F169 1px, transparent 1px), radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        {/* Top Brand Header */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-[#C8F169]/30 bg-black text-base font-black text-[#C8F169]">
              F
            </span>
            <div>
              <span className="text-sm font-black tracking-wider text-white">
                FITFINDER<span className="text-[9px] text-[#C8F169]">TELKOM</span>
              </span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Athletic Utility Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Center Editorial Manifesto */}
        <div className="relative z-10 my-auto py-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C8F169]/30 bg-[#C8F169]/10 px-3 py-1 text-[10px] font-bold tracking-wider text-[#C8F169]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8F169]" />
            TEL-U CAMPUS FITNESS SYSTEM
          </span>

          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white xl:text-4xl">
            {isLogin
              ? "Discipline Meets Campus Convenience."
              : "Find Your Fit. Built for Telkom Students."}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-400">
            Platform terpadu pencocokan gym, inventaris alat angkat beban, dan tarif khusus mahasiswa di sekitar Telkom University Dayeuhkolot.
          </p>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#C8F169] text-[10px] font-black text-[#171717]">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-white">KTM Telkom Direct Discount</p>
                <p className="text-[11px] text-gray-400">Diskon 10% langsung di seluruh gym mitra dengan validasi KTM terverifikasi.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#C8F169] text-[10px] font-black text-[#171717]">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-white">4 Zona Kampus Terintegrasi</p>
                <p className="text-[11px] text-gray-400">Sukapura, Sukabirus, Ciganitri, dan Buah Batu dengan jarak jalan kaki & motor.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#C8F169] text-[10px] font-black text-[#171717]">
                ✓
              </span>
              <div>
                <p className="text-xs font-bold text-white">Inventaris Alat Beban Real-Time</p>
                <p className="text-[11px] text-gray-400">Kalkulasi kecocokan alat (Olympic Barbell, Squat Rack, Dumbbell) sesuai target Anda.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Platform Status */}
        <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-6 text-[11px] text-gray-400">
          <span>Telkom University South Precinct</span>
          <span className="font-mono text-[10px] text-[#C8F169]">v2.0 • POSTGRES LIVE</span>
        </div>
      </div>

      {/* Right Side Form Panel */}
      <div className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-12 lg:col-span-7 lg:px-16 xl:col-span-7 xl:px-24">
        {/* Mobile Top Navbar (hidden on desktop) */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#171717] text-sm font-black text-[#C8F169]">
              F
            </span>
            <span className="text-xs font-black tracking-tight">
              FITFINDER<span className="text-[8px] text-gray-400">TLU</span>
            </span>
          </Link>
          <span className="rounded-full bg-black/5 px-2.5 py-1 text-[10px] font-bold text-gray-600">
            {role === "student" ? "STUDENT PASS" : "PARTNER PORTAL"}
          </span>
        </div>

        <div className="mx-auto w-full max-w-md">
          {/* Back link & heading */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#171717]"
            >
              <Icon name="arrow-left" size={14} /> Kembali ke Beranda
            </Link>

            <h1 className="mt-3 text-3xl font-black tracking-tight text-[#171717] sm:text-4xl">
              {isLogin ? "Welcome Back." : "Find Your Fit."}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {isLogin
                ? `Masuk ke akun ${role === "student" ? "Mahasiswa Telkom" : "Mitra Gym"} Anda.`
                : `Daftar akun baru untuk mengakses ekosistem kebugaran Telkom University.`}
            </p>
          </div>

          {/* Role Switch Tabs */}
          <div className="mb-6 grid grid-cols-2 rounded-xl border border-[#E5E5E0] bg-[#F5F3F3] p-1 text-xs font-bold">
            <Link
              href={mode === "login" ? "/auth/login-student" : "/auth/register-student"}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-center transition ${
                role === "student"
                  ? "border border-[#171717] bg-[#171717] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#171717]"
              }`}
            >
              <span>{isLogin ? "Student Pass" : "Student"}</span>
            </Link>
            <Link
              href={mode === "login" ? "/auth/login-owner" : "/auth/register-owner"}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-center transition ${
                role === "owner"
                  ? "border border-[#171717] bg-[#171717] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#171717]"
              }`}
            >
              <span>{isLogin ? "Gym Owner" : "Gym Owner"}</span>
            </Link>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
              <Icon name="x" size={16} className="shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Banner */}
          {successMsg && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-lime-300 bg-lime-50 p-3.5 text-xs font-semibold text-lime-800">
              <Icon name="check" size={16} className="shrink-0 text-lime-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Main Auth Form */}
          <form onSubmit={submit} className="rounded-2xl border border-[#E5E5E0] bg-white p-6 shadow-none sm:p-7">
            {!isLogin && (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  icon="user"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g., Arya Pratama"
                  required
                />
                <Input
                  label={role === "student" ? "Institutional Email (@telkomuniversity.ac.id)" : "Business Email"}
                  icon="mail"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={role === "student" ? "student@telkomuniversity.ac.id" : "owner@fitfinder.id"}
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="space-y-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      {role === "student" ? "Institutional Email (@telkomuniversity.ac.id)" : "Business Email"}
                    </span>
                    <button type="button" className="text-xs text-gray-400 hover:text-gray-700 hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    label=""
                    icon="mail"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === "student" ? "student@telkomuniversity.ac.id" : "partner@titanpower.id"}
                    required
                  />
                </div>
              </div>
            )}

            <div className="mt-4">
              <Input
                label="Password"
                icon="lock"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isLogin ? "••••••••••••" : "Min. 8 characters"}
                required
                action={
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                    <Icon name="eye" size={18} className="text-gray-400 hover:text-gray-600" />
                  </button>
                }
              />
            </div>

            {!isLogin && (
              <div className="mt-4">
                <Input
                  label="Confirm Password"
                  icon="lock"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type your password"
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold"
            >
              <span>{loading ? "Memproses..." : isLogin ? "Log In" : "Create Account"}</span>
              <Icon name="arrow-right" size={18} className={!isLogin ? "text-[#C8F169]" : "text-white"} />
            </Button>

            {/* Quick Demo Credentials Fill (Mandatory for Playwright E2E Tests) */}
            {isLogin && (
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#E5E5E0] bg-[#FBF9F9] px-3.5 py-2.5 text-xs text-gray-600">
                <span className="font-semibold text-gray-500">Demo Kredensial:</span>
                <button
                  type="button"
                  onClick={() => fillDemo(role)}
                  className="font-bold text-[#4d6700] underline hover:text-[#394d00]"
                >
                  Isi Kredensial Demo {role === "student" ? "Mahasiswa" : "Owner"}
                </button>
              </div>
            )}

            {!isLogin && (
              <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
                Dengan mengklik &quot;Create Account&quot;, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi FitFinder Telkom.
              </p>
            )}
          </form>

          {/* Bottom Switch Mode Link */}
          <p className="mt-6 text-center text-xs text-gray-500">
            {isLogin ? "Belum memiliki akun?" : "Sudah memiliki akun?"}{" "}
            <Link
              href={isLogin ? registerHref : loginHref}
              className="font-bold text-[#171717] underline underline-offset-4 hover:text-black"
            >
              {isLogin ? "Daftar sekarang." : "Masuk di sini."}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
