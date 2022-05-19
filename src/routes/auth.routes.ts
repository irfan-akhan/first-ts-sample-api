import { Router } from "express";
import { authenticateUserHandler } from "../controllers/user.controllers";
import { validateRequest } from "../middleware/validateRequest";
import { authenticateUserSchema } from "../schemas/user.schema";

const authRouter = Router();
authRouter
	.route("/")
	.post(validateRequest(authenticateUserSchema), authenticateUserHandler);
export = authRouter;
