import { Request, Response } from "express";
import { HttpStatusCode, TableName } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";
import { generateToken } from "../handlers/jwt.handler";
import { pgPoolInstance } from "../database";

export class AdminControllers {
  // to verify admin login
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        let response = new ApiResponse(false, {
          error: "username and password missing",
        });

        res.status(HttpStatusCode.BAD_REQUEST).json(response);
        return;
      }
      if (
        username.trim().toLowerCase() === process.env.ADMIN_USERNAME &&
        password.trim() === process.env.ADMIN_PASSWORD
      ) {
        let token: string = generateToken({ user: username });

        res.status(HttpStatusCode.ACCEPTED).json(
          new ApiResponse(true, {
            data: token,
          })
        );

        return;
      } else {
        res.status(HttpStatusCode.UNAUTHORIZED).json(
          new ApiResponse(false, {
            message: "Username or password is incorrect !",
          })
        );

        return;
      }
    } catch (err) {
      // proper error handling to be implemeted i.e logs etc
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
  }

  // to add new trains to the platform
  async addTrain(req: Request, res: Response) {
    try {
      const {
        trainName,
        fairPerKm,
        fromStation,
        toStation,
        seates,
        speed,
        travelTime,
      } = req.body;

      // validations
      if (
        !trainName ||
        !fromStation ||
        !fairPerKm ||
        !toStation ||
        !seates ||
        !speed ||
        !travelTime
      ) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "All fields are required !",
          })
        );

        return;
      }

      const { routes, trains, trainRoute } = TableName;

      // checking routes
      let query: string = `
        SELECT * FROM ${routes}
        WHERE start_station = $1
        AND end_station = $2
        
      `;

      let response = await pgPoolInstance.query(query, [
        fromStation,
        toStation,
      ]);

      if ((response.rowCount ?? 0) <= 0) {
        res.status(HttpStatusCode.CONFLICT).json(
          new ApiResponse(false, {
            message: "No such routes exist, add new route.",
          })
        );

        return;
      }

      // // transaction to add train
      await pgPoolInstance.query("BEGIN");

      // adding new train
      const insertTrainQuery: string = `
      
      INSERT INTO ${trains} (train_name, total_capacity, speed, price_per_km)
      VALUES ($1, $2, $3, $4)
      RETURNING train_id
      
      `;

      let trainId = await pgPoolInstance.query(insertTrainQuery, [
        trainName,
        seates,
        speed,
        fairPerKm,
      ]);

      const insertIntoRoutes: string = `
        INSERT INTO ${trainRoute} (train_id, route_id, distance, travel_time)
        VALUES ($1, $2, (SELECT total_km FROM ${routes} WHERE route_id = $3), $4)
      `;

      await pgPoolInstance.query(insertIntoRoutes, [
        trainId.rows[0].train_id,
        response.rows[0].route_id,
        response.rows[0].route_id,
        travelTime,
      ]);

      await pgPoolInstance.query("COMMIT");

      res.status(HttpStatusCode.ACCEPTED).json(
        new ApiResponse(true, {
          message: "Train has beenn added sucessfully ",
        })
      );
      return;
    } catch (err) {
      // console.log(err);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
  }

  //  to edit avaiable seats
  async modityTrainSeates(req: Request, res: Response) {
    try {
      const { trainID, numberOfSeats } = req.body;

      if (!trainID || !numberOfSeats) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "All fields are required !",
          })
        );
        return;
      }

      const { trains } = TableName;

      let query: string = `
      UPDATE ${trains}
      SET total_capacity = $1
      WHERE train_id = $2
      `;
      await pgPoolInstance.query(query, [numberOfSeats, trainID]);
      res.status(HttpStatusCode.ACCEPTED).json(
        new ApiResponse(true, {
          message: "Updated data sucessfully.",
        })
      );
    } catch (err) {
      console.log(err);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
  }

  // ADD ROUTE
}
