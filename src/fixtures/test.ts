import { test as base, Page } from "@playwright/test";
import { TestHubPage } from "../pages/TestHubPage";
import { ProdLoginPage } from "../pages/ProdLoginPage";
import { scenario1 } from "./scenarios/scenario1";
import { env } from "../config/env";

interface Fixtures {
  mountedMfe: Page;
}

export const test = base.extend<Fixtures>({
  // Makes every test's browser context look human to Cloudflare's bot check.
  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => undefined });
    });
    await use(context);
  },

  mountedMfe: async ({ page }, use) => {
    // Reaching the Test Shell page differs by environment; bootstrap()/mount() don't.
    if (env.testEnv === "production") {
      const prodLogin = new ProdLoginPage(page);
      await prodLogin.login(env.prodEmail!, env.prodPassword!);
    } else {
      await page.goto(env.baseUrl);
    }

    const hub = new TestHubPage(page);
    await hub.bootstrap();
    await hub.mount(scenario1.initialization);
    await use(page);
  },
});

export { expect } from "@playwright/test";
