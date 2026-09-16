import { test, expect } from "../src/fixtures/test";
import {
  validatePaymentPeriod,
  validateRatePlanName,
  validateDueMonthlyAmount,
  validateIncludesDeviceBullets,
  validateRatePlanPricing,
} from "../src/validators/salesSummary.validators";

test("scenario 1 — validate internet_1", async ({ mountedMfe, salesSummaryResponse }) => {
  await expect(mountedMfe.getByTestId("sales-summary-mfe")).toBeVisible();
  const salesSummaryItems = salesSummaryResponse.data.salesSummary.salesSummaryItems;
  const dueMonthlyAmount = salesSummaryResponse.data.salesSummary.dueMonthlyNoTaxTotalAmount;
  let rateplanIndex = 0;
  for (const item of salesSummaryItems) {
    if (item.paymentPeriod) {
      await validatePaymentPeriod({ page: mountedMfe, item: item, index: rateplanIndex });

      const oldPrice = item.ratePlanAndAddOnsNoTaxBaseAmount;
      const newPrice = item.ratePlanAndAddOnsNoTaxAmount;
      const savings =
        item.promotionDetails?.[0]?.promotionBenefitDetails[0]?.promotionBenefitNoTaxAmount ?? 0;

      if (rateplanIndex === 0) {
        await validateIncludesDeviceBullets({
          page: mountedMfe,
          item: item,
          index: rateplanIndex,
          language: "en",
        });

        await validateRatePlanPricing({
          page: mountedMfe,
          index: rateplanIndex,
          oldPrice,
          newPrice,
          savings,
        });
      }
      await validateRatePlanName({
        page: mountedMfe,
        item: item,
        index: rateplanIndex,
        language: "en",
      });
      rateplanIndex++;
    }
  }

  await validateDueMonthlyAmount(mountedMfe, dueMonthlyAmount);
});
