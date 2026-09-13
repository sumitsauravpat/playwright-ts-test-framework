import { Page } from "@playwright/test";
import { testHubLocators as loc } from "../locators/testHub.locators";
import { env } from "../config/env";

export class TestHubPage {
  constructor(private page: Page) {}

  async bootstrap() {
    for (const [key, value] of Object.entries(env.bootstrap)) {
      await this.page.locator(loc.bootstrapField(key)).fill(value);
    }
    await this.page.getByRole("button", { name: loc.bootstrapButton }).click();
    await this.page.getByRole("button", { name: loc.continueButton }).click();
  }

  async mount(initialization: Record<string, string>) {
    for (const [key, value] of Object.entries(initialization)) {
      await this.page.locator(loc.initializationField(key)).fill(value);
    }
    await this.page.getByRole("button", { name: loc.initializeButton }).click();
    await this.page.getByRole("button", { name: loc.mountButton }).click();
    await this.page.locator(loc.mountedMfe).waitFor();
  }
}
