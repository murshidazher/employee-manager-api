import { type Logger } from "pino";

import config from "src/config";
import { logger } from "src/core/logger";

import dbs from "core/dbs";
import type MongoDB from "core/dbs/mongodb";

import error from "objects/error";

// Load config
config.load();

interface Executable {
  handle: () => Promise<void>;
}

class Script implements Executable {
  #mongo = dbs.mongo;

  #args: string[] = [];

  #scriptName: string;

  #logger: Logger;

  constructor(scriptName: string, args?: string[]) {
    this.#scriptName = scriptName;
    this.#logger = logger;
    this.#args = args ?? [];
  }

  get scriptName(): string {
    return this.#scriptName;
  }

  get args(): string[] {
    return this.#args;
  }

  get logger(): Logger {
    return this.#logger;
  }

  connectMongo = async (): Promise<MongoDB> => {
    await this.#mongo.connect();
    return this.#mongo;
  };

  run = async (): Promise<void> => {
    const scriptName = this.#scriptName;
    this.#logger.info(`${scriptName}: start`);
    try {
      await this.handle();
      this.#logger.info(`${scriptName}: done`);
    } catch (err) {
      this.#logger.error(err, `${scriptName}: error`);
    }
  };

  handle = async (): Promise<void> => {
    error.data.newOperationFailed(
      "This function should be overridden in the child class"
    );
  };
}

export default Script;
