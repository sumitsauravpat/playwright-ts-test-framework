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

export async function validateRatePlanName({
  page,
  item,
  index,
  language,
}: {
  page: Page;
  item: SalesSummaryItem;
  index: number;
  language: string;
}) {
  const matchedName = item.ratePlanName?.find((entry) => entry.locale === language);
  const expectedText = matchedName?.name;
  expect(await page.getByTestId(loc.planName(index)).textContent()).toBe(expectedText);
}

export const validateDueMonthlyAmount = async (page: Page, dueMonthlyAmount: number) => {
  const expectedText = `$${dueMonthlyAmount.toFixed(2)} + tax`;
  expect(await page.locator(loc.monthlyDueValue).textContent()).toBe(expectedText);
};

export async function validateIncludesDeviceBullets({
  page,
  item,
  index,
  language,
}: {
  page: Page;
  item: SalesSummaryItem;
  index: number;
  language: string;
}) {
  const expectedBullets = item.deviceDetails?.map(
    (device) => `Includes ${device.deviceName?.find((entry) => entry.locale === language)?.name}`,
  );

  const actualBullets = await page.locator(loc.includesDeviceBullets(index)).allTextContents();
  expect(actualBullets).toEqual(expectedBullets);
}

export async function validateRatePlanPricing({
  page,
  index,
  oldPrice,
  newPrice,
  savings,
}: {
  page: Page;
  index: number;
  oldPrice: number;
  newPrice: number;
  savings: number;
}) {
  const expectedOldPrice = `$${oldPrice.toFixed(2)}`;
  const expectedNewPrice = `$${newPrice.toFixed(2)}`;
  const expectedSavings = `Save $${savings}`;

  const actualOldPrice = await page.locator(loc.rateplanOldPrice).nth(index).textContent();
  const actualNewPrice = await page.locator(loc.rateplanNewPrice).nth(index).textContent();
  const actualSavings = await page.locator(loc.rateplanSavings).nth(index).textContent();
  expect(actualOldPrice).toBe(expectedOldPrice);
  expect(actualNewPrice).toBe(expectedNewPrice);
  expect(actualSavings).toBe(expectedSavings);
}
