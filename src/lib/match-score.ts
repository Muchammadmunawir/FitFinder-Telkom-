/**
 * Core Engine Layer - FitFinder Telkom
 * Pure function to calculate Match Score according to SKPL & DPPL IMPAL specifications.
 * 
 * Formula:
 * Match Score = (Skor Alat * 50%) + (Skor Fasilitas * 20%) + (Skor Budget * 30%)
 */

export type GymMatchData = {
  id?: number | string;
  name: string;
  dailyPrice: number;
  monthlyPrice: number;
  equipments: string[];
  facilities: string[];
};

export type StudentCriteria = {
  requestedEquipments: string[];
  requestedFacilities: string[];
  maxBudget?: number;
  useMonthlyBudget?: boolean; // false = daily pass comparison, true = monthly pass
};

export type MatchScoreResult = {
  matchScore: number; // 0 - 100
  toolScore: number;  // 0 - 1.0
  facilityScore: number; // 0 - 1.0
  budgetScore: number; // 0 - 1.0
  matchingEquipments: string[];
  matchingFacilities: string[];
};

export function calculateMatchScore(
  gym: GymMatchData,
  criteria: StudentCriteria
): MatchScoreResult {
  // Normalize strings for case-insensitive matching
  const normalizedGymEquipments = gym.equipments.map((e) => e.toLowerCase().trim());
  const normalizedGymFacilities = gym.facilities.map((f) => f.toLowerCase().trim());

  // 1. Tool / Equipment Score (Bobot 50%)
  const requestedEquipments = criteria.requestedEquipments || [];
  const matchingEquipments: string[] = [];

  let toolScore = 1.0;
  if (requestedEquipments.length > 0) {
    for (const req of requestedEquipments) {
      const normalizedReq = req.toLowerCase().trim();
      const isMatch = normalizedGymEquipments.some(
        (eq) => eq.includes(normalizedReq) || normalizedReq.includes(eq)
      );
      if (isMatch) {
        matchingEquipments.push(req);
      }
    }
    // Prevent division by zero
    toolScore = matchingEquipments.length / requestedEquipments.length;
  }

  // 2. Facility Score (Bobot 20%)
  const requestedFacilities = criteria.requestedFacilities || [];
  const matchingFacilities: string[] = [];

  let facilityScore = 1.0;
  if (requestedFacilities.length > 0) {
    for (const req of requestedFacilities) {
      const normalizedReq = req.toLowerCase().trim();
      const isMatch = normalizedGymFacilities.some(
        (fac) => fac.includes(normalizedReq) || normalizedReq.includes(fac)
      );
      if (isMatch) {
        matchingFacilities.push(req);
      }
    }
    // Prevent division by zero
    facilityScore = matchingFacilities.length / requestedFacilities.length;
  }

  // 3. Budget Score (Bobot 30%)
  // Rule: Harga Gym <= Budget Mahasiswa -> 1.0 (100%), Harga Gym > Budget -> 0.0 (0%)
  let budgetScore = 1.0;
  if (criteria.maxBudget && criteria.maxBudget > 0) {
    const gymPrice = criteria.useMonthlyBudget ? gym.monthlyPrice : gym.dailyPrice;
    budgetScore = gymPrice <= criteria.maxBudget ? 1.0 : 0.0;
  }

  // Calculate final weighted score
  const totalFraction = toolScore * 0.5 + facilityScore * 0.2 + budgetScore * 0.3;
  const matchScore = Math.round(totalFraction * 100);

  return {
    matchScore,
    toolScore: Number(toolScore.toFixed(2)),
    facilityScore: Number(facilityScore.toFixed(2)),
    budgetScore,
    matchingEquipments,
    matchingFacilities,
  };
}
