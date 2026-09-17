import z from "zod";
import { LoginSchema } from "@/schemas/LoginSchema";

export type ZodIssue = {
	message: string;
	field: string;
};

export type AuthError = {
	type:
		"VALIDATION_ERROR" | "NETWORK_ERROR" | "INVALID_CREDENTIALS" | "UNKNOWN";
	message: string;
	fieldErrors?: ZodIssue[];
};

export type LoginDTO = z.infer<typeof LoginSchema>;

type UserRole = "OWNER" | "CASHIER" | "SUDO";
type UserStatus = "ACTIVE" | "INACTIVE";

export type AuthUser = {
	id: number;
	name: string;
	email: string;
	role: UserRole;
	status: UserStatus;
};
