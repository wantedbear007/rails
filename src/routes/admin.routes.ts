import { Router } from "express";
import { AdminControllers } from "../controllers/admin.controller";
import { AdminMiddleware } from "../middleware/admin";

const adminRoutes = Router();

const controller: AdminControllers = new AdminControllers();
const middleWare: AdminMiddleware = new AdminMiddleware();

adminRoutes.use(middleWare.checkApiKey);
// adminRoutes.use(mi) // addd token based login

adminRoutes.post("/login", controller.login);
adminRoutes.post("/addTrain", controller.addTrain);
adminRoutes.post("/modifyTrain", controller.modityTrainSeates);

export default adminRoutes;
