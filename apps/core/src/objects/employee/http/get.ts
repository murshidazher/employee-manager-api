import { type Request, type Response } from "express";

import data from "objects/employee/data";

const get = async (req: Request, res: Response): Promise<void> => {
  const { empId } = req.params;
  const args = empId ? { ids: [empId] } : {};

  const result = await data.get(args);
  res.send({ data: result });
};

export default get;
