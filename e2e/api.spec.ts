import { test, expect } from "@playwright/test";

test.describe("FitFinder Telkom - Backend & API Testing", () => {
  test("GET /api/equipments returns master equipment list", async ({ request }) => {
    const res = await request.get("/api/equipments");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data.some((eq: { equipmentName: string }) => eq.equipmentName === "Power Racks")).toBe(true);
  });

  test("GET /api/gyms returns auto-ranked gyms with calculated match scores", async ({ request }) => {
    const res = await request.get("/api/gyms?location=ALL&equipments=Power Racks,Olympic Barbells&maxBudget=150000");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    // Verify match score is between 0 and 100
    for (const gym of body.data) {
      expect(gym.match).toBeGreaterThanOrEqual(0);
      expect(gym.match).toBeLessThanOrEqual(100);
      expect(gym.scoreBreakdown).toBeDefined();
    }
  });

  test("GET /api/gyms/barbell-house returns single gym details", async ({ request }) => {
    const res = await request.get("/api/gyms/barbell-house");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.data.name).toContain("Barbell House");
    expect(body.data.equipments.length).toBeGreaterThan(0);
  });

  test("POST /api/auth/login succeeds with seeded credentials", async ({ request }) => {
    const res = await request.post("/api/auth/login", {
      data: {
        email: "student@telkomuniversity.ac.id",
        password: "TelkomFit2025!",
        role: "student",
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.user.email).toBe("student@telkomuniversity.ac.id");
  });

  test("POST /api/auth/register rejects non-Telkom student email", async ({ request }) => {
    const res = await request.post("/api/auth/register", {
      data: {
        name: "Test Student",
        email: "student@gmail.com",
        password: "Password123!",
        role: "student",
      },
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("telkomuniversity.ac.id");
  });
});
