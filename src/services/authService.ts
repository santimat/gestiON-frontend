import type { AuthError, LoginDTO, ZodIssue } from "@/types";
import { LoginSchema } from "@/schemas/LoginSchema";
import { isAxiosError } from "axios";
import { backendAPI } from "./axios";

export const authService = {
	login: async (loginRequest: LoginDTO) => {
		const parsedLogin = LoginSchema.safeParse(loginRequest);

		if (!parsedLogin.success) {
			const issues = parsedLogin.error.issues.map((issue) => {
				return {
					message: issue.message,
					field: issue.path[0],
				};
			}) as ZodIssue[];

			throw {
				type: "VALIDATION_ERROR",
				message: "Error de validación.",
				fieldErrors: issues,
			} satisfies AuthError;
		}

		try {
			const response = await backendAPI.post("/auth/login", parsedLogin.data);
			console.log(response);
		} catch (error) {
			if (isAxiosError(error) && error.response?.status === 401) {
				throw {
					type: "INVALID_CREDENTIALS",
					message: "Email o Contraseña incorrectos.",
				} satisfies AuthError;
			}

			throw {
				type: "NETWORK_ERROR",
				message: "Error de conexión, intentá de nuevo.",
			} satisfies AuthError;
		}
	},
};
