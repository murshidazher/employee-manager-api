import { logger } from "core/logger";

// seeds
const seedTestDatabase = async (): Promise<void> => {
  logger.info("Running test db seeds...");
  // add default seeds here
  logger.info("Finishing test db seeds...");
};

export default seedTestDatabase;
