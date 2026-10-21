import { test, expect } from "@playwright/test";

test.describe("FitFinder Telkom - Smoke Test", () => {
  test("Redirects root to login page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/.*\/auth\/login-student/);
    await expect(page.locator("h1")).toContainText(/Welcome Back|Auth Sign In/);
  });

  test("Loads Student Home Discover page after authentication", async ({ page }) => {
    // Set student session cookie
    await page.context().addCookies([
      {
        name: "fitfinder_session",
        value: encodeURIComponent(JSON.stringify({ id: 1, role: "student", name: "Arya Pratama" })),
        domain: "localhost",
        path: "/",
      },
    ]);
    await page.goto("/student/home");
    await expect(page.locator("body")).toContainText("Find your fit.");
    await expect(page.locator("body")).toContainText("Barbell House Sukapura");
  });

  test("Loads Owner Dashboard portal after authentication", async ({ page }) => {
    // Set owner session cookie
    await page.context().addCookies([
      {
        name: "fitfinder_session",
        value: encodeURIComponent(JSON.stringify({ id: 2, role: "owner", name: "Taufik Hidayat" })),
        domain: "localhost",
        path: "/",
      },
    ]);
    await page.goto("/owner/dashboard");
    await expect(page.locator("body")).toContainText("Owner Dashboard");
    await expect(page.locator("body")).toContainText("Titan Power Sukabirus");
  });
});
