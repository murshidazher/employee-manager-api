/**
 * For each of the following errors, refer the doc to see if its the appropriate http status code.
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/412
 */

import status from "http-status";

import { ApplicationError } from "./application-error";
import { UserVisibleError } from "./user-visible-error";

const newHttpNotFound = (message: string): Error => {
  return new ApplicationError(status.NOT_FOUND, `${message}`);
};

const newServerTimeout = (message: string, stack?: string): Error => {
  return new ApplicationError(
    status.GATEWAY_TIMEOUT,
    `GATEWAY_TIMEOUT: ${message}`,
    {
      stack,
    }
  );
};

const newInternalServerError = (message: string, stack?: string): Error => {
  return new ApplicationError(
    status.INTERNAL_SERVER_ERROR,
    `INTERNAL_SERVER_ERROR: ${message}`,
    {
      stack,
    }
  );
};

const newTooManyRequest = (message: string): Error => {
  return new UserVisibleError(
    status.TOO_MANY_REQUESTS,
    `TOO_MANY_REQUESTS: ${message}`
  );
};

const newNotFound = (message: string): Error => {
  return new UserVisibleError(status.NOT_FOUND, `NOT_FOUND: ${message}`);
};

const newRequestTimeout = (message: string): Error => {
  return new UserVisibleError(
    status.REQUEST_TIMEOUT,
    `REQUEST_TIMEOUT: ${message}`
  );
};
const newOperationFailed = (message: string): Error => {
  return new UserVisibleError(
    status.BAD_REQUEST,
    `OPERATION_FAILED: ${message}`
  );
};

const newInvalidInput = (message: string): Error => {
  return new UserVisibleError(status.BAD_REQUEST, `INVALID_INPUT: ${message}`);
};

const newAccessDenied = (message: string): Error => {
  return new UserVisibleError(status.UNAUTHORIZED, `ACCESS_DENIED: ${message}`);
};

const newConflictEntry = (message: string): Error => {
  return new UserVisibleError(status.CONFLICT, `CONFLICT: ${message}`);
};

export default {
  newHttpNotFound,
  newTooManyRequest,
  newInternalServerError,
  newConflictEntry,
  newInvalidInput,
  newAccessDenied,
  newServerTimeout,
  newRequestTimeout,
  newOperationFailed,
  newNotFound,
};
