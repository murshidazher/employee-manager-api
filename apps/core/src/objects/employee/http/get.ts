import { type Request, type Response } from "express";

import data from "objects/employee/data";

const get = async (req: Request, res: Response): Promise<void> => {
  const result = await data.get(req.body);
  res.send({ data: result });
};

export default get;
