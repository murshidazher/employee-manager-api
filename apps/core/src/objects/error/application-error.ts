import { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MSG } from "./constants";

interface ApplicationErrorExtension {
  isUserVisible?: boolean;
}

export interface ApplicationErrorOptions {
  extension?: ApplicationErrorExtension;
  stack?: string;
}

/**
 * This class is responsible for finding the application errors.
 *
 * Note: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412
 */
export class ApplicationError extends Error {
  statusCode: number;
  extensions: ApplicationErrorExtension;

  /**
   * Creates an API error.
   * @param {number} status - HTTP status code of error.
   * @param {string} message - Error message.
   * @param {ApplicationErrorOptions} options
   * @param {boolean} isUserVisible - Whether the message should be visible to user or not.
   */
  constructor(
    statusCode: number = DEFAULT_ERROR_CODE,
    message: string = DEFAULT_ERROR_MSG,
    options?: ApplicationErrorOptions
  ) {
    super(message);

    this.name = "ApplicationError";
    this.statusCode = statusCode;
    this.extensions = {
      ...options?.extension,
    };

    if (options?.stack) {
      this.stack = options?.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
