export const salesSummaryLocators = {
  planName: (index: number) => `rate-plan-name-${index}`,
  monthlyPaymentLabel: (index: number) => `[data-testid="summary-rateplan-${index}"]`,
  includesDeviceBullets: (index: number) => `[data-testid="bullet-device-name-${index}"]`,
  monthlySubtotalAmt: "monthly-subtotal-amount",
  monthlyTaxAmt: '[data-testid="total-tax"]',
  monthlyDueValue: '[data-testid="monthly-total-due-value"]',
  rateplanOldPrice: '[data-testid="rateplan-old-price-base"]',
  rateplanNewPrice: '[data-testid="rateplan-price-base"]',
  rateplanSavings: '[data-testid="rateplan-save-base"]',
  ratePlanFeatureBullet: (lineIndex: number, bulletIndex: number) =>
    `[data-testid="summary-feature-${lineIndex}-${bulletIndex}"]`,
};
