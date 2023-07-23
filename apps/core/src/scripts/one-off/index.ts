import { onDynamicImport } from "@murshidazher/employee-manager-api-utilities";
import { type Logger } from "pino";

import config from "src/config";

import { ExitStatus } from "types/common/exit-status";

const executeScript = async (
  logger: Logger,
  scriptName: string
): Promise<void> => {
  const args = process.argv.slice(3);

  logger.info(args);

  try {
    logger.info(`Executing the script '${scriptName}'`);
    const Constructor = await onDynamicImport(
      `src/scripts/one-off/${scriptName}`
    );

    const script = new Constructor(scriptName, args);
    await script.run();
  } catch (error) {
    logger.error(
      error,
      `Error occurred while running the script '${scriptName}'`
    );
    process.exit(ExitStatus.FAILURE);
  } finally {
    logger.info(`Bye.`);
    process.exit(ExitStatus.SUCCESS);
  }
};

const execute = async (): Promise<void> => {
  // Load config
  config.load();

  const { logger } = await import("src/core/logger");

  logger.info(`Running a one-off script`);

  const scriptName = process.argv[2];

  if (!scriptName) {
    logger.error("Specify script to run!");
    process.exit(ExitStatus.FAILURE);
  }

  await executeScript(logger, scriptName);
};

void execute();
