import httpStatus from "http-status";
import { type Level } from "pino";
import pinoHttp, { type HttpLogger, type Options } from "pino-http";

import config from "src/config";

import { logger } from "core/logger";

import { DEFAULT_ERROR_CODE } from "objects/error/constants";

export const httpLoggerOptions: Options = {
  logger,
  // log based on custom levels
  customLogLevel: (request: any, response: any, error?: Error): Level => {
    const code =
      response?.statusCode || (error ? DEFAULT_ERROR_CODE : httpStatus.OK);

    if (code < 299) return "info";
    if (code < 399) return "warn";
    if (code < 499) return "error";

    return "fatal";
  },
  // log custom properties based on request type
  customProps: (request: any, response: any) => {
    return {
      httpRequest: {
        requestMethod: request.method,
        requestUrl: `${request.protocol}://${request.hostname}${
          request.originalUrl || request.url
        }`,
        status: response.statusCode,
        remoteIp: request.ip,
        referer: request.headers.referer || request.headers.referrer,
        totalRequestsInWindow: request.totalRequestsInWindow,
        latency:
          request.startAt && response.startAt
            ? `${(
                response.startAt[0] -
                request.startAt[0] +
                (response.startAt[1] - request.startAt[1]) * 1e-9
              ).toFixed(3)}s`
            : undefined,
        protocol: `HTTP/${request.httpVersionMajor}.${request.httpVersionMinor}`,
      },
    };
  },
};

export const logRequestMiddleware: HttpLogger = pinoHttp(httpLoggerOptions);
