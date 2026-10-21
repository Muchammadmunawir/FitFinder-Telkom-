"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { OwnerLayout } from "@/components/owner/OwnerLayout";
import { StepForm } from "@/components/owner/StepForm";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";

type MasterEquipment = { id: number; equipmentName: string };

const availableFacilitiesList = [
  { label: "Motor Area", detail: "Dedicated parking lot for motorbikes", icon: "map-pin" as const },
  { label: "AC", detail: "Air conditioning throughout main workout area", icon: "cloud" as const },
  { label: "Hot Shower", detail: "Clean separated shower cubicles", icon: "grid" as const },
  { label: "Locker", detail: "Bring-your-own padlock member lockers", icon: "lock" as const },
  { label: "Water Refill", detail: "Free cold & normal drinking water dispenser", icon: "cloud" as const },
  { label: "Chalk Allowed", detail: "Lifting chalk permitted for powerlifters", icon: "spark" as const },
];

export default function OwnerProfileEditPage() {
  const [gymId, setGymId] = useState<number | null>(null);
  const [gymName, setGymName] = useState("");
  const [locationZone, setLocationZone] = useState("");
  const [daily, setDaily] = useState("");
  const [monthly, setMonthly] = useState("");
  const [ktmDiscount, setKtmDiscount] = useState(true);
  const [openingHours, setOpeningHours] = useState("07:00");
  const [closingHours, setClosingHours] = useState("22:00");
  const [photoUrl, setPhotoUrl] = useState("");

  const [masterEquipments, setMasterEquipments] = useState<MasterEquipment[]>([]);
  const [selectedEquipmentIds, setSelectedEquipmentIds] = useState<number[]>([]);
  const [activeFacilities, setActiveFacilities] = useState<string[]>([]);

  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Load existing gym data and master equipment list
  useEffect(() => {
    async function loadData() {
      try {
        const [gymRes, eqRes] = await Promise.all([
          fetch("/api/owner/gym"),
          fetch("/api/equipments"),
        ]);

        const gymJson = await gymRes.json();
        const eqJson = await eqRes.json();

        if (eqJson.success && Array.isArray(eqJson.data)) {
          setMasterEquipments(eqJson.data);
        }

        if (gymJson.success && gymJson.data) {
          const g = gymJson.data;
          setGymId(g.id);
          setGymName(g.name);
          setLocationZone(g.locationZone);
          setDaily(Number(g.dailyPrice).toLocaleString("id-ID"));
          setMonthly(Number(g.monthlyPrice).toLocaleString("id-ID"));
          setKtmDiscount(Boolean(g.ktmDiscount));
          setOpeningHours(g.openingHours || "07:00");
          setClosingHours(g.closingHours || "22:00");
          setPhotoUrl(g.image || "");

          if (Array.isArray(g.equipments)) {
            setSelectedEquipmentIds(g.equipments.map((eq: { equipmentId: number }) => eq.equipmentId));
          }
          if (Array.isArray(g.facilities)) {
            setActiveFacilities(g.facilities.map((f: { facilityName: string }) => f.facilityName));
          }
        }
      } catch (err) {
        console.error("Failed to load owner gym data:", err);
        setErrorMsg("Gagal memuat data dari database.");
      } finally {
        setFetching(false);
      }
    }

    loadData();
  }, []);

  const toggleEquipment = (eqId: number) => {
    setSelectedEquipmentIds((prev) =>
      prev.includes(eqId) ? prev.filter((id) => id !== eqId) : [...prev, eqId]
    );
  };

  const toggleFacility = (facilityName: string) => {
    setActiveFacilities((prev) =>
      prev.includes(facilityName)
        ? prev.filter((name) => name !== facilityName)
        : [...prev, facilityName]
    );
  };

  const saveChanges = async () => {
    if (!gymId) return;
    setErrorMsg(null);
    setSaving(true);

    try {
      const cleanDaily = Number(daily.replace(/\D/g, ""));
      const cleanMonthly = Number(monthly.replace(/\D/g, ""));

      const res = await fetch("/api/owner/gym", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gymId,
          name: gymName,
          dailyPrice: cleanDaily,
          monthlyPrice: cleanMonthly,
          ktmDiscount,
          openingHours,
          closingHours,
          equipmentIds: selectedEquipmentIds,
          facilities: activeFacilities,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        setErrorMsg(json.error || "Gagal menyimpan perubahan.");
        return;
      }

      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    } catch {
      setErrorMsg("Terjadi gangguan koneksi ke server database.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <OwnerLayout>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Actions */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#E5E5E0] pb-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4d6700]">
                PORTAL MITRA • FITFINDER TELKOM
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-[11px] font-semibold text-gray-500">Live Management</span>
            </div>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#171717] sm:text-3xl">
              Edit Gym Profile
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Perbarui rincian operasional, tarif student, inventaris alat, dan fasilitas secara langsung ke database PostgreSQL.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C8F169] bg-[#C8F169]/20 px-3.5 py-1.5 text-xs font-bold text-[#394d00]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#4d6700]" />
              POSTGRESQL LIVE SYNC
            </span>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
            <Icon name="x" size={16} className="shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Top Summary Banner */}
        <Card className="mb-8 border border-[#E5E5E0] bg-white p-6 shadow-none">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#171717] text-xl font-black text-[#C8F169]">
                {gymName ? gymName.charAt(0).toUpperCase() : "G"}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black text-[#171717]">{gymName || "Loading..."}</h2>
                  <span className="rounded bg-lime-100 px-2 py-0.5 text-[10px] font-bold text-lime-800">
                    VERIFIED PARTNER
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                  <Icon name="map-pin" size={14} className="text-gray-400" />
                  Zona Kampus: <span className="font-semibold text-gray-700">{locationZone || "Belum dipilih"}</span>
                  <span className="mx-1">•</span>
                  Jam Buka: <span className="font-semibold tabular-nums text-gray-700">{openingHours} - {closingHours} WIB</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-[#E5E5E0] bg-[#FBF9F9] px-4 py-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">EQUIPMENTS</p>
                <strong className="text-lg font-black tabular-nums text-[#171717]">{selectedEquipmentIds.length}</strong>
              </div>
              <div className="rounded-xl border border-[#E5E5E0] bg-[#FBF9F9] px-4 py-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">FACILITIES</p>
                <strong className="text-lg font-black tabular-nums text-[#171717]">{activeFacilities.length}</strong>
              </div>
              <div className="rounded-xl border border-[#C8F169] bg-[#C8F169]/15 px-4 py-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#394d00]">STATUS</p>
                <strong className="text-lg font-black text-[#394d00]">ACTIVE</strong>
              </div>
            </div>
          </div>
        </Card>

        {/* 2-Column Desktop Grid for the 4 Steps */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Operations & Pricing (Steps 1 & 2) */}
          <div className="space-y-6 lg:col-span-6">
            {/* STEP 1: Location & Operations */}
            <StepForm step="1" title="Location & Operations" detail="South Bandung student precinct & operating hours">
              <div className="mt-4 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    label="Nama Gym"
                    icon="building"
                    value={gymName}
                    onChange={(e) => setGymName(e.target.value)}
                  />
                  <Input
                    label="Zona Lokasi"
                    icon="map-pin"
                    value={locationZone}
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Jam Buka (WIB)"
                    icon="clock"
                    value={openingHours}
                    onChange={(e) => setOpeningHours(e.target.value)}
                  />
                  <Input
                    label="Jam Tutup (WIB)"
                    icon="clock"
                    value={closingHours}
                    onChange={(e) => setClosingHours(e.target.value)}
                  />
                </div>
                {photoUrl && (
                  <div className="border-t border-[#efeded] pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      Foto Utama Gym
                    </p>
                    <div className="relative h-44 w-full overflow-hidden rounded-xl border border-[#e5e5e0] bg-[#efeded]">
                      <Image src={photoUrl} alt="Gym preview" fill sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
                    </div>
                  </div>
                )}
              </div>
            </StepForm>

            {/* STEP 2: Pricing & Subscriptions */}
            <StepForm step="2" title="Pricing & Subscriptions" detail="Calibrated for Telkom student pocket money">
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <Input
                      id="dailyPrice"
                      name="dailyPrice"
                      label="Daily Drop-in Rate (Rp)"
                      value={daily}
                      onChange={(e) => setDaily(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="rounded-xl border border-[#E5E5E0] bg-[#F5F3F3] p-3 text-center text-[10px] font-bold uppercase text-gray-500">
                      Student Single Visit
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <Input
                      id="monthlyPrice"
                      name="monthlyPrice"
                      label="Monthly Membership Rate (Rp)"
                      value={monthly}
                      onChange={(e) => setMonthly(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="rounded-xl border border-[#E5E5E0] bg-[#F5F3F3] p-3 text-center text-[10px] font-bold uppercase text-gray-500">
                      Uncapped Visits
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-[#C8F169] bg-[#C8F169]/15 p-4">
                  <div>
                    <p className="text-sm font-bold text-[#171717]">KTM Telkom Direct Discount</p>
                    <p className="text-xs text-gray-600">Diskon 10% untuk pemegang KTM Telkom University terverifikasi</p>
                  </div>
                  <Toggle label="KTM discount" checked={ktmDiscount} onChange={() => setKtmDiscount(!ktmDiscount)} />
                </div>
              </div>
            </StepForm>
          </div>

          {/* Right Column: Equipments & Facilities (Steps 3 & 4) */}
          <div className="space-y-6 lg:col-span-6">
            {/* STEP 3: Equipment Inventory */}
            <StepForm step="3" title="Equipment Inventory" detail="Directly influences student gym match score">
              <p className="mt-2 text-xs text-gray-500">
                Pilih seluruh alat yang tersedia di gym Anda. Data ini mencocokkan target latihan mahasiswa secara real-time.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {masterEquipments.map((item) => {
                  const isSelected = selectedEquipmentIds.includes(item.id);
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => toggleEquipment(item.id)}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                        isSelected
                          ? "border-[#171717] bg-[#171717] text-white"
                          : "border-[#E5E5E0] bg-white text-gray-600 hover:border-[#171717] hover:text-[#171717]"
                      }`}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {item.equipmentName}
                    </button>
                  );
                })}
              </div>
            </StepForm>

            {/* STEP 4: Supporting Facilities */}
            <StepForm step="4" title="Supporting Facilities" detail="Read student sentiments filter checklist">
              <p className="mt-2 text-xs text-gray-500">
                Aktifkan fasilitas penunjang yang tersedia untuk kenyamanan mahasiswa Tel-U saat berlatih.
              </p>
              <div className="mt-4 divide-y divide-[#E5E5E0]">
                {availableFacilitiesList.map((facility) => {
                  const isChecked = activeFacilities.includes(facility.label);
                  return (
                    <div key={facility.label} className="flex items-center justify-between gap-4 py-3.5">
                      <div className="flex min-w-0 items-start gap-3">
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F5F3F3] text-gray-700">
                          <Icon name={facility.icon} size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#171717]">{facility.label}</p>
                          <p className="text-xs text-gray-500">{facility.detail}</p>
                        </div>
                      </div>
                      <Toggle
                        label={facility.label}
                        checked={isChecked}
                        onChange={() => toggleFacility(facility.label)}
                      />
                    </div>
                  );
                })}
              </div>
            </StepForm>
          </div>
        </div>

        {/* Primary Save Action Bar */}
        <div className="mt-8 border-t border-[#E5E5E0] pt-6">
          <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              Setiap perubahan tarif atau fasilitas akan langsung disinkronkan ke katalog penemuan mahasiswa.
            </p>
            <Button
              type="button"
              disabled={saving || fetching}
              onClick={saveChanges}
              className="flex w-full items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold sm:w-auto"
            >
              <span className="text-[#C8F169]">↻</span>
              <span>{saving ? "Menyimpan ke PostgreSQL..." : fetching ? "Memuat Data Gym..." : "Save Changes to Database"}</span>
              <Icon name="arrow-right" size={18} />
            </Button>
          </div>
        </div>

        {/* Toast Notification */}
        {saved && (
          <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#C8F169] bg-[#171717] px-6 py-3 text-xs font-bold text-[#C8F169] shadow-2xl">
            ✓ Perubahan berhasil disimpan ke database PostgreSQL!
          </div>
        )}
      </main>
    </OwnerLayout>
  );
}
