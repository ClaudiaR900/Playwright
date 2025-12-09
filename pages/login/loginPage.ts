import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId("email");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-submit");
  }

  async goto() {
    await this.page.goto(`${process.env.URL}${process.env.LOGIN_PREFIX}`);
  }

  async login(email?: string, password?: string) {
    await this.emailInput.fill(email ?? process.env.USER_EMAIL ?? "");
    await this.passwordInput.fill(password ?? process.env.USER_PASSWORD ?? "");
    await this.loginButton.click();
  }
}
