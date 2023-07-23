import {
  ApplicationError,
  type ApplicationErrorOptions,
} from "./application-error";
import { DEFAULT_ERROR_CODE, DEFAULT_ERROR_MSG } from "./constants";

/**
 * This class is responsible for finding the user visible errors.
 */
export class UserVisibleError extends ApplicationError {
  constructor(
    statusCode: number = DEFAULT_ERROR_CODE,
    message: string = DEFAULT_ERROR_MSG,
    options?: ApplicationErrorOptions
  ) {
    super(statusCode, message, options);

    this.name = "UserVisibleError";
    this.extensions = {
      isUserVisible: true,
    };
  }
}
