interface Options {
  throwError?: boolean;
}

/**
 * Synchronously import dynamic files.
 *
 * @param filePath path string
 * @param options import options
 * @returns any.
 *
 * @throws {err} when the options.throwError flag is true.
 */
export const onSyncDynamicImport = (filePath: string, options?: Options): any => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { default: file } = require(filePath);
    return file?.default || file;
  } catch (err) {
    if (options?.throwError) throw err;
  }

  return {};
};
