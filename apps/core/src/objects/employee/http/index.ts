import { type Request, type Response } from "express";

import add from "./add";
import get from "./get";
import remove from "./remove";
import update from "./update";

export interface Http {
  add: (req: Request, res: Response) => Promise<void>;
  get: (req: Request, res: Response) => Promise<void>;
  remove: (req: Request, res: Response) => Promise<void>;
  update: (req: Request, res: Response) => Promise<void>;
}

const http: Http = {
  add,
  get,
  remove,
  update,
};

export default http;
