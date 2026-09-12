export const testHubLocators = {
  bootstrapButton: "Bootstrap MFE",
  continueButton: "Continue to UI",
  initializeButton: "Initialize",
  mountButton: "Mount",
  initializationField: (name: string) => `input[data-testid="prop-input-mfe-${name}"]`,
  mountedMfe: '[data-testid="sales-summary-mfe"]',
  errorSection: '[data-testid="sales-summary-mfe-error-section"]',
  bootstrapField: (name: string) => `input[data-testid="prop-input-core-${name}"]`,
};
