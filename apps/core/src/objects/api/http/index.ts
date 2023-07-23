import { type Request, type Response } from "express";

import getVersion from "./get-version";

export interface Http {
  getVersion: (req: Request, res: Response) => void;
}

const http: Http = {
  getVersion,
};

export default http;
