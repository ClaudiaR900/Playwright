import { test as base, expect } from "@playwright/test";

type LoginContext = {
  loginFixture: string;
};

type WorkerContext = {
  workerFixture: string;
};

const loginContext = base.extend<LoginContext, WorkerContext>({
  loginFixture: async ({ page, context }, use: any) => {
    // Setup code for the fixture can go here

    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const customer01AuthFile = ".auth/customer01_fixture.json";
    const baseURL = "https://practicesoftwaretesting.com/auth/login";

    await page.goto(baseURL);

    await page.getByTestId("email").fill(email);
    await page.getByTestId("password").fill(password);
    await page.getByTestId("login-submit").click();

    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
    await context.storageState({ path: customer01AuthFile });

    // end of base coding
    await use();
    console.log("Tearing down login fixture with context.");
  },
  workerFixture: [
    async ({}, use: any, workerInfo) => {
      const message = `Setting up worker fixture. ${workerInfo.workerIndex}`;
      console.log(message);
      // Setup code for the worker fixture can go here
      await use(message);
      console.log("Tearing down worker fixture.");
    },
    { scope: "worker" },
  ],
});

export default loginContext;
