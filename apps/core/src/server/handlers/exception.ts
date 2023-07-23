import { ExitStatus } from "src/types/common/exit-status";

const handleException = async (error: Error): Promise<void> => {
  // importing here so that module resolution would work properly
  const { logger } = await import("core/logger");

  const { message } = error;
  logger.error(error, `UnexpectedError: ${message}`);
  process.exit(ExitStatus.FAILURE);
};

export default handleException;
