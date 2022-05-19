import { NextFunction, Request, Response } from "express";
export function notSupported(req: Request, res: Response, next: NextFunction) {
	if (req.method === "POST" || req.method === "GET") {
		return next();
	}
	return res.status(405).send("PUT, PATCH, DELETE request are not supported");
}
