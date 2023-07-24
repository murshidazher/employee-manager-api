import { type Request, type Response } from "express";

import data from "objects/employee/data";

const update = async (req: Request, res: Response): Promise<void> => {
  const { empId } = req.params;

  if (!empId) {
    res.status(400).end(`Employee id is required.`);
  }

  const result = await data.update(empId, req.body);
  res.send({ data: result });
};

export default update;
