import cors from "cors";
import express, { type Express } from "express";

import router from "./router";
import { logRequestMiddleware } from "./middlewares/log-request";
import { errorConverter, errorHandler } from "./middlewares/error";
import notFound from "./middlewares/not-found";
import dbs from "core/dbs";
import { logger } from "core/logger";

const create = async (): Promise<Express> => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Connect to mongodb
  logger.info(`[mongodb] establishing connection to mongodb`);
  await dbs.mongo.connect().catch((error) => logger.error(error));

  // Log requests
  server.use(logRequestMiddleware);

  // v1 api routes
  server.use("/v1", router);

   // send back a 404 error for any unknown api request
  server.use(notFound);

  // convert error to ApplicationError, if needed
  server.use(errorConverter);

  // handle error
  server.use(errorHandler);

  return server;
};

export { create };
