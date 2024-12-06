import { Request, Response } from "express";
import { HttpStatusCode, TableName } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";
import { pgPoolInstance } from "../database";

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

      const { trains, trainRoute, routes } = TableName;

      // check in database
      let query: string = `
      SELECT * FROM ${trains} 
      JOIN ${trainRoute} on ${trains}.train_id = ${trainRoute}.train_id
      JOIN ${routes} on ${routes}.route_id = ${trainRoute}.route_id
      WHERE ${routes}.start_station = $1
      AND ${routes}.end_station = $2
      `;

      let response = await pgPoolInstance.query(query, [
        from.trim(),
        to.trim(),
      ]);

      if ((response.rowCount ?? 0) <= 0) {
        res.status(HttpStatusCode.NOT_FOUND).json(
          new ApiResponse(false, {
            message: "No trains are running on particular route",
          })
        );
        return;
      }

      console.log("response is ", response);
      res.status(200).json(response);

      return;
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        new ApiResponse(false, {
          message: "Internal server error",
        })
      );
      return;
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
