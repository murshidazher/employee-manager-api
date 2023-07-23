import { logger } from "core/logger";

const serverStartup = () => (): void => {
  logger.info(`[server:lifecycle] server is ready...`);
};

export default serverStartup;
