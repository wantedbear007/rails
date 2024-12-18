export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordLength: number = 5;

export const hashSalt: number = 8;

export enum TableName {
  userTable = "users",
  trains = "trains",
  trainRoute = "train_route",
  stationRoute = "station_route",
  routes = "routes",
  bookings = "bookings"
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
