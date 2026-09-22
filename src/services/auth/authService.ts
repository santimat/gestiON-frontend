import { isAxiosError } from "axios";

import type { LoginDTO } from "@/types";
import { LoginSchema } from "@/schemas/LoginSchema";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

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
  logout: async () => {
    try {
      const { data } = await backendAPI.post("/auth/logout");
      console.log(data);
    } catch (error) {
      if (isAxiosError(error)) {
        throw handleAxiosErrors(error);
      }
    }
  },
  checkAuth: async () => {
    try {
      const { data } = await backendAPI.get("/auth/me");
      return data;
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
