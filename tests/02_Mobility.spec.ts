import { test, expect } from "../src/fixtures/test";
import { scenario2 } from "../src/fixtures/scenarios/02_Mobility";
import {
  validatePaymentPeriod,
  validateRatePlanName,
  validateDueMonthlyAmount,
  validateRatePlanFeatureBullets,
  validateRatePlanPricing,
} from "../src/validators/salesSummary.validators";

test.use({ scenario: scenario2 });

test("scenario 2 — validate mobility_1", async ({ mountedMfe, salesSummaryResponse }) => {
  await expect(mountedMfe.getByTestId("sales-summary-mfe")).toBeVisible();

  const salesSummaryItems = salesSummaryResponse.data.salesSummary.salesSummaryItems;
  const dueMonthlyAmount = salesSummaryResponse.data.salesSummary.dueMonthlyNoTaxTotalAmount;

  let rateplanIndex = 0;

  for (const item of salesSummaryItems) {
    if (item.paymentPeriod) {
      await validatePaymentPeriod({ page: mountedMfe, item, index: rateplanIndex });
      const oldPrice = item.ratePlanAndAddOnsNoTaxBaseAmount;
      const newPrice = item.ratePlanAndAddOnsNoTaxAmount;
      const savings =
        item.ratePlanComboDiscountAmount ??
        item.promotionDetails?.[0]?.promotionBenefitDetails[0]?.promotionBenefitNoTaxAmount ??
        0;
      if (rateplanIndex === 0) {
        await validateRatePlanPricing({
          page: mountedMfe,
          index: rateplanIndex,
          oldPrice,
          newPrice,
          savings,
        });
        await validateRatePlanFeatureBullets({
          page: mountedMfe,
          index: rateplanIndex,
          item,
          language: "en",
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
