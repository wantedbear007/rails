import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";

export class BookingController {
  // to search train between routes
  async search(req: Request, res: Response) {
    try {
      const { from, to } = req.body;

      if (!from || !to) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "All fields are required !",
          })
        );

        return;
      }
    } catch (err) {
    } finally {
    }
  }

  // to book trains
  async book(req: Request, res: Response) {
    try {
    } catch (err) {
    } finally {
    }
  }
}
