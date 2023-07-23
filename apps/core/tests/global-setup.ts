import { makeDirectory } from "@murshidazher/employee-manager-api-utilities";

import { ExitStatus } from "../src/types/common/exit-status";
import { createTestMongoDatabase, getJestTempDir } from "./utils";

const globalSetup = async (): Promise<void> => {
  try {
    const jestTempDir = getJestTempDir();
    makeDirectory(jestTempDir);

    await createTestMongoDatabase(jestTempDir);
  } catch (error) {
    process.exit(ExitStatus.FAILURE);
  }
};

export default globalSetup;
