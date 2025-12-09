import fixture from "./fixture";
import loginContext from "./setLoginContext";
import { test, expect } from "@playwright/test";

fixture.skip("say hello", async ({ whatYouSay }) => {
  console.log("Hello, Playwright!");
});

fixture.skip("say where is my candle", async ({}) => {
  console.log("Where is my candle?");
});

fixture.skip("say goodbye", async ({}) => {
  console.log("Goodbye, Playwright!");
});

loginContext("login and say hello worker01", async ({ loginFixture, workerFixture, page }: { loginFixture: any; workerFixture: any }) => {
  console.log(loginFixture);
  await page.locator("body").screenshot({ path: "example.png" });
  console.log("Hello after login fixture!");
  console.log(workerFixture);
});

loginContext("login and say hello worker02", async ({ loginFixture, workerFixture }: { loginFixture: any; workerFixture: any }) => {
  console.log(loginFixture);
  console.log("Hello after login fixture!");
  console.log(workerFixture);
});

test("just a simple test", async ({ page }) => {
  page.goto("https://playwright.dev/docs/locators");

  await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible();
  await page.getByRole("checkbox", { name: "Subscribe" }).check();

  await expect(page.getByRole("checkbox", { name: "Subscribe" }), "CheckBox is not Checked!").toBeChecked();

  await page.getByRole("button", { name: /submit/i }).click();

  await page.locator("body").getByRole("checkbox", { name: "Subscribe" }).screenshot({ path: "simple-test.png" });
});
