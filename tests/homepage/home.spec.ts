import { test, expect } from "@playwright/test";
import loginContext from "../fixtures/setLoginContext";

test.describe.parallel("Home page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
    await page.waitForLoadState("networkidle");
  });

    test.afterEach(async ({ page }) => {
      console.log(`Finished test: ${test.info().title}`);
    });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check sign in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("grid loads with 9 items", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("search for Thor Hammer", async ({ page }) => {
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    expect(await productGrid.getByRole("link").count()).toBe(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});

loginContext.describe("Home page customer 01 auth", () => {
  loginContext.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  loginContext("visual test authorized", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-customer01.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  loginContext(
    "check customer 01 is signed in",
    async ({ loginFixture, page }) => {
      await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
      await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    }
  );
});
