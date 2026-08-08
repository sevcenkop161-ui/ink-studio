import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 375, height: 800 } });

test.describe("mobile menu", () => {
  test("opens on tap and closes via the close button", async ({ page }) => {
    await page.goto("/en");

    const openButton = page.getByRole("button", { name: "Menu", exact: true });
    await openButton.click();

    const dialog = page.getByRole("dialog", { name: "Menu" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Artists" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    // The panel stays mounted (for the fade-out animation) rather than
    // unmounting, so plain visibility checks don't apply here — what
    // matters is that it's no longer reachable by keyboard/AT once closed.
    await expect(dialog).toHaveJSProperty("inert", true);
  });

  test("closing the menu via a nav link navigates to the section", async ({
    page,
  }) => {
    await page.goto("/en");
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Contacts" }).click();
    await expect(page).toHaveURL(/#contacts$/);
  });
});
