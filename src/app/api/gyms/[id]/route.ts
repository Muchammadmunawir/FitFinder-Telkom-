import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;

    // Search by slug first, or parsed integer id
    const isNum = /^\d+$/.test(id);
    const gym = await prisma.gym.findFirst({
      where: isNum
        ? { OR: [{ id: parseInt(id, 10) }, { slug: id }] }
        : { slug: id },
      include: {
        owner: {
          select: { name: true, phone: true, email: true },
        },
        equipments: {
          include: { equipment: true },
        },
        facilities: true,
      },
    });

    if (!gym) {
      return NextResponse.json(
        { error: `Gym dengan ID/slug "${id}" tidak ditemukan.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: gym.slug,
        dbId: gym.id,
        name: gym.name,
        address: gym.address,
        location: gym.locationZone,
        distance: gym.distance,
        daily: `Rp ${Number(gym.dailyPrice).toLocaleString("id-ID")}`,
        monthly: `Rp ${Number(gym.monthlyPrice).toLocaleString("id-ID")}`,
        dailyPrice: Number(gym.dailyPrice),
        monthlyPrice: Number(gym.monthlyPrice),
        rating: Number(gym.rating).toFixed(1),
        reviews: String(gym.reviewsCount),
        image: gym.image,
        accent: gym.accent,
        description: gym.description,
        openingHours: gym.openingHours,
        closingHours: gym.closingHours,
        ktmDiscount: gym.ktmDiscount,
        owner: gym.owner,
        tags: gym.equipments.map((eq) => eq.detail || eq.equipment.equipmentName),
        equipments: gym.equipments.map((eq) => ({
          id: eq.equipmentId,
          name: eq.equipment.equipmentName,
          detail: eq.detail,
        })),
        facilities: gym.facilities.map((fac) => ({
          id: fac.id,
          name: fac.facilityName,
          detail: fac.detail,
        })),
      },
    });
  } catch (error: unknown) {
    console.error("Gym detail API error:", error);
    return NextResponse.json(
      { error: "Gagal memuat rincian gym dari server." },
      { status: 500 }
    );
  }
}
