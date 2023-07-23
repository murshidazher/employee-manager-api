import type { Request, Response } from "express";
import getVersion from "./api";

export type Http = {
  getVersion: (req: Request, res: Response) => void;
}

const http: Http = {
  getVersion,
};

export default http;
