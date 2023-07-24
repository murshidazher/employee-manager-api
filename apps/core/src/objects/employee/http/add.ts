import { type Request, type Response } from "express";

import data from "objects/employee/data";

const add = async (req: Request, res: Response): Promise<void> => {
  const result = await data.add(req.body);
  res.send({ data: result });
};

export default add;
