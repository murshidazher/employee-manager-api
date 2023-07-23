import { removeDirectory } from "@murshidazher/employee-manager-api-utilities";

import { ExitStatus } from "../src/types/common/exit-status";
import { getJestTempDir } from "./utils";

const globalTeardown = async (): Promise<void> => {
  try {
    await global.memoryMongoDb.stop();

    const jestTempDir = getJestTempDir();
    removeDirectory(jestTempDir);
  } catch (error) {
    process.exit(ExitStatus.FAILURE);
  }
};

export default globalTeardown;
