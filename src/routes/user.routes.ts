import { Router } from "express";
import { UserController } from "../controllers/user.controller";


const userRoutes: Router = Router()
const controller: UserController = new UserController();


userRoutes.post("/register", controller.register)

export default userRoutes