import { Page } from "@playwright/test";
import { prodLoginLocators as loc } from "../locators/prodLogin.locators";
import { env } from "../config/env";

export class ProdLoginPage {
  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.page.goto(env.prodBaseUrl!);
    await this.page.getByLabel(loc.userName).fill(username);
    await this.page.getByLabel(loc.password).fill(password);
    await this.page.locator(loc.logInBtn).click();
    await this.page.waitForURL((url) => !url.href.includes("telus-login-v2"));
    await this.page.goto("about:blank");
    await this.page.goto(env.prodBaseUrl!);
    await this.page.getByTestId("mfe-test-shell-title-main").waitFor();
  }
}
