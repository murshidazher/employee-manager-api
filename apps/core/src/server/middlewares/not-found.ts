import {
  type NextFunction,
  type Request,
  type RequestHandler,
  type Response,
} from "express";

import errorData from "objects/error/data";

const notFound: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  next(
    errorData.newHttpNotFound("The requested URL was not found in this server.")
  );

export default notFound;
