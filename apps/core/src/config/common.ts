// pull env variables from .env file
import "dotenv/config";

import * as pkg from "package";

import { type EnvConfig } from "./types";

const config: EnvConfig = {
  name: pkg.name,
  serviceName: pkg.serviceName,
  version: pkg.version,
  environment: process.env.NODE_ENV || "development",
  host: {
    protocol: "http",
    hostname: "localhost",
    port: process.env.PORT || 1984,
  },
  mongo: {
    url:
      process.env.MONGO_URL ??
      "mongodb://127.0.0.1:27017/?directConnection=true&ssl=false",
    db: process.env.MONGO_DB_NAME ?? "employee-manager",
  },
  logger: {
    level: "debug",
    enabled: true,
  },
};

export default config;
