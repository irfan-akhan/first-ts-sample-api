import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

export const validateRequest =
	(schema: AnySchema) =>
	async (req: Request, res: Response, next: NextFunction) => {
		const { body, params, query } = req;
		try {
			await schema.validate({ body, params, query });
			return next();
		} catch (error: any) {
			return res
				.status(400)
				.json({ message: error.message, error: error });
		}
	};
