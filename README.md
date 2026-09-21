# Playwright + TypeScript Test Automation Framework

A personal portfolio project: an end-to-end and API test automation framework for a web application, built from scratch with [Playwright](https://playwright.dev/) and TypeScript.

The framework validates the application both through the UI and against its live BFF (backend-for-frontend) responses — BFF-first validation, where the UI is asserted against real backend data rather than hardcoded expected values.

## Tech stack

- **Playwright** — browser automation and API request context
- **TypeScript** — typed test code and typed BFF response contracts
- **Node.js**
- **GitHub Actions** — scheduled + on-demand CI pipeline
- **Google Cloud Logging** — real-time test failure logging, authenticated via Workload Identity Federation (no service account key file)

## Prerequisites

- Node.js 22 or later

## Setup

    npm install
    npx playwright install

`npm install` pulls dependencies from `package.json`; `npx playwright install` downloads the browser binaries Playwright drives.

## Running the tests

    npx playwright test

View the HTML report from the last run:

    npx playwright show-report

## CI/CD

A GitHub Actions workflow (`.github/workflows/scheduled-tests.yml`) runs the full suite on demand (`workflow_dispatch`) and is pre-configured — currently paused, ready to re-enable — for a recurring cron schedule. Every run:

1. Checks out the code and installs dependencies (`npm ci`, exact locked versions)
2. Authenticates to GCP via Workload Identity Federation (no downloadable key file — short-lived tokens exchanged directly between GitHub and Google at run time)
3. Installs Playwright's browsers and runs the suite
4. Uploads the HTML report as a downloadable artifact, even on failure

## Failure logging (GCP Cloud Logging)

A custom Playwright reporter (`src/reporters/gcpFailureReporter.ts`) sends a structured entry to Google Cloud Logging for every test that doesn't pass — real test title, real error message, and a `source` label (`local` or `github-actions`) so failures from either environment land in the same searchable place, filterable by where they happened.

The reporter works identically whether triggered from a local run or from CI:

- **Locally** — authenticates via `gcloud auth application-default login` (your own Google identity)
- **In CI** — authenticates via a dedicated service account (`ci-log-writer`, permissioned to write logs only), reached through the same Workload Identity Federation trust relationship used by the CI pipeline itself — scoped to accept tokens from this exact repository only
