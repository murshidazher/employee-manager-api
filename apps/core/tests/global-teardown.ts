import { removeDirectory } from '@murshidazher/employee-manager-api-utilities';
import { ExitStatus } from "../src/types/common/exit-status";

import { logger } from "../src/core/logger";
import { getJestTempDir } from "./utils";

const globalTeardown = async (): Promise<void> => {
  try {
    await global.memoryMongoDb.stop();
    logger.info("\n[integration] mongodb instance stopped successfully.");

    const jestTempDir = getJestTempDir();
    removeDirectory(jestTempDir);
    logger.info(`[integration] test temp directory removed successfully.`);
  } catch (error) {
    logger.error(error);
    process.exit(ExitStatus.FAILURE);
  }
};

export default globalTeardown;
