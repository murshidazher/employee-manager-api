import { type EnvConfig } from "./types";

const config: DeepPartial<EnvConfig> = {
  host: {
    port: 0,
  },
  mongo: {
    db: process.env.MONGO_DB_NAME ?? "int_test",
  },
  logger: {
    level: "silent",
    enabled: false,
  },
};

export default config;
