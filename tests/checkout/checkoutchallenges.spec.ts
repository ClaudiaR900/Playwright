import { test, expect } from "@playwright/test";

test.describe("Solution  to Checkout problem", async () => {
  test.use({ storageState: ".auth/customer01.json" });

  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com");
  });

  test("But now Pay Later", async ({ page }) => {
    await page.getByText("Claw Hammer with Shock Reduction Grip").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("nav-cart").click();
    await page.getByTestId("proceed-1").click();
    await page.getByTestId("proceed-2").click();

    await expect(
      page.locator(".step-indicator").filter({ hasText: "2" }),
    ).toHaveCSS("background-color", "rgb(51, 153, 51)");
    await page.getByTestId("country").selectOption("Angola");
    await page.getByTestId("postal_code").fill("1234");
    await page.getByTestId("house_number").fill("12");
    await page.getByTestId("street").fill("Frami Parkway");
    await page.getByTestId("city").fill("Port Lilliana");
    await page.getByTestId("state").fill("District of Columbia");
    await page.getByTestId("proceed-3").click();

    await expect(page.getByTestId("finish")).toBeDisabled();
    await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
    await page
      .getByTestId("monthly_installments")
      .selectOption("6 Monthly Installments");
    await page.getByTestId("finish").click();
    await expect(page.locator(".help-block")).toHaveText(
      "Payment was successful",
    );
  });
});
