import { isAxiosError } from "axios";

import type { LoginDTO } from "@/types";
import { LoginSchema } from "@/schemas/LoginSchema";
import { backendAPI } from "@/services/axios/axios";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const authService = {
	login: async (loginRequest: LoginDTO) => {
		const parsedLogin = LoginSchema.safeParse(loginRequest);
		handleZodParsingError(parsedLogin);

		try {
			const response = await backendAPI.post("/auth/login", parsedLogin.data);
			console.log(response);
			// return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw handleAxiosErrors(error);
			}
		}
	},
	checkAuth: async () => {
		try {
			const response = await backendAPI.get("/auth/me", {
				withCredentials: true,
			});
			console.log(response);
		} catch (error) {
			if (isAxiosError(error)) {
				throw handleAxiosErrors(error, {
					401: {
						type: "INVALID_CREDENTIALS",
						message: "Debes estar autorizado para acceder a este sitio.",
					},
				});
			}
		}
	},
};
