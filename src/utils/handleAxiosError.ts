import { AxiosError } from "axios";
import type { AppError } from "@/types";

export function handleAxiosErrors(error: AxiosError) {
	if (error.response?.status === 401) {
		throw {
			type: "INVALID_CREDENTIALS",
			message: "Email o Contraseña incorrectos.",
		} satisfies AppError;
	}

	throw {
		type: "NETWORK_ERROR",
		message: "Error de conexión, intentá de nuevo.",
	} satisfies AppError;
}
