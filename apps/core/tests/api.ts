import { type Application } from "express";
import request, { type Response } from "supertest";

import { logger } from "src/core/logger";
import * as server from "src/server";
import { type RequestMethod } from "src/types/common/request-method";

export class API {
  app: Application | undefined;
  token: string | null;

  constructor() {
    server
      .create()
      .then((app: Application | undefined) => {
        this.app = app;
      })
      .catch((error: any) => {
        logger.error(error);
      });

    this.token = null;
  }

  requestHttp = async (
    urlSlug: string,
    method: RequestMethod,
    body?: Object
  ): Promise<Response> => {
    const requestMethod = request(this.app)[`${method}`];

    const currentRequest = requestMethod(urlSlug).set({});

    return await currentRequest.send(body);
  };
}

const api = new API();
export default api;
