import { isAxiosError } from "axios";

import { LoginSchema } from "@/schemas";
import type { LoginDTO } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
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
      console.log("Error en authService.login:", error);
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
        throw handleAxiosErrors(error);
      }
    }
  },
};
