import jwt from "jsonwebtoken";
import config from "config";
import { IUserDocument } from "../interfaces/user.interfaces";

export async function generateToken(user: IUserDocument) {
	try {
		const token = await jwt.sign(
			{ name: user.name, email: user.email },
			config.get("secretKey"),
			{ expiresIn: config.get("accessTokenTtl") }
		);
		return token;
	} catch (error: any) {
		throw new Error(error);
	}
}
