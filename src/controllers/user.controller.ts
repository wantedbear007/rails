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
import { pgPoolInstance } from "../database";
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
      const hashedPassowrd = await bcrypt.hash(password.trim(), hashSalt);


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
      const { email, password } = req.body;

      // validations !
      if (!email || !password) {
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

      const _email = email.trim().toLowerCase();

      if (!emailRegex.test(_email)) {
        res
          .status(HttpStatusCode.BAD_REQUEST)
          .json(new ApiResponse(false, { message: "Invalid email addresss" }));
        return;
      }

      // check user existance
      let query: string = `SELECT * FROM ${TableName.userTable} WHERE email = $1`;

      let response = await pgPoolInstance.query(query, [_email]);

      if ((response.rowCount ?? 0) <= 0) {
        res.status(HttpStatusCode.NOT_FOUND).json(
          new ApiResponse(false, {
            message: "You are not registed with the platfrom",
          })
        );
        return;
      }

      const { _name, emailId } = response.rows[0];

      const passwordValid = await bcrypt.compare(
        password,
        response.rows[0].password
      );

      if (!passwordValid) {
        res.status(HttpStatusCode.UNAUTHORIZED).json(
          new ApiResponse(false, {
            message: "Incorrect password",
          })
        );
        return;
      }

      const token: string = generateToken({ name: _name, email: emailId });

      res.status(HttpStatusCode.ACCEPTED).json(
        new ApiResponse(true, {
          data: token,
          message: "Successfully logged in",
        })
      );
    } catch (err) {
      res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .json(
          new ApiResponse(false, { error: "Internal server error, try again" })
        );
    }
  }
}
