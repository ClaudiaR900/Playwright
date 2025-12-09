import { test, expect } from "@playwright/test";

test("test", { tag: "@sap-page"}, async ({ page }) => {
  await page.goto("https://adg08101.github.io/react-vite/");
  await page.getByRole("link", { name: "Form" }).click();
  await page.getByPlaceholder("Username").click();
  await page.getByPlaceholder("Username").fill("none__");
  await page.getByPlaceholder("Username").press("ArrowLeft");
  await page.getByPlaceholder("Username").fill("none_to_");
  await page.getByPlaceholder("Username").press("ArrowRight");
  await page.getByPlaceholder("Username").fill("none_to_add");
  await page.getByPlaceholder("Username").press("Tab");
  await page.getByPlaceholder("Email").fill("adg08101");
  await page.getByPlaceholder("Email").press("Alt+6");
  await page.getByPlaceholder("Email").press("Alt+4");
  await page.getByPlaceholder("Email").fill("adg08101@gmail./com");
  await page.getByPlaceholder("Email").press("ArrowLeft");
  await page.getByPlaceholder("Email").press("ArrowLeft");
  await page.getByPlaceholder("Email").press("ArrowLeft");
  await page.getByPlaceholder("Email").fill("adg08101@gmail.ccom");
  await page.getByPlaceholder("Email").press("End");
  await page.getByPlaceholder("Email").fill("adg08101@gmail.cco");
  await page.getByPlaceholder("Email").press("ArrowLeft");
  await page.getByPlaceholder("Email").press("ArrowLeft");
  await page.getByPlaceholder("Email").fill("adg08101@gmail.co");
  await page.getByPlaceholder("Email").press("End");
  await page.getByPlaceholder("Email").fill("adg08101@gmail.com");
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Password").fill("noe__");
  await page.getByPlaceholder("Password").press("ArrowLeft");
  await page.getByPlaceholder("Password").fill("noe_to_");
  await page.getByPlaceholder("Password").press("ArrowRight");
  await page.getByPlaceholder("Password").fill("noe_to_add");
  await page.getByRole("combobox").selectOption("Cuba");
  await page.getByRole("button", { name: "Send" }).click();
  await page.locator("div:nth-child(2) > button:nth-child(5)").dblclick();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator("div:nth-child(2) > button").first().click();
  await page.getByRole("heading", { name: "Wireless Mouse" }).click();
  await page.getByText("Total price: $").click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole("button", { name: "Remove" }).click();
});
