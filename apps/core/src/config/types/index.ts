import { type LoggerOptions } from "pino";

import { type Environment } from "types/common/environment";

import { type Host } from "./host";
import { type MongoConnection } from "./mongo-connection";
import { type TestOptions } from "./test-options";

interface EnvConfig {
  name: string;
  serviceName: string;
  version: string;
  logger: LoggerOptions;
  environment: Environment;
  host: Host;
  mongo: MongoConnection;
  test?: TestOptions;
}

export type { EnvConfig, Host, MongoConnection, TestOptions };
