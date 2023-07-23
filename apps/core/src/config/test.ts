import { type EnvConfig } from "./types";

const config: DeepPartial<EnvConfig> = {
  host: {
    port: 0,
    connectionsCheckingInterval: 10000,
    gracefulTimeout: 10000,
  },
  mongo: {
    db: process.env.MONGO_DB_NAME ?? "int_test",
  },
  middlewareOptions: {
    restLogger: {
      enabled: false,
    },
  },
  logger: {
    level: "silent",
    enabled: false,
  },
  test: {
    tokens: {
      tenant: "JWT ..",
      admin: "JWT ..",
      owner: "JWT ..",
    },
  },
};

export default config;
