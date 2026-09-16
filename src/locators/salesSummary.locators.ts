export const salesSummaryLocators = {
  planName: (index: number) => `rate-plan-name-${index}`,
  monthlyPaymentLabel: (index: number) => `[data-testid="summary-rateplan-${index}"]`,
  includesDeviceBullets: (index: number) => `[data-testid="bullet-device-name-${index}"]`,
  monthlySubtotalAmt: "monthly-subtotal-amount",
  monthlyTaxAmt: '[data-testid="total-tax"]',
  monthlyDueValue: '[data-testid="monthly-total-due-value"]',
};
