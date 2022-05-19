import { object, string, ref } from "yup";

export const createUserSchema = object({
	body: object({
		email: string()
			.required("Email is required")
			.email("Email is not valid"),
		name: string().required("name is required"),
		password: string()
			.required("password is required")
			.min(8, "Password must be atleast 8 characters")
			.matches(
				/^[a-zA-Z0-9.-_]*$/,
				"Password can only contain latin letter."
			),
		confirmPassword: string()
			.required("confirm password is required")
			.oneOf([ref("password"), null], "passwords do not match"),
	}),
});

export const authenticateUserSchema = object({
	body: object({
		email: string()
			.required("Email is required")
			.email("Please enter valid email"),
		password: string().required("Password is required"),
	}),
});
