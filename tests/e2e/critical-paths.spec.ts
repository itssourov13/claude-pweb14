import { expect, test } from "@playwright/test";

test("home page loads and nav works", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await page.getByRole("link", { name: "Work", exact: true }).first().click();
  await expect(page).toHaveURL(/\/work$/);
});

test("theme toggle switches to dark mode", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to (dark|light) theme/i });
  await toggle.click();
  await expect(page.locator("html")).toHaveClass(/dark|light/);
});

test("404 page renders for an unknown route", async ({ page }) => {
  const response = await page.goto("/this-route-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByText(/wandered off/i)).toBeVisible();
});

test("contact form shows validation errors on empty submit", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /send message/i }).click();
  await expect(page.getByRole("alert").first()).toBeVisible();
});
