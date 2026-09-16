import { test, expect } from "../src/fixtures/test";
import { validatePaymentPeriod } from "../src/validators/salesSummary.validators";

test("scenario 1 — validate internet_1", async ({ mountedMfe, salesSummaryResponse }) => {
  await expect(mountedMfe.getByTestId("sales-summary-mfe")).toBeVisible();
  const salesSummaryItems = salesSummaryResponse.data.salesSummary.salesSummaryItems;
  let rateplanIndex = 0;
  for (const item of salesSummaryItems) {
    if (item.paymentPeriod) {
      await validatePaymentPeriod({ page: mountedMfe, item: item, index: rateplanIndex });
      rateplanIndex++;
    }
  }
});
