import { expect, test } from "@playwright/test";

test.describe("booking wizard", () => {
  test("shows validation errors and blocks progress until the contact form is valid", async ({
    page,
  }) => {
    await page.goto("/en/booking");
    const nextBtn = page.getByRole("button", { name: "Next" });

    // service -> artist -> date -> time, picking the first option each time
    for (let i = 0; i < 4; i++) {
      await page.locator("main button[aria-pressed]").first().click();
      await nextBtn.click();
    }

    await expect(page.locator("main h2")).toHaveText("Your details");

    // Submitting with an empty form should surface validation errors and
    // keep us on this step instead of advancing.
    await page.getByRole("button", { name: "Next" }).click();
    await expect(
      page.getByText("Please enter your name (at least 2 characters)."),
    ).toBeVisible();
    await expect(
      page.getByText("Add a phone number or Telegram username so we can reach you."),
    ).toBeVisible();

    await page.locator("main h2").waitFor();
    await expect(page.locator("main h2")).toHaveText("Your details");
  });

  test("reaches the confirmation summary with the selected details", async ({
    page,
  }) => {
    await page.goto("/en/booking");
    const nextBtn = page.getByRole("button", { name: "Next" });

    const serviceCard = page.locator("main button[aria-pressed]").first();
    const serviceName = await serviceCard.locator("h3").textContent();
    await serviceCard.click();
    await nextBtn.click();

    const artistCard = page.locator("main button[aria-pressed]").first();
    const artistName = await artistCard.locator("h3").textContent();
    await artistCard.click();
    await nextBtn.click();

    await page.locator("main button[aria-pressed]").first().click();
    await nextBtn.click();

    await page.locator("main button[aria-pressed]").first().click();
    await nextBtn.click();

    await page.getByLabel("Name").fill("Test Visitor");
    await page.getByLabel("Phone").fill("+491234567890");
    await nextBtn.click();

    await expect(page.locator("main h2")).toHaveText("Confirm your booking");
    const summary = page.locator("main dl");
    await expect(summary.getByText(serviceName ?? "", { exact: true })).toBeVisible();
    await expect(summary.getByText(artistName ?? "", { exact: true })).toBeVisible();
    await expect(summary.getByText("Test Visitor")).toBeVisible();

    // Intentionally not clicking "Confirm booking" — that submits a real
    // row to the live database, which this suite must not do.
    await expect(
      page.getByRole("button", { name: "Confirm booking" }),
    ).toBeEnabled();
  });
});
