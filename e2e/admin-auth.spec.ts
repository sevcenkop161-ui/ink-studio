import { expect, test } from "@playwright/test";

test.describe("admin auth", () => {
  test("redirects an unauthenticated visitor from a protected route to login", async ({
    page,
  }) => {
    await page.goto("/admin/bookings");
    await expect(page).toHaveURL(/\/admin\/login$/);
  });

  test("shows a generic error for incorrect credentials without revealing which field was wrong", async ({
    page,
  }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/email/i).fill("nobody@example.com");
    await page.getByLabel(/password/i).fill("definitely-wrong-password");
    await page.getByRole("button", { name: /sign in|log in/i }).click();

    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
    // Still on the login page — no session was created.
    await expect(page).toHaveURL(/\/admin\/login$/);
  });
});
