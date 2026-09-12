import { defineConfig, devices } from "@playwright/test";
import { env } from "./src/config/env";

// Playwright test runner configuration.
// Docs: https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: "./tests",
  // Run test files in parallel — each test gets an isolated context, so this is safe.
  fullyParallel: true,
  // Fail the CI build if a stray test.only was committed.
  forbidOnly: !!process.env.CI,
  // Retry only on CI — never mask flakiness locally.
  retries: process.env.CI ? 2 : 0,
  // One worker on CI for stable logs; parallel locally.
  workers: process.env.CI ? 1 : undefined,
  // Terminal progress (list) + browsable HTML report.
  reporter: [["list"], ["html"]],
  use: {
    baseURL: env.baseUrl,
    // Capture a full trace only when a test is retried.
    trace: "on-first-retry",
    // Screenshot only when a test fails.
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
