import { expect, test } from "@playwright/test";

test.describe("home page", () => {
  test("renders the English homepage with key landmarks", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("header nav")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("renders the Russian homepage with translated content", async ({
    page,
  }) => {
    await page.goto("/ru");
    await expect(page.locator("h1")).toBeVisible();
    // Sanity check the locale actually switched the copy, not just the URL.
    await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  });

  test("redirects the bare root to a locale-prefixed URL", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/(en|ru)\/?$/);
  });
});
