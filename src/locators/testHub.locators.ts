// These 6 initialization fields render under the test hub's "core" section,
// not "mfe" — everything else on the initialize form uses "mfe".
const CORE_SECTION_FIELDS = new Set([
  "mfeBrand",
  "mfeContentfulConfig",
  "mfeLang",
  "mfeSnapshotID",
  "mfeTheme",
  "mfeUnleashOverrideConfig",
]);

export const testHubLocators = {
  bootstrapButton: "Bootstrap MFE",
  continueButton: "Continue to UI",
  initializeButton: "Initialize",
  mountButton: "Mount",
  initializationField: (name: string) => {
    const prefix = CORE_SECTION_FIELDS.has(name) ? "core" : "mfe";
    return `input[data-testid="prop-input-${prefix}-${name}"]`;
  },
  mountedMfe: '[data-testid="sales-summary-mfe"]',
  errorSection: '[data-testid="sales-summary-mfe-error-section"]',
  bootstrapField: (name: string) => `input[data-testid="prop-input-core-${name}"]`,
};
