import constants from "../constants";

/**
 * Generate a jest global config filename.
 *
 * @param name name of the global config.
 * @returns the global config filename as string.
 */
const generateJestGlobalConfigFilename = (name: string): string =>
  constants.JEST_GLOBAL_CONFIG_FILE_NAME.replace("{{configName}}", name);

export default generateJestGlobalConfigFilename;
