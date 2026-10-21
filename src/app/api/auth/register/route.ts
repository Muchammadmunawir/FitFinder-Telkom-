import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role, program, studentId, phone } = body;

    // 1. Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password minimal harus 8 karakter." },
        { status: 400 }
      );
    }

    // 2. Validate Student institutional email domain
    const normalizedRole = role === "owner" ? Role.owner : Role.student;
    if (normalizedRole === Role.student) {
      const emailDomain = email.toLowerCase().split("@")[1] || "";
      const isTelkomDomain =
        emailDomain === "telkomuniversity.ac.id" ||
        emailDomain.endsWith(".telkomuniversity.ac.id");

      if (!isTelkomDomain) {
        return NextResponse.json(
          {
            error:
              "Pendaftaran student wajib menggunakan email Telkom University (@telkomuniversity.ac.id).",
          },
          { status: 400 }
        );
      }
    }

    // 3. Check for existing email
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: normalizedRole,
        program: program || (normalizedRole === Role.student ? "S1 Informatika" : null),
        studentId: studentId || (normalizedRole === Role.student ? "1301210000" : null),
        phone: phone || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        program: true,
        studentId: true,
        phone: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Akun berhasil didaftarkan.",
        user,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server database." },
      { status: 500 }
    );
  }
}
