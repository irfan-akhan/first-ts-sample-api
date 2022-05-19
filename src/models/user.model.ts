import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserDocument } from "../interfaces/user.interfaces";

const userSchema = new Schema<IUserDocument>(
	{
		email: { type: String, unique: true, required: true },
		name: { type: String, required: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

// methods

userSchema.methods.comparePassword = async function (
	candidatePassword: string
) {
	const User = this as IUserDocument;
	return bcrypt.compare(candidatePassword, User.password).catch((e) => false);
};
export const userModel = model<IUserDocument>("tempUser", userSchema);
