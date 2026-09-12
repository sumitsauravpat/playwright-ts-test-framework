# Playwright + TypeScript Test Automation Framework

A personal portfolio project: an end-to-end and API test automation framework for a web application, built from scratch with [Playwright](https://playwright.dev/) and TypeScript.

The framework validates the application both through the UI and against its live BFF (backend-for-frontend) responses — BFF-first validation, where the UI is asserted against real backend data rather than hardcoded expected values.

## Tech stack

- **Playwright** — browser automation and API request context
- **TypeScript** — typed test code and typed BFF response contracts
- **Node.js**

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
