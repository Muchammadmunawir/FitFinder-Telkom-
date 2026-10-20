"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type StudentProfile = {
  name: string;
  email: string;
  studentId: string;
  program: string;
  phone: string;
  avatar: string;
};

type StudentContextValue = {
  savedIds: string[];
  toggleSaved: (gymId: string) => void;
  profile: StudentProfile;
  updateProfile: (profile: StudentProfile) => void;
};

const defaultProfile: StudentProfile = {
  name: "Arya Pratama",
  email: "student@telkomuniversity.ac.id",
  studentId: "1301210000",
  program: "S1 Informatika",
  phone: "+62 812-3456-7890",
  avatar: "",
};

const StudentContext = createContext<StudentContextValue | null>(null);

export function StudentProvider({ children }: { children: ReactNode }) {
  const hydrated = useRef(false);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);

  useEffect(() => {
    const storedSavedIds = window.localStorage.getItem("fitfinder-saved-gyms");
    const storedProfile = window.localStorage.getItem("fitfinder-student-profile");
    const parsedSavedIds = storedSavedIds ? JSON.parse(storedSavedIds) as string[] : null;
    const parsedProfile = storedProfile ? { ...defaultProfile, ...JSON.parse(storedProfile) } : null;
    const timer = window.setTimeout(() => {
      if (parsedSavedIds) setSavedIds(parsedSavedIds);
      if (parsedProfile) setProfile(parsedProfile);
      hydrated.current = true;
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem("fitfinder-saved-gyms", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    if (!hydrated.current) return;
    window.localStorage.setItem("fitfinder-student-profile", JSON.stringify(profile));
  }, [profile]);

  const value = useMemo(() => ({
    savedIds,
    toggleSaved: (gymId: string) => setSavedIds((ids) => ids.includes(gymId) ? ids.filter((id) => id !== gymId) : [...ids, gymId]),
    profile,
    updateProfile: setProfile,
  }), [profile, savedIds]);

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) throw new Error("useStudent must be used inside StudentProvider");
  return context;
}
