import { test, expect } from "@playwright/test";

test.describe("Home page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(
      "home-page-no-auth-chromium-win32.png",
      {
        mask: [page.getByTitle("Practice Software Testing - Toolshop")],
      },
    );
  });
  test("check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0",
    );
  });

  test("grid loads with 9 items", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
  });

  test("Search for Thor Hammer and check the result", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
    await expect(productGrid.getByTestId("product-price")).toBeVisible();
  });

  test("Search for Pliers and check the result", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Pliers");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(4);
    await expect(page.getByAltText("Long Nose Pliers")).toBeVisible();

    //    await expect(page.getByTestId('product-01KRBNDCHCC5QYYNCSXPXGEP6Q')).toBeVisible();
    //    const product = page.getByTestId('product-01KRBNDCHCC5QYYNCSXPXGEP6Q');
    //    await expect(product.getByTestId('product-name')).toHaveText('Combination Pliers');
    //    await expect(product.getByTestId('product-price')).toHaveText('$14.15');
    //    await expect(product.getByTestId('co2-rating-badge')).toBeVisible();
    //    await expect(product.getByTestId('co2-rating-badge')).toHaveText('ABCDE');
  });
});

test.describe("Home page customer 01 auth", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test authorized", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot(
      "home-page-customer01-chromium-win32.png",
      {
        mask: [page.getByTitle("Practice Software Testing - Toolshop")],
      },
    );
  });

  test("check customer 01 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });
});
