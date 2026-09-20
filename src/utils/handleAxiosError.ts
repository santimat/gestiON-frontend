import { isAxiosError } from "axios";
import type { AuthError } from "@/types";

export function handleAxiosErrors(error: unknown) {
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
