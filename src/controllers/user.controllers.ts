import { Request, Response } from "express";
import {
	createUser,
	getAllUsers,
	validatePassword,
} from "../services/user.services";
import { generateToken } from "../utils/generateToken";

export async function createUserHandler(req: Request, res: Response) {
	try {
		const user = await createUser(req.body);
		return res.status(201).json({ user });
	} catch (error: any) {
		return res.status(409).json({ message: error.message, error });
	}
}
export async function getUsersHandler(req: Request, res: Response) {
	try {
		const users = await getAllUsers();
		return res.status(200).json({ users });
	} catch (error: any) {
		return res.status(500).json({ message: error.message, error });
	}
}

export async function authenticateUserHandler(req: Request, res: Response) {
	// validate user
	const { password, email } = req.body;

	const user = await validatePassword(email, password);
	if (!user) {
		return res
			.status(401)
			.json({ message: "Invalid password or username" });
	}
	// generate token
	try {
		const token = await generateToken(user);
		return res
			.status(200)
			.json({ user: user, accessToken: token, refereshToken: "" });
	} catch (error: any) {
		return res.status(500).json({ error, message: error.message });
	}
	// generate referesh token
	// send response
}
