import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  calculateMatchScore,
  type GymMatchData,
  type StudentCriteria,
} from "../../src/lib/match-score";

describe("FitFinder Telkom - IMPAL Unit Testing: calculateMatchScore (SKPL-NF-01)", () => {
  const sampleGym: GymMatchData = {
    id: 1,
    name: "Barbell House Sukapura",
    dailyPrice: 15000,
    monthlyPrice: 120000,
    equipments: ["Power Racks", "Olympic Barbells", "Dumbbells"],
    facilities: ["Motor Area", "Water Refill", "AC", "Locker"],
  };

  it("1. Returns 100% when all criteria (50% tools, 20% facilities, 30% budget) match", () => {
    const criteria: StudentCriteria = {
      requestedEquipments: ["Power Racks", "Dumbbells"],
      requestedFacilities: ["AC", "Water Refill"],
      maxBudget: 20000,
      useMonthlyBudget: false,
    };

    const result = calculateMatchScore(sampleGym, criteria);
    assert.equal(result.matchScore, 100);
    assert.equal(result.toolScore, 1.0);
    assert.equal(result.facilityScore, 1.0);
    assert.equal(result.budgetScore, 1.0);
    assert.equal(result.matchingEquipments.length, 2);
    assert.equal(result.matchingFacilities.length, 2);
  });

  it("2. Accurately weights equipment score at 50% (half matched)", () => {
    // 1 of 2 equipments matched = 0.5 toolScore -> 25% contribution
    // facilities 100% -> 20% contribution
    // budget 100% -> 30% contribution
    // Total = 75%
    const criteria: StudentCriteria = {
      requestedEquipments: ["Power Racks", "Treadmills"], // Treadmills not in sampleGym
      requestedFacilities: ["AC"],
      maxBudget: 20000,
    };

    const result = calculateMatchScore(sampleGym, criteria);
    assert.equal(result.toolScore, 0.5);
    assert.equal(result.facilityScore, 1.0);
    assert.equal(result.budgetScore, 1.0);
    assert.equal(result.matchScore, 75);
    assert.deepEqual(result.matchingEquipments, ["Power Racks"]);
  });

  it("3. Accurately weights facility score at 20% (half matched)", () => {
    // equipments 100% -> 50% contribution
    // 1 of 2 facilities matched = 0.5 facilityScore -> 10% contribution
    // budget 100% -> 30% contribution
    // Total = 90%
    const criteria: StudentCriteria = {
      requestedEquipments: ["Dumbbells"],
      requestedFacilities: ["AC", "Sauna"], // Sauna not in sampleGym
      maxBudget: 20000,
    };

    const result = calculateMatchScore(sampleGym, criteria);
    assert.equal(result.toolScore, 1.0);
    assert.equal(result.facilityScore, 0.5);
    assert.equal(result.budgetScore, 1.0);
    assert.equal(result.matchScore, 90);
    assert.deepEqual(result.matchingFacilities, ["AC"]);
  });

  it("4. Accurately weights budget score at 30% when price exceeds budget", () => {
    // equipments 100% -> 50% contribution
    // facilities 100% -> 20% contribution
    // budget 0% (gym daily 15.000 > maxBudget 10.000) -> 0% contribution
    // Total = 70%
    const criteria: StudentCriteria = {
      requestedEquipments: ["Dumbbells"],
      requestedFacilities: ["AC"],
      maxBudget: 10000,
      useMonthlyBudget: false,
    };

    const result = calculateMatchScore(sampleGym, criteria);
    assert.equal(result.budgetScore, 0.0);
    assert.equal(result.matchScore, 70);
  });

  it("5. Switches between daily and monthly budget comparisons correctly", () => {
    // Monthly price is 120.000
    // Test within budget
    const withinBudget = calculateMatchScore(sampleGym, {
      requestedEquipments: [],
      requestedFacilities: [],
      maxBudget: 150000,
      useMonthlyBudget: true,
    });
    assert.equal(withinBudget.budgetScore, 1.0);
    assert.equal(withinBudget.matchScore, 100);

    // Test exceeding monthly budget
    const overBudget = calculateMatchScore(sampleGym, {
      requestedEquipments: [],
      requestedFacilities: [],
      maxBudget: 100000,
      useMonthlyBudget: true,
    });
    assert.equal(overBudget.budgetScore, 0.0);
    assert.equal(overBudget.matchScore, 70); // 50% + 20% + 0% = 70%
  });

  it("6. Protects against division-by-zero when criteria arrays are empty", () => {
    const emptyCriteria: StudentCriteria = {
      requestedEquipments: [],
      requestedFacilities: [],
    };

    const result = calculateMatchScore(sampleGym, emptyCriteria);
    assert.equal(result.toolScore, 1.0);
    assert.equal(result.facilityScore, 1.0);
    assert.equal(result.budgetScore, 1.0);
    assert.equal(result.matchScore, 100);
    assert.equal(result.matchingEquipments.length, 0);
    assert.equal(result.matchingFacilities.length, 0);
  });

  it("7. Handles empty gym inventory without crashing", () => {
    const emptyGym: GymMatchData = {
      name: "Empty Gym",
      dailyPrice: 10000,
      monthlyPrice: 80000,
      equipments: [],
      facilities: [],
    };

    const result = calculateMatchScore(emptyGym, {
      requestedEquipments: ["Power Racks"],
      requestedFacilities: ["AC"],
      maxBudget: 5000,
    });

    assert.equal(result.toolScore, 0.0);
    assert.equal(result.facilityScore, 0.0);
    assert.equal(result.budgetScore, 0.0);
    assert.equal(result.matchScore, 0);
  });

  it("8. Performs case-insensitive and trimmed substring matching", () => {
    const result = calculateMatchScore(sampleGym, {
      requestedEquipments: ["  power rack  ", "BARBELL"],
      requestedFacilities: ["  ac  ", "LOCKER"],
    });

    assert.equal(result.toolScore, 1.0);
    assert.equal(result.facilityScore, 1.0);
    assert.equal(result.matchScore, 100);
    assert.equal(result.matchingEquipments.length, 2);
    assert.equal(result.matchingFacilities.length, 2);
  });

  it("9. Handles zero or negative budget safely by ignoring budget limit", () => {
    const zeroBudget = calculateMatchScore(sampleGym, {
      requestedEquipments: [],
      requestedFacilities: [],
      maxBudget: 0,
    });
    assert.equal(zeroBudget.budgetScore, 1.0);

    const negBudget = calculateMatchScore(sampleGym, {
      requestedEquipments: [],
      requestedFacilities: [],
      maxBudget: -5000,
    });
    assert.equal(negBudget.budgetScore, 1.0);
  });
});
