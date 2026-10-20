"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";

type Role = "student" | "owner";
type Mode = "login" | "register";

export function AuthShell({ role, mode }: { role: Role; mode: Mode }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = mode === "login";
  const loginHref = role === "student" ? "/auth/login-student" : "/auth/login-owner";
  const registerHref = role === "student" ? "/auth/register-student" : "/auth/register-owner";
  const destination = role === "student" ? "/student/home" : "/owner/dashboard";

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(destination);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-xl bg-[#fbfafa] px-6 pb-10 text-[#111] sm:px-10">
      <header className="flex h-[76px] items-center gap-5 border-b border-[#e9e7e7]">
        <Link href={isLogin ? "/auth/login-student" : loginHref} aria-label="Back" className="text-[#111]"><Icon name="arrow-left" size={27} /></Link>
        <Link href={loginHref} className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-black text-sm font-black text-lime-400">F</span><span className="text-xs font-black">FITFINDER<span className="align-top text-[7px] text-gray-400">TLU</span></span></Link>
        <span className="text-xl font-bold">Auth {isLogin ? "Sign In" : "Sign Up"}</span>
      </header>

      <div className="pt-7 sm:pt-10">
        {isLogin ? <div className="mb-8"><div className="mb-7 flex items-center gap-3"><div className="grid h-14 w-14 place-items-center rounded-2xl bg-black text-2xl font-black text-lime-400">F</div><div><div className="text-2xl font-black tracking-tight">FITFINDER<span className="align-top text-xs text-gray-400">TLU</span></div><div className="text-base text-gray-500">Telkom University Gym Pass</div></div></div><h1 className="text-4xl font-black tracking-tight sm:text-5xl">Welcome Back.</h1><p className="mt-3 text-lg text-gray-600">Sign in to access your FitFinder account.</p></div> : <div className="mb-7"><h1 className="text-4xl font-black tracking-tight sm:text-5xl">Find Your Fit.</h1><p className="mt-3 max-w-md text-lg leading-8 text-gray-600">Create an account to discover and manage gyms around Telkom University.</p></div>}

        <div className="grid grid-cols-2 rounded-2xl bg-[#ecebea] p-1.5 text-sm font-medium text-gray-600 shadow-inner">
          <Link href={mode === "login" ? "/auth/login-student" : "/auth/register-student"} className={`rounded-xl px-3 py-3 text-center transition ${role === "student" ? "bg-black text-white shadow" : "hover:text-black"}`}>{isLogin ? "♢ Student Pass" : "Student"}</Link>
          <Link href={mode === "login" ? "/auth/login-owner" : "/auth/register-owner"} className={`rounded-xl px-3 py-3 text-center transition ${role === "owner" ? "bg-black text-white shadow" : "hover:text-black"}`}>{isLogin ? "♧ Gym Owner" : "Gym Owner"}</Link>
        </div>

        <form onSubmit={submit} className="mt-8 rounded-3xl border border-[#eceaea] bg-white p-6 shadow-[0_6px_18px_rgba(0,0,0,0.03)] sm:p-7">
          {!isLogin && <div className="space-y-5"><Input label="Full Name" icon="user" name="fullName" placeholder="e.g., Arya Pratama" required /><Input label="Email" icon="mail" name="email" type="email" placeholder="name@example.com" required /></div>}
          {isLogin && <div className="mb-5 flex items-center justify-between"><span className="text-sm font-medium">{role === "student" ? "Institutional Email / NIM" : "Business Email"}</span><button type="button" className="text-sm text-gray-600 underline underline-offset-4">Forgot password?</button></div>}
          {isLogin && <Input label="" icon="mail" name="email" type="email" placeholder={role === "student" ? "student@telkomuniversity.ac.id" : "owner@fitfinder.id"} required />}
          <div className={`${isLogin ? "mt-5" : "mt-5"}`}><Input label={isLogin ? "Password" : "Password"} icon="lock" name="password" type={showPassword ? "text" : "password"} placeholder={isLogin ? "••••••••••••" : "Min. 8 alphanumeric characters"} required action={<button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password"><Icon name="eye" size={21} /></button>} /></div>
          {!isLogin && <div className="mt-5"><Input label="Confirm Password" icon="lock" name="confirmPassword" type={showPassword ? "text" : "password"} placeholder="Re-type your password" required action={<Icon name="eye" size={21} />} /></div>}
          <Button type="submit" className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-lg">{isLogin ? "Log In" : "Create Account"}<Icon name="arrow-right" size={24} className={!isLogin ? "text-lime-400" : "text-white"} /></Button>
          {!isLogin && <p className="mt-6 text-center text-sm leading-6 text-gray-600">By tapping &quot;Create Account&quot;, you agree to FitFinder TLU&apos;s <u>Terms of Service</u> and <u>Privacy Policy</u>.</p>}
        </form>

        <p className="mt-5 text-center text-base text-gray-600">{isLogin ? "Don't have an account?" : "Already have an account?"}{" "}<Link href={isLogin ? registerHref : loginHref} className="font-medium text-[#303030] underline underline-offset-4">{isLogin ? "Create one." : "Login."}</Link></p>
      </div>
    </main>
  );
}
