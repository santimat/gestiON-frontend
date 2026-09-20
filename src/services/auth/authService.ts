import type { LoginDTO } from "@/types";
import { LoginSchema } from "@/schemas/LoginSchema";
import { isAxiosError } from "axios";
import { backendAPI } from "@/services/axios/axios";
import { handleZodParsingError } from "@/utils/handleZodParseError";
import { handleAxiosErrors } from "@/utils/handleAxiosError";

export const authService = {
	login: async (loginRequest: LoginDTO) => {
		const parsedLogin = LoginSchema.safeParse(loginRequest);
		handleZodParsingError(parsedLogin);

		try {
			const { data } = await backendAPI.post("/auth/login", parsedLogin.data);
			return data;
		} catch (error) {
			if (isAxiosError(error)) {
				throw handleAxiosErrors(error);
			}
		}
	},
	checkAuth: async () => {
		const { data } = await backendAPI.get("/auth/me", {
			withCredentials: true,
		});
		return data;
	},
};
