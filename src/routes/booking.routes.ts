import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";
import { UserMiddleware } from "../middleware/user";
import { GeneralMiddlewares } from "../middleware/general";

const bookingRoute: Router = Router();
const controller: BookingController = new BookingController();
const userMiddleware: UserMiddleware = new UserMiddleware();
const generalMiddleware: GeneralMiddlewares = new GeneralMiddlewares();

bookingRoute.post("/search", controller.search);
bookingRoute.post(
  "/book",
  userMiddleware.verifyToken,
  generalMiddleware.mutexAvailibality,
  controller.book
);

export default bookingRoute;
