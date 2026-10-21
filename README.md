# FitFinder Telkom 🏋️‍♂️

FitFinder Telkom adalah platform berbasis web untuk mahasiswa Telkom University dalam menemukan, memfilter, dan membandingkan tempat gym di sekitar kawasan kampus (Sukapura, Sukabirus, Ciganitri, dan Bojongsoang). Platform ini juga menyediakan portal pengelola gym untuk memantau status keanggotaan dan memperbarui inventaris alat latihan.

Proyek ini dibangun mengacu pada dokumen spesifikasi kebutuhan **SKPL** dan perancangan arsitektur **DPPL** mata kuliah Implementasi & Pengujian Perangkat Lunak (IMPAL).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **ORM**: [Prisma ORM](https://www.prisma.io/)
- **Styling**: Tailwind CSS
- **Testing**: [Playwright](https://playwright.dev/) (End-to-End Testing) & Node.js Test Runner (Unit Testing)

---

## 🚀 Panduan Memulai (Getting Started)

### Prasyarat (Prerequisites)
Pastikan perangkat Anda telah terpasang:
- [Node.js](https://nodejs.org/) (versi 18.18 atau lebih baru)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (dengan Docker Compose)
- [Git](https://git-scm.com/)

---

### Langkah 1: Clone Repository & Install Dependencies

```bash
git clone https://github.com/Muchammadmunawir/FitFinder-Telkom-.git
cd FitFinder-Telkom-
npm install
```

---

### Langkah 2: Konfigurasi Environment Variable

Salin file contoh konfigurasi environment ke `.env`:

```bash
# Windows PowerShell
copy .env.example .env

# Linux / macOS / Bash
cp .env.example .env
```

Pastikan variabel `DATABASE_URL` di dalam file `.env` sudah mengarah ke port PostgreSQL Docker:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fitfinder_telkom?schema=public"
```

---

### Langkah 3: Menjalankan Database PostgreSQL dengan Docker

Jalankan container PostgreSQL di background menggunakan Docker Compose:

```bash
docker compose up -d
```

Untuk memverifikasi bahwa container PostgreSQL sudah berjalan:
```bash
docker ps
```
> Container `fitfinder-postgres` akan aktif dan menerima koneksi di port `5432`.

---

### Langkah 4: Sinkronisasi Skema Database & Seeder Data

Jalankan migrasi skema Prisma ke database PostgreSQL serta isi data awal (demo akun, master alat latihan, dan daftar gym mitra):

```bash
# Sinkronkan skema tabel ke PostgreSQL
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Isi data seeder awal (Akun demo & data gym)
npx prisma db seed
```

---

### Langkah 5: Jalankan Development Server

```bash
npm run dev
```

Buka peramban (browser) di [http://localhost:3000](http://localhost:3000).

---

## 🔑 Kredensial Akun Demo (Demo Accounts)

Untuk mempermudah pengujian alur peran pengguna (RBAC), gunakan akun berikut:

| Peran (Role) | Email | Password | Akses Halaman |
| :--- | :--- | :--- | :--- |
| **Mahasiswa** | `student@telkomuniversity.ac.id` | `TelkomFit2025!` | `/student/home`, `/student/saved`, `/student/compare`, `/student/profile` |
| **Mitra Gym** | `partner@titanpower.id` | `TelkomFit2025!` | `/owner/dashboard`, `/owner/profile-edit`, `/owner/analytics`, `/owner/profile` |

> *Catatan: Form login juga dilengkapi tombol shortcut demo untuk mengisi kredensial secara instan.*

---

## 🧪 Menjalankan Pengujian (Testing)

### 1. Unit Testing (Formula Match Score SKPL-NF-01)
Menguji logika kalkulasi kecocokan alat, fasilitas, dan anggaran:
```bash
npx tsx tests/unit/match-score.test.ts
```

### 2. End-to-End (E2E) Testing dengan Playwright
Menjalankan seluruh skenario pengujian otomatis (API, Autentikasi RBAC, Portal Student, dan Portal Owner) pada browser Desktop Chrome & Mobile Chrome:
```bash
# Jalankan seluruh test suite
npx playwright test

# Jalankan test dengan tampilan UI interaktif
npx playwright test --ui
```

### 3. Pemeriksaan Kualitas Kode (Linting & Typecheck)
```bash
# Linting kode
npm run lint

# Pemeriksaan tipe TypeScript
npx tsc --noEmit
```

---

## 📁 Struktur Direktori Utama

```
FitFinder-Telkom-/
├── docker-compose.yml       # Konfigurasi container PostgreSQL
├── prisma/
│   ├── schema.prisma        # Definisi model data relasional Prisma
│   └── seed.ts              # Seeder data master alat & gym Telkom
├── src/
│   ├── app/                 # Next.js App Router (Halaman & REST API)
│   │   ├── api/             # Backend API (Auth, Gyms, Equipments, Owner)
│   │   ├── auth/            # Halaman Login & Registrasi
│   │   ├── owner/           # Portal Pengelola Gym Mitra
│   │   └── student/         # Portal Mahasiswa (Discover, Saved, Compare, Profile)
│   ├── components/          # Komponen antarmuka (UI, Student, Owner, Auth)
│   ├── lib/                 # Utility murni (Prisma client, Auth Session, Match Score)
│   └── middleware.ts        # Route Guarding & RBAC Middleware
├── e2e/                     # Test suite Playwright End-to-End
├── tests/                   # Test suite Unit Testing
├── docs/                    # Dokumen referensi SKPL & DPPL
├── .env.example             # Contoh konfigurasi koneksi database
└── package.json             # Dependensi dan script proyek
```

---

## 🛑 Menghentikan Layanan Docker

Jika telah selesai mengembangkan aplikasi, Anda dapat menghentikan container database dengan perintah:

```bash
docker compose down
```
*(Data PostgreSQL tetap tersimpan aman di volume `postgres_data`).*
