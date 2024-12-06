import { Request, Response } from "express";
import {
  emailRegex,
  hashSalt,
  HttpStatusCode,
  passwordLength,
  TableName,
} from "../utils/constants";
import ApiResponse from "../utils/apiResponse";
import * as bcrypt from "bcrypt";
import { pgInstance, pgPoolInstance } from "../database";
import { generateToken } from "../handlers/jwt.handler";

export class UserController {
  // to create acc
  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      // add validation with zod
      if (!name || !email || !password) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(
            new ApiResponse(false, { message: "All fields are mandatory !" })
          );
        return;
      }

      if (password.length < passwordLength) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: `password size should exceed ${passwordLength}`,
          })
        );
        return;
      }

      const _name = name.trim();
      const _email = email.trim().toLowerCase();

      if (!emailRegex.test(_email)) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(new ApiResponse(false, { message: "Invalid email addresss" }));
        return;
      }

      // check if username email is already registered
      let query: string = `select * from ${TableName.userTable} where email = $1`;
      let dbResponse = await pgPoolInstance.query(query, [_email]);

      if ((dbResponse.rowCount ?? 0) > 0) {
        res.status(HttpStatusCode.BAD_REQUEST).json(
          new ApiResponse(false, {
            message: "Email is already taken !",
          })
        );
        return;
      }

      // hasing password
      const hashedPassowrd = bcrypt.hash(password.trim(), hashSalt);

      query = `INSERT INTO ${TableName.userTable} (name, email, password) VALUES ($1, $2, $3)`;

      dbResponse = await pgPoolInstance.query(query, [
        _name,
        _email,
        hashedPassowrd,
      ]);

      const token = generateToken({ name: _name, email: _email });

      res.status(HttpStatusCode.CREATED).json(
        new ApiResponse(true, {
          data: token,
          message: "Account created successfully",
        })
      );

      return;
    } catch (err) {
      console.log(err);
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(false, { error: "Internal server error, try again" })
        );
      return;
    }
  }

  // to login
  async login(req: Request, res: Response) {
    try {

      const {email, password} = req.body;

      

    } catch (err) {
    } finally {
    }
  }
}
