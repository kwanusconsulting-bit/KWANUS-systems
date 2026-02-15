import { test, expect } from "@playwright/test";

test("homepage has title text", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("KWanus Systems LLC")).toBeVisible();
});
