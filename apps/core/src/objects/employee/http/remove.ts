import { type Request, type Response } from "express";

import data from "objects/employee/data";

const remove = async (req: Request, res: Response): Promise<void> => {
  const { empId } = req.params;

  if (!empId) {
    res.sendStatus(400).end(`Employee id is required.`);
  }

  const result = await data.remove([empId]);
  res.send({ data: result });
};

export default remove;
