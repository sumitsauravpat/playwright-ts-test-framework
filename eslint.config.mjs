import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier";

// Flat config: ESLint applies these blocks top to bottom.
export default tseslint.config(
  // 1. Paths ESLint never looks at.
  {
    ignores: ["node_modules/", "playwright-report/", "test-results/", "blob-report/", "scratch/"],
  },

  // 2. ESLint's baseline JS rules.
  js.configs.recommended,

  // 3. TypeScript-aware rules for all .ts files.
  ...tseslint.configs.recommended,

  // 4. Playwright test rules, scoped to the tests folder.
  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.ts"],
  },

  // 5. Last: turn off formatting rules so ESLint never fights Prettier.
  prettier,
);
