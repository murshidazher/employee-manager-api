import { onSyncDynamicImport } from "@murshidazher/employee-manager-api-utilities";
import { assign } from "radash";

import schema from "src/config/schema";

import * as env from "types/common/environment";

import commonConfig from "./common";
import { type EnvConfig, type Host, type MongoConnection } from "./types";

interface IConfig {
  data: EnvConfig | undefined;
  load: () => void;
  validate: () => void;
}
export class Config implements IConfig {
  data: EnvConfig;

  constructor() {
    this.data = {} as EnvConfig;
  }

  load = (): void => {
    const envConfig = onSyncDynamicImport(
      `src/config/${commonConfig.environment}`
    ) as EnvConfig;
    const localEnvConfig = onSyncDynamicImport(
      `src/config/${commonConfig.environment}.local`
    ) as EnvConfig;

    this.data = assign(assign(commonConfig, envConfig), localEnvConfig);
  };

  isProduction = (): boolean => this.data?.environment === env.PRODUCTION;

  isDevelopment = (): boolean => this.data?.environment === env.DEVELOPMENT;

  isTest = (): boolean => this.data?.environment === env.TEST;

  validate = (): boolean => schema.validate(this.data);
}

const config = new Config();
config.load();

export type { EnvConfig, Host, MongoConnection };
export default config;
