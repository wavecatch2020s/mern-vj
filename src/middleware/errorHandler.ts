import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const errorHandlerMiddleware = (err, req, res: Response, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "something went wrong, try again later";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
