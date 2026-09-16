import { expect, Page } from "@playwright/test";
import { SalesSummaryItem } from "../types/salesSummary.types";
import { expectedLabel } from "../fixtures/expectedLabels";
import { salesSummaryLocators as loc } from "../locators/salesSummary.locators";

export const validatePaymentPeriod = async function ({
  page,
  item,
  index,
}: {
  page: Page;
  item: SalesSummaryItem;
  index: number;
}) {
  const { paymentPeriod } = item;
  const expectedText = expectedLabel[paymentPeriod!];
  const actualText = await page.locator(loc.monthlyPaymentLabel(index)).textContent();
  expect(actualText).toBe(expectedText);
};
