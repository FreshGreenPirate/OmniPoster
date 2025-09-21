import { test, expect } from "@playwright/test";

test("homepage renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "OmniPoster" })).toBeVisible();
  await expect(page.getByText("Coordinate every video")).toBeVisible();
});
