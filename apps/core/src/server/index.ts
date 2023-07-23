import cors from "cors";
import express, { type Express } from "express";
import router from "./router";

const create = async (): Promise<Express> => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // v1 api routes
  server.use("/v1", router);

  return server;
};

export { create };
