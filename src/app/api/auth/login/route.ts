import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, role } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        gyms: {
          select: { id: true, name: true, slug: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kredensial tidak valid. Akun tidak ditemukan." },
        { status: 401 }
      );
    }

    // 2. Validate role if specified
    if (role && user.role !== role) {
      return NextResponse.json(
        {
          error: `Akun ini terdaftar sebagai ${user.role}, bukan ${role}. Silakan beralih tab.`,
        },
        { status: 403 }
      );
    }

    // 3. Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Kredensial tidak valid. Password salah." },
        { status: 401 }
      );
    }

    // 4. Return safe user info
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      program: user.program,
      studentId: user.studentId,
      phone: user.phone,
      avatar: user.avatar,
      gyms: user.gyms,
    };

    return NextResponse.json({
      success: true,
      message: "Login berhasil.",
      user: safeUser,
    });
  } catch (error: unknown) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server database." },
      { status: 500 }
    );
  }
}
