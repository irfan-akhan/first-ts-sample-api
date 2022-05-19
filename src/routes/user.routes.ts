import { Router } from "express";
import {
	createUserHandler,
	getUsersHandler,
} from "../controllers/user.controllers";
import { hashPassword } from "../middleware/hashPassword";
import { validateRequest } from "../middleware/validateRequest";
import { createUserSchema } from "../schemas/user.schema";
import { verifyToken } from "../middleware/verifyToken";

const userRouter = Router();
userRouter
	.route("/")
	.get(verifyToken, getUsersHandler)
	.post(validateRequest(createUserSchema), hashPassword, createUserHandler);
export = userRouter;
