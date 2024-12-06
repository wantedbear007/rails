import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRoutes: Router = Router();
const controller: UserController = new UserController();

userRoutes.post("/register", controller.register);
userRoutes.post("/login", controller.login);

export default userRoutes;
