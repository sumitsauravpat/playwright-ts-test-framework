import { test as base, Page } from "@playwright/test";
import { TestHubPage } from "../pages/TestHubPage";
import { ProdLoginPage } from "../pages/ProdLoginPage";
import { scenario1 } from "./scenarios/01_Internet";
import { env } from "../config/env";
import { SalesSummaryResponse } from "../types/salesSummary.types";

interface Fixtures {
  mountedMfe: Page;
  salesSummaryResponse: SalesSummaryResponse;
}

export const test = base.extend<Fixtures>({
  // Makes every test's browser context look human to Cloudflare's bot check.
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });
    await use(context);
  },

  mountedMfe: async ({ page, salesSummaryResponse }, use) => {
    await use(page);
  },

  salesSummaryResponse: async ({ page }, use) => {
    if (env.testEnv === "production") {
      const prodLogin = new ProdLoginPage(page);
      await prodLogin.login(env.prodEmail!, env.prodPassword!);
    } else {
      await page.goto(env.baseUrl);
    }

    const hub = new TestHubPage(page);
    await hub.bootstrap();
    const [response] = await Promise.all([
      page.waitForResponse((response) => response.url().includes("getSalesSummaryDetails")),
      hub.mount(scenario1.initialization),
    ]);

    const salesSummaryResponseBody = await response.json();
    await use(salesSummaryResponseBody);
  },
});

export { expect } from "@playwright/test";
