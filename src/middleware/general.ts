import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";
import { mutexInstance } from "..";

export class GeneralMiddlewares {
  async mutexAvailibality(req: Request, res: Response, next: NextFunction) {
    while (mutexInstance.isLocked()) {
      console.log("hello");
    }

    next();

    // if (mutexInstance.isLocked()) {

    // }
  }
}


