import path from "node:path";

import { JEST_TEMP_FOLDER } from "../constants";

/**
 * Gets the jest global test temp directory.
 *
 * @returns the path for jest global temp dir as string.
 */
const getJestTempDir = (): string =>
  path.join(process.env.ROOT_PATH, JEST_TEMP_FOLDER);

export default getJestTempDir;
