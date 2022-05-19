import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import config from "config";
export async function hashPassword(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const password: string = req.body.password;

	try {
		const salt = await bcrypt.genSalt(config.get("saltFactor"));
		const hash = bcrypt.hashSync(password, salt);
		req.body.password = hash;
		return next();
	} catch (error: any) {
		return res.status(500).json({ message: error.message, error });
	}
}
