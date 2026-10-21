import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateMatchScore, GymMatchData } from "@/lib/match-score";
import { LocationZone } from "@prisma/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const locationParam = searchParams.get("location") || "ALL";
    const equipmentsParam = searchParams.get("equipments") || "";
    const facilitiesParam = searchParams.get("facilities") || "";
    const maxBudgetParam = searchParams.get("maxBudget");
    const budgetType = searchParams.get("budgetType") || "daily"; // 'daily' or 'monthly'

    const requestedEquipments = equipmentsParam
      ? equipmentsParam.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const requestedFacilities = facilitiesParam
      ? facilitiesParam.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const maxBudget = maxBudgetParam ? Number(maxBudgetParam) : undefined;

    // 1. Fetch all gyms from PostgreSQL with relations
    const whereClause: { locationZone?: LocationZone } = {};
    if (locationParam !== "ALL") {
      const matchedZone = Object.values(LocationZone).find(
        (z) => z.toLowerCase() === locationParam.toLowerCase().replace(/\s+/g, "_")
      );
      if (matchedZone) {
        whereClause.locationZone = matchedZone;
      }
    }

    const allGyms = await prisma.gym.findMany({
      where: whereClause,
      include: {
        equipments: {
          include: { equipment: true },
        },
        facilities: true,
      },
    });

    // 2. Map and run Core Engine calculateMatchScore
    const scoredGyms = allGyms.map((g) => {
      const equipmentList = g.equipments.map((eq) => eq.equipment.equipmentName);
      const facilityList = g.facilities.map((fac) => fac.facilityName);

      const matchData: GymMatchData = {
        id: g.id,
        name: g.name,
        dailyPrice: Number(g.dailyPrice),
        monthlyPrice: Number(g.monthlyPrice),
        equipments: equipmentList,
        facilities: facilityList,
      };

      const scoreResult = calculateMatchScore(matchData, {
        requestedEquipments,
        requestedFacilities,
        maxBudget,
        useMonthlyBudget: budgetType === "monthly",
      });

      return {
        id: g.slug,
        dbId: g.id,
        name: g.name,
        location: g.locationZone,
        distance: g.distance,
        daily: `Rp ${Number(g.dailyPrice).toLocaleString("id-ID")}`,
        monthly: `Rp ${Number(g.monthlyPrice).toLocaleString("id-ID")}`,
        dailyPrice: Number(g.dailyPrice),
        monthlyPrice: Number(g.monthlyPrice),
        rating: Number(g.rating).toFixed(1),
        reviews: String(g.reviewsCount),
        image: g.image,
        accent: g.accent,
        description: g.description,
        openingHours: g.openingHours,
        closingHours: g.closingHours,
        ktmDiscount: g.ktmDiscount,
        tags: g.equipments.map((eq) => eq.detail || eq.equipment.equipmentName),
        facilities: g.facilities.map((fac) => fac.facilityName),
        match: scoreResult.matchScore,
        scoreBreakdown: scoreResult,
      };
    });

    // 3. Filter by search query if present
    let filteredGyms = scoredGyms;
    if (query.trim()) {
      const q = query.toLowerCase();
      filteredGyms = scoredGyms.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          g.facilities.some((fac) => fac.toLowerCase().includes(q))
      );
    }

    // 4. Sort by Match Score descending (Auto-Ranked)
    filteredGyms.sort((a, b) => b.match - a.match);

    // 5. SKPL-F-06 Empty State Handling
    // If strict filters return 0 gyms, provide top alternative gyms with advice flag
    let isEmptyStateAlternative = false;
    let finalResults = filteredGyms;

    if (filteredGyms.length === 0 && scoredGyms.length > 0) {
      isEmptyStateAlternative = true;
      // Return top alternatives from all available gyms sorted by baseline score
      finalResults = [...scoredGyms].sort((a, b) => b.match - a.match).slice(0, 3);
    }

    return NextResponse.json({
      success: true,
      totalCount: finalResults.length,
      isEmptyStateAlternative,
      data: finalResults,
    });
  } catch (error: unknown) {
    console.error("Gyms API error:", error);
    return NextResponse.json(
      { error: "Gagal memuat data gym dari database." },
      { status: 500 }
    );
  }
}
