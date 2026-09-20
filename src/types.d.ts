import z from "zod";
import { LoginSchema } from "@/schemas/LoginSchema";

export type ZodIssue = z.core.$ZodIssue;
export type ZodParseResult = z.ZodSafeParseResult<z.output<typeof schema>>;

export type AppError = {
	type:
		"VALIDATION_ERROR" | "NETWORK_ERROR" | "INVALID_CREDENTIALS" | "UNKNOWN";
	message: string;
	fieldErrors?: FieldErrors;
};

export type FormFields = "email" | "password" | "name" | "address";
export type FieldErrors = Optional<Record<AuthFormFields, string>>;

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
