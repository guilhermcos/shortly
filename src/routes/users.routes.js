import { Router } from "express";
import UsersControllers from "../controllers/users.controllers.js";
import tokenValidation from "../middlewares/token.validation.js";

const usersControllers = new UsersControllers();

const usersRouter = Router();

usersRouter.get("/users/me", tokenValidation, usersControllers.getUserSelfInfo);

export default usersRouter;
