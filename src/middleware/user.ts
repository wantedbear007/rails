import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";
import { verifyToken } from "../handlers/jwt.handler";

export class UserMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers["token"];

      if (!token) {
        res.status(HttpStatusCode.UNAUTHORIZED).json(
          new ApiResponse(false, {
            message: "You are not authorized !",
          })
        );

        return;
      }

      let tokenVerification = verifyToken(token.toString());

      if (tokenVerification) {
        next();
        return;
      }

      res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json(
        new ApiResponse(false, {
          message: "You are not authorized to perform this operation.",
        })
      );
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
  }
}
