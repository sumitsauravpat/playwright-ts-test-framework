import "dotenv/config";

interface EnvConfig {
  baseUrl: string;
  bootstrap: Record<string, string>;
}

// Fail fast — a missing required env var throws here, not as a confusing
// "undefined" three files away later.
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env var: ${key} (check your .env file)`);
  }
  return value;
}

export const env: EnvConfig = {
  baseUrl: requireEnv("BASE_URL"),
  bootstrap: {
    downstreamEnvironment: "itn01",
    stubUrl: requireEnv("STUB_URL"),
    hostId: "21961",
    transactionId: "84274a92-7628-474e-8e0e-c2b8082eefab",
    mfeProxyUrl: "./PxSalesSummaryApiV1",
    downstreamTargetServer: "",
  },
};
