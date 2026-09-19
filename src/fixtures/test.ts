import { test as base, Page } from "@playwright/test";
import { TestHubPage } from "../pages/TestHubPage";
import { scenario1 } from "./scenarios/01_Internet";
import { env } from "../config/env";
import { SalesSummaryResponse } from "../types/salesSummary.types";
import { Scenario } from "../types/scenario";

interface Fixtures {
  mountedMfe: Page;
  salesSummaryResponse: SalesSummaryResponse;
  scenario: Scenario;
}

export const test = base.extend<Fixtures>({
  // In production, load a session captured once via a real manual login
  // (scratch/capture-prod-auth.mjs) — skips the login page (and its Cloudflare
  // check) entirely on every automated run instead of trying to automate it.
  contextOptions: async ({ contextOptions }, use) => {
    if (env.testEnv === "production") {
      await use({ ...contextOptions, storageState: "scratch/prod-auth-state.json" });
    } else {
      await use(contextOptions);
    }
  },

  // Makes every test's browser context look human to Cloudflare's bot check.
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });
    await use(context);
  },

  // salesSummaryResponse is unused directly — listing it here forces Playwright to
  // resolve it (and its mount/login side effects) before page is handed back.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mountedMfe: async ({ page, salesSummaryResponse }, use) => {
    await use(page);
  },

  // scenario needs no dependencies from other fixtures, so its first
  // parameter is deliberately empty — not a mistake ESLint should flag.
  // eslint-disable-next-line no-empty-pattern
  scenario: async ({}, use) => {
    await use(scenario1);
  },

  salesSummaryResponse: async ({ page, scenario }, use) => {
    // Production's context already carries the saved authenticated session,
    // so this goes straight to the app — no login flow to run at all.
    await page.goto(env.testEnv === "production" ? env.prodBaseUrl! : env.baseUrl);

    const hub = new TestHubPage(page);
    await hub.bootstrap();
    const [response] = await Promise.all([
      page.waitForResponse((response) => response.url().includes("getSalesSummaryDetails")),
      hub.mount(scenario.initialization),
    ]);

    const salesSummaryResponseBody = await response.json();
    await use(salesSummaryResponseBody);
  },
});

export { expect } from "@playwright/test";
