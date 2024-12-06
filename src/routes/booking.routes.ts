import { Router } from "express";
import { BookingController } from "../controllers/booking.controller";

const bookingRoute: Router = Router();
const controller: BookingController = new BookingController();

bookingRoute.post("/search", controller.search);


export default bookingRoute