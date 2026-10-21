import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LocationZone } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ownerIdParam = searchParams.get("ownerId");
    const sessionCookie = request.cookies.get("fitfinder_session")?.value;
    let ownerEmail = "";
    if (sessionCookie) {
      try {
        const session = JSON.parse(decodeURIComponent(sessionCookie));
        ownerEmail = session.email || "";
      } catch {}
    }

    // Target the owner's gym, defaulting to Titan Power for demo partner
    const gym = await prisma.gym.findFirst({
      where: ownerEmail.includes("titan")
        ? { slug: "titan" }
        : ownerIdParam
        ? { ownerId: parseInt(ownerIdParam, 10) }
        : { slug: "titan" },
      include: {
        equipments: {
          include: { equipment: true },
        },
        facilities: true,
      },
    });

    if (!gym) {
      return NextResponse.json(
        { error: "Gym untuk owner ini tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: gym,
    });
  } catch (error: unknown) {
    console.error("Owner gym GET API error:", error);
    return NextResponse.json(
      { error: "Gagal memuat profil gym owner." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      gymId,
      name,
      address,
      locationZone,
      distance,
      dailyPrice,
      monthlyPrice,
      ktmDiscount,
      openingHours,
      closingHours,
      equipmentIds, // array of equipmentId numbers
      facilities, // array of facilityName strings
    } = body;

    const targetGym = await prisma.gym.findFirst({
      where: gymId ? { id: parseInt(gymId, 10) } : undefined,
    });

    if (!targetGym) {
      return NextResponse.json(
        { error: "Gym yang akan diperbarui tidak ditemukan." },
        { status: 404 }
      );
    }

    // 1. Update primary gym details
    const updatedGym = await prisma.gym.update({
      where: { id: targetGym.id },
      data: {
        name: name ?? targetGym.name,
        address: address ?? targetGym.address,
        locationZone: locationZone ? (locationZone as LocationZone) : targetGym.locationZone,
        distance: distance ?? targetGym.distance,
        dailyPrice: dailyPrice !== undefined ? dailyPrice : targetGym.dailyPrice,
        monthlyPrice: monthlyPrice !== undefined ? monthlyPrice : targetGym.monthlyPrice,
        ktmDiscount: ktmDiscount !== undefined ? ktmDiscount : targetGym.ktmDiscount,
        openingHours: openingHours ?? targetGym.openingHours,
        closingHours: closingHours ?? targetGym.closingHours,
      },
    });

    // 2. Update equipment relation if provided
    if (Array.isArray(equipmentIds)) {
      await prisma.gymEquipment.deleteMany({ where: { gymId: targetGym.id } });
      for (const eqId of equipmentIds) {
        await prisma.gymEquipment.create({
          data: {
            gymId: targetGym.id,
            equipmentId: eqId,
          },
        });
      }
    }

    // 3. Update facilities if provided
    if (Array.isArray(facilities)) {
      await prisma.gymFacility.deleteMany({ where: { gymId: targetGym.id } });
      for (const facName of facilities) {
        await prisma.gymFacility.create({
          data: {
            gymId: targetGym.id,
            facilityName: facName,
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Profil dan inventaris gym berhasil diperbarui secara real-time.",
      data: updatedGym,
    });
  } catch (error: unknown) {
    console.error("Owner gym PUT API error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data gym di database." },
      { status: 500 }
    );
  }
}
