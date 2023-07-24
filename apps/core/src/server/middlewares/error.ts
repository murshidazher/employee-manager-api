import { type NextFunction, type Request, type Response } from "express";
import status from "http-status";
import { MongoError } from "mongodb";

import config from "src/config";

import { logger } from "core/logger";

import { ApplicationError } from "objects/error/application-error";

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = err;
  if (!(error instanceof ApplicationError)) {
    const statusCode =
      error.statusCode || error instanceof MongoError
        ? status.BAD_REQUEST
        : status.INTERNAL_SERVER_ERROR;
    const message = error.message || status[statusCode];
    error = new ApplicationError(statusCode, message, {
      extension: { isUserVisible: false },
      stack: err.stack,
    });
  }

  next(error);
};

const errorHandler = (err: any, req: Request, res: Response): void => {
  let { statusCode, message } = err;

  if (config.isProduction() && !err.isUserVisible) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = status[status.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  if (config.isDevelopment()) {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
