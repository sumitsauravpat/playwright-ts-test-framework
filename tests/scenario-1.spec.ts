import { test, expect } from "../src/fixtures/test";

test("scenario 1 — Sales Summary MFE mounts", async ({ mountedMfe }) => {
  await expect(mountedMfe.getByTestId("sales-summary-mfe")).toBeVisible();
});
