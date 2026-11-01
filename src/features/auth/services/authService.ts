import { isAxiosError } from "axios";

import { LoginSchema } from "../schemas/LoginSchema";
import type { LoginDTO } from "@/types";
import { backendAPI } from "@shared/services/axiosConfig";
import { handleZodParsingError } from "@shared/utils/handleZodParseError";
import { handleAxiosErrors } from "@shared/utils/handleAxiosError";

export const authService = {
  login: async (loginRequest: LoginDTO) => {
    const parsedLogin = LoginSchema.safeParse(loginRequest);
    handleZodParsingError(parsedLogin);

    try {
      const { data } = await backendAPI.post("/auth/login", parsedLogin.data);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await backendAPI.post("/auth/logout");
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
  checkAuth: async () => {
    try {
      const { data } = await backendAPI.get("/auth/me");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
      throw error;
    }
  },
};
