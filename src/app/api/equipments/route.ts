import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const equipments = await prisma.equipment.findMany({
      orderBy: { equipmentName: "asc" },
    });

    return NextResponse.json({
      success: true,
      data: equipments,
    });
  } catch (error: unknown) {
    console.error("Equipments API error:", error);
    return NextResponse.json(
      { error: "Gagal memuat master daftar peralatan gym." },
      { status: 500 }
    );
  }
}
