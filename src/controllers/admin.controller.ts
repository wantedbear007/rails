import { Request, Response } from "express";
import { HttpStatusCode, TableName } from "../utils/constants";
import ApiResponse from "../utils/apiResponse";
import { generateToken } from "../handlers/jwt.handler";

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
      const { trainName, trainNumber, fairPerKm, fromStation, toStation } = req.body;


      // validations
      if (!trainName || !trainNumber || !fromStation || !fairPerKm || !toStation) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "All fields are required !",
          })
        );

        return;
      }


      let query: string = `INSERT INTO ${TableName.trains} (train_name, total_capacity, speeed)`





      // register in database
    } catch (err) {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      return;
    }
  }
}
