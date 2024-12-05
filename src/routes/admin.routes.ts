import { Router } from "express";
import { AdminControllers } from "../controllers/admin.controller";
import { AdminMiddleware } from "../middleware/admin";

const adminRoutes = Router();

const controller: AdminControllers = new AdminControllers();
const middleWare: AdminMiddleware = new AdminMiddleware();

adminRoutes.post("/login", middleWare.checkApiKey, controller.login);
adminRoutes.post("/addTrain", middleWare.checkApiKey, controller.addTrain);

export default adminRoutes;
