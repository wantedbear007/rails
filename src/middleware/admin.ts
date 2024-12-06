import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";

export class AdminMiddleware {
  checkApiKey(req: Request, res: Response, next: NextFunction) {
    try {
      const apiKey = req.headers["x-api-key"];

      if (!apiKey) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "API key required",
          })
        );
        return;
      }

      if (apiKey == process.env.ADMIN_API_KEY) {
        next();
        return;
      }

      res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json(
        new ApiResponse(false, {
          message: "You are not authorized to perform this operation.",
        })
      );
      return;
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
  }
}
