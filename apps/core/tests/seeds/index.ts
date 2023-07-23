import { type Logger } from "pino";

// seeds
const seedTestDatabase = async (logger: Logger): Promise<void> => {
  logger.info("Running test db seeds...");
  // add default seeds here
  logger.info("Finishing test db seeds...");
};

export default seedTestDatabase;
