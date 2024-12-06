import { Request, Response } from "express";
import { HttpStatusCode, TableName } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";
import { pgPoolInstance } from "../database";
import { mutexInstance } from "..";

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

      const allTrains = response.rows.map((val) => val);
      res.status(HttpStatusCode.ACCEPTED).json(
        new ApiResponse(true, {
          data: allTrains,
        })
      );

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
    // to handle race condtions !
    const currentMutex = await mutexInstance.acquire();
    try {
      const { from, to, train_id, date, user_id, name } = req.body;
      // validators
      if (!from || !to || !train_id || !date) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "All fields are required !",
          })
        );
        return;
      }

      if (typeof train_id != "number" || !Number.isInteger(train_id)) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "Train id is not valid !",
          })
        );
        return;
      }

      const { trains, bookings, routes } = TableName;

      // creating a transactionG
      await pgPoolInstance.query("BEGIN");

      // update available seats
      const updateQuery = `
          UPDATE ${trains}
          SET total_capacity = total_capacity - 1
          WHERE train_id = $1;
      `;
      await pgPoolInstance.query(updateQuery, [train_id]);

      const kmsQuery = `
       SELECT total_km
       FROM ${routes}
       WHERE start_station = $1 AND  end_station = $2
      `;

      const aaa = await pgPoolInstance.query(kmsQuery, [
        from,
        to,
      ]);

      // adding to bookings
      const insertQuery = `
          INSERT INTO ${bookings} (user_id, from_location, to_location, doj, passenger_name, price_paid)
          VALUES ($1, $2, $3, $4, $5, (SELECT price_per_km from ${trains} WHERE train_id = $6) * $7);
      `;

      await pgPoolInstance.query(insertQuery, [
        user_id,
        from,
        to,
        date,
        name,
        train_id,
        aaa.rows[0].total_km,
      ]);

      // Commit transaction
      await pgPoolInstance.query("COMMIT");

      res.status(HttpStatusCode.CREATED).json(
        new ApiResponse(true, {
          message: "Your ticket was sucessfully booked !",
        })
      );
    } catch (err) {
      console.log("error is: ", err);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
        new ApiResponse(false, {
          message: "Internal server error",
        })
      );
      return;
    } finally {
      currentMutex();
    }
  }
}
