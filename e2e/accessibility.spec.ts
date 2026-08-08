import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { name: "home (en)", path: "/en" },
  { name: "home (ru)", path: "/ru" },
  { name: "booking", path: "/en/booking" },
  { name: "artist profile", path: "/en/artists/alex" },
  { name: "privacy", path: "/en/privacy" },
  { name: "admin login", path: "/admin/login" },
];

for (const { name, path } of pages) {
  test(`${name} has no automatically detectable a11y violations`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual(
      [],
    );
  });
}
