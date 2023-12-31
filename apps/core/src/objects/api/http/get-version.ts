import { type Request, type Response } from "express";

import data from "objects/api/data";

const getVersion = (req: Request, res: Response): void => {
  res.send({
    data: { version: data.version() },
  });
};

export default getVersion;
