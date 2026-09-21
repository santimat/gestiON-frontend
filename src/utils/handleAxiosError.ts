import { AxiosError } from "axios";
import type { AppError } from "@/types";

const HANDLED_ERRORS: Record<number, AppError> = {
	401: {
		type: "INVALID_CREDENTIALS",
		message: "Email o contraseña incorrectos.",
	},
	400: {
		type: "BAD_REQUEST",
		message: "Solicitud incorrecta.",
	},
	403: {
		type: "FORBIDDEN",
		message: "No tienes permiso para acceder a este recurso.",
	},
};

export function handleAxiosErrors(
	error: AxiosError,
	overrides?: typeof HANDLED_ERRORS,
) {
	const knownsErrors = { ...HANDLED_ERRORS, ...overrides };
	const responseCode = error.status as keyof typeof HANDLED_ERRORS;
	const knownError = knownsErrors[responseCode];
	if (knownError) throw knownError;

	throw {
		type: "NETWORK_ERROR",
		message: "Error de conexión, intentá de nuevo.",
	} satisfies AppError;
}
