import { logger } from "../src/core/logger";
import { ExitStatus } from "../src/types/common";
import makeDirectory from "../src/utils/make-directory";
import {
  createTestMongoDatabase,
  createTestRedis,
  getJestTempDir,
} from "./utils";

const globalSetup = async (): Promise<void> => {
  try {
    const jestTempDir = getJestTempDir();
    makeDirectory(jestTempDir);
    logger.info(`\n[integration] test temp directory setup successful.`);

    await createTestMongoDatabase(jestTempDir);
    logger.info("[integration] test database setup successful.");
    await createTestRedis(jestTempDir);
    logger.info("[integration] redis setup successful.");
  } catch (error) {
    logger.error(error);
    process.exit(ExitStatus.FAILURE);
  }
};

export default globalSetup;
