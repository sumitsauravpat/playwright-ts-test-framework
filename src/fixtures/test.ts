import { test as base, Page } from "@playwright/test";
import { TestHubPage } from "../pages/TestHubPage";
import { scenario1 } from "./scenarios/scenario1";

interface Fixtures {
  mountedMfe: Page;
}

export const test = base.extend<Fixtures>({
  mountedMfe: async ({ page }, use) => {
    const hub = new TestHubPage(page);
    await hub.bootstrap();
    await hub.mount(scenario1.initialization);
    await use(page);
  },
});

export { expect } from "@playwright/test";
