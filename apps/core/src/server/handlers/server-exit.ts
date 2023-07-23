import type http from "node:http";

import { ExitStatus } from "src/types/common/exit-status";

import { logger } from "core/logger";

interface ServerExistOptions {
  signal?: string;
  app?: http.Server;
}

const handleServerExit = (options: ServerExistOptions = {}): void => {
  const { signal, app } = options;
  if (signal) logger.warn(`[server:lifecycle] '${signal}' signal received!`);

  if (app) {
    app.close((err?: Error | undefined) => {
      logger.error(err, "[server:lifecycle] server close handler exception.");
      process.exit(ExitStatus.SUCCESS);
    });
  } else {
    process.exit(ExitStatus.FAILURE);
  }
};

export default handleServerExit;
