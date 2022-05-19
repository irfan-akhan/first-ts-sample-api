import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import config from "config";

export const verifyToken = async function (
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers.authorization?.split(" ")[1] || null;
	if (!token) {
		return res.status(403).json({ message: "Forbidden" });
	}
	try {
		const valid = jwt.verify(token, config.get("secretKey"));
		if (!valid) {
			return res.status(403).json({ message: "Forbidden" });
		}
		return next();
	} catch (error: any) {
		return res.status(401).json({ message: error.message, error: error });
	}
};
