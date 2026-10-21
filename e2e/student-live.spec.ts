import { test, expect } from "@playwright/test";

test.describe("FitFinder Telkom - Milestone 3: Student Live Data Integration", () => {
  test.beforeEach(async ({ page }) => {
    // Authenticate student session
    await page.context().addCookies([
      {
        name: "fitfinder_session",
        value: encodeURIComponent(
          JSON.stringify({
            id: 1,
            role: "student",
            name: "Arya Pratama",
            email: "student@telkomuniversity.ac.id",
          })
        ),
        domain: "localhost",
        path: "/",
      },
    ]);
  });

  test("Loads live gym cards from PostgreSQL on Discover page", async ({ page }) => {
    await page.goto("/student/home");
    await expect(page.locator("h1")).toContainText("Find your fit.");
    await expect(page.locator("body")).toContainText("Barbell House Sukapura");
    await expect(page.locator("body")).toContainText("Gym Nusantara Ciganitri");
    await expect(page.locator("body")).toContainText("Titan Power Sukabirus");
  });

  test("Filters gyms by location area", async ({ page }) => {
    await page.goto("/student/home");
    // Click Sukapura location pill
    await page.click("button:has-text('SUKAPURA')");
    await expect(page.locator("body")).toContainText("Barbell House Sukapura");
    // Other locations should not be present
    await expect(page.locator("body")).not.toContainText("Gym Nusantara Ciganitri");
  });

  test("Searches gym by equipment keyword", async ({ page }) => {
    await page.goto("/student/home");
    const searchInput = page.locator("input[placeholder*='Cari gym']");
    await searchInput.fill("Smith Machine");
    await expect(page.locator("body")).toContainText("Gym Nusantara Ciganitri");
    await expect(page.locator("body")).not.toContainText("Barbell House Sukapura");
  });

  test("Displays single gym detail with live owner contact WhatsApp link", async ({ page }) => {
    await page.goto("/student/gym/barbell-house");
    await expect(page.locator("h1")).toContainText("Barbell House Sukapura");
    await expect(page.locator("body")).toContainText("Sukapura");
    await expect(page.locator("body")).toContainText("Olympic Barbells");

    const contactButton = page.locator("a:has-text('Contact Gym via WhatsApp')");
    await expect(contactButton).toBeVisible();
    const href = await contactButton.getAttribute("href");
    expect(href).toContain("wa.me");
  });

  test("SKPL-F-06 Empty State: shows alternative recommendations when filter is extreme", async ({ page }) => {
    await page.goto("/student/home");
    const searchInput = page.locator("input[placeholder*='Cari gym']");
    await searchInput.fill("GymXYZNonExistentZone");
    // Wait for SKPL-F-06 empty state alternative recommendation banner
    await expect(page.locator("body")).toContainText("Rekomendasi Alternatif Terdekat (SKPL-F-06)");
  });
});
