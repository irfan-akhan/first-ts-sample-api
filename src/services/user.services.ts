import { DocumentDefinition } from "mongoose";
import { IUserDocument } from "../interfaces/user.interfaces";
import { userModel } from "../models/user.model";

export async function createUser(payload: DocumentDefinition<IUserDocument>) {
	try {
		return await userModel.create(payload);
	} catch (error: any) {
		throw new Error(error);
	}
}

export async function getAllUsers() {
	try {
		return await userModel.find({}).select("-password").lean();
	} catch (error: any) {
		throw new Error(error);
	}
}
export async function validatePassword(
	email: IUserDocument["email"],
	password: string
) {
	const user = await userModel.findOne({ email });
	if (!user) {
		return false;
	}
	const isValid = await user.comparePassword(password);
	if (!isValid) {
		return false;
	}
	return user;
}
