import z from "zod";
import type { LucideIcon } from "lucide-react";

import { LoginSchema } from "@/schemas/LoginSchema";

export type ZodIssue = z.core.$ZodIssue;
export type ZodParseResult = z.ZodSafeParseResult<z.output<typeof schema>>;

export type AppError = {
	type:
		| "VALIDATION_ERROR"
		| "NETWORK_ERROR"
		| "INVALID_CREDENTIALS"
		| "FORBIDDEN"
		| "ALREADY_EXISTS"
		| "BAD_REQUEST"
		| "UNKNOWN";
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

export type NavItem = {
	text: string;
	href: string;
	icon: LucideIcon;
};
