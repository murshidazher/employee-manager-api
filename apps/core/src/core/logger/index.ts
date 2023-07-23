import path from "node:path";

import Pino, { type Logger, type LoggerOptions } from "pino";

import config from "src/config";

const loggerOptions: LoggerOptions = {
  name: config.data.name,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  level: config.data.logger.level,
  enabled: config.data.logger.enabled,
};

/**
 * Never use this directly instead use request.log.*.
 * This is because you wouldn't be able to trace the request if we directly use this module.
 *
 * More info on redact: https://getpino.io/#/docs/redaction
 */
const logger: Logger = Pino(loggerOptions);

const childLogger = (filename: string): Logger => {
  const relativeFilename = path.relative(path.join(__dirname, ".."), filename);
  const parts = path.dirname(relativeFilename).split(path.sep);
  parts.push(path.basename(relativeFilename, path.extname(relativeFilename)));
  return logger.child({
    logger: parts.join("#"),
  });
};

export { logger, childLogger, loggerOptions };
