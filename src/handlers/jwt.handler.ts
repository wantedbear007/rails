// import jwt from 'jsonwebtoken';

import * as jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "default_secret";

export const generateToken = (password: object): string => {
  return jwt.sign(password, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  });
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return "";
  }
};
