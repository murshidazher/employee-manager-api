type Options = {
  throwError?: boolean;
}

/**
 * Dynamically imports files.
 *
 * @param path path string with file extension
 * @param options import options
 * @returns a Promise<any> object.
 */
export const onDynamicImport = async (
  path: string,
  options?: Options
): Promise<any> => {
  try {
    const { default: file } = await import(path);
    return file.default || file;
  } catch (err) {
    if (options?.throwError) throw err;
  }

  return {};
};
