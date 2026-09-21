import { Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import { Logging, Log } from "@google-cloud/logging";

export default class GCPLogging implements Reporter {
  log: Log;
  // onTestEnd is "fire and forget" (typed as void, not Promise<void>) — Playwright
  // never awaits it, so writes started there can be cut off when the process exits.
  // We track each write's promise here, then await all of them in onExit(), which
  // Playwright DOES wait for.
  pendingWrites: Promise<unknown>[] = [];

  constructor() {
    const logging = new Logging({ projectId: "project-63ef1455-43c3-461c-a63" });
    this.log = logging.log("ci-failures");
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status !== "passed") {
      const message = `${test.title}, message: ${result.error?.message}`;
      const entry = this.log.entry(
        { severity: "ERROR", labels: { source: process.env.CI ? "github-actions" : "local" } },
        { message },
      );
      this.pendingWrites.push(this.log.write(entry));
    }
  }

  async onExit() {
    await Promise.all(this.pendingWrites);
  }
}
