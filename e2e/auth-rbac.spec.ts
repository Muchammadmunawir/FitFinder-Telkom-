import { test, expect } from "@playwright/test";

test.describe("FitFinder Telkom - Milestone 2: Auth & RBAC Middleware", () => {
  test("Redirects unauthenticated user accessing /student/home to /auth/login-student", async ({ page }) => {
    await page.goto("/student/home");
    await expect(page).toHaveURL(/.*\/auth\/login-student.*/);
  });

  test("Redirects unauthenticated user accessing /owner/dashboard to /auth/login-owner", async ({ page }) => {
    await page.goto("/owner/dashboard");
    await expect(page).toHaveURL(/.*\/auth\/login-owner.*/);
  });

  test("Allows Student login via UI and enforces RBAC isolation", async ({ page }) => {
    await page.goto("/auth/login-student");
    // Click demo fill
    await page.click("text=Isi Kredensial Demo Mahasiswa");
    await page.click("button:has-text('Log In')");

    // Expect to be redirected to /student/home
    await expect(page).toHaveURL(/.*\/student\/home/);
    await expect(page.locator("body")).toContainText("Find your fit.");

    // Check that cookies contain fitfinder_session
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find((c) => c.name === "fitfinder_session");
    expect(sessionCookie).toBeDefined();

    // Verify student cannot access owner dashboard (bounces back to /student/home)
    await page.goto("/owner/dashboard");
    await expect(page).toHaveURL(/.*\/student\/home/);
  });

  test("Allows Owner login via UI and enforces RBAC isolation", async ({ page }) => {
    await page.goto("/auth/login-owner");
    // Click demo fill
    await page.click("text=Isi Kredensial Demo Owner");
    await page.click("button:has-text('Log In')");

    // Expect to be redirected to /owner/dashboard
    await expect(page).toHaveURL(/.*\/owner\/dashboard/);
    await expect(page.locator("body")).toContainText("Owner Dashboard");

    // Verify owner cannot access student home (bounces back to /owner/dashboard)
    await page.goto("/student/home");
    await expect(page).toHaveURL(/.*\/owner\/dashboard/);
  });

  test("Student logout clears session and redirects to login", async ({ page }) => {
    // 1. Login first
    await page.goto("/auth/login-student");
    await page.click("text=Isi Kredensial Demo Mahasiswa");
    await page.click("button:has-text('Log In')");
    await expect(page).toHaveURL(/.*\/student\/home/);

    // 2. Go to profile and log out
    await page.goto("/student/profile");
    await page.click("button:has-text('Log Out')");
    await expect(page).toHaveURL(/.*\/auth\/login-student/);

    // 3. Confirm cannot re-enter protected route
    await page.goto("/student/home");
    await expect(page).toHaveURL(/.*\/auth\/login-student.*/);
  });
});
