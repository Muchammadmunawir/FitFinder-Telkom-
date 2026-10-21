import { test, expect } from "@playwright/test";

test.describe("FitFinder Telkom - Milestone 4: Owner Live Data & Sync", () => {
  test("Loads Owner gym details and saves live updates to PostgreSQL", async ({ page }) => {
    // 1. Authenticate owner session
    await page.context().addCookies([
      {
        name: "fitfinder_session",
        value: encodeURIComponent(
          JSON.stringify({
            id: 2,
            role: "owner",
            name: "Taufik Hidayat",
            email: "partner@titanpower.id",
          })
        ),
        domain: "localhost",
        path: "/",
      },
    ]);

    await page.goto("/owner/profile-edit");
    await expect(page.locator("h1")).toContainText("Edit Gym Profile");
    await expect(page.locator("button:has-text('Save Changes to Database')")).toBeEnabled();

    // 2. Modify daily drop-in price to 12.000
    const dailyInput = page.locator("#dailyPrice");
    await expect(dailyInput).toBeVisible();
    await dailyInput.fill("12.000");

    // 3. Click save
    await page.click("button:has-text('Save Changes to Database')");

    // 4. Verify toast notification appears
    await expect(
      page.locator("text=Perubahan berhasil disimpan ke database PostgreSQL!")
    ).toBeVisible();

    // 5. Cross-portal integration: Switch to student session and check that student sees new price
    await page.context().clearCookies();
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

    await page.goto("/student/home");
    // Titan Power Sukabirus should now reflect Rp 12.000
    await expect(page.locator("body")).toContainText("Rp 12.000");
  });
});
