import { isAxiosError } from "axios";

import type { LoginDTO } from "@/types";
import { LoginSchema } from "@/schemas/user/LoginSchema";
import { backendAPI } from "@/services/axios/axiosConfig";
import { createAxiosErrorHandler } from "@/utils/handleAxiosError";
import { handleZodParsingError } from "@/utils/handleZodParseError";

const handleAxiosErrors = createAxiosErrorHandler({
  400: {
    type: "INVALID_CREDENTIALS",
    message: "Email o contraseña incorrectos.",
  },
  401: {
    type: "INVALID_CREDENTIALS",
    message: "Debes estar autorizado para acceder a este sitio.",
  },
  403: {
    type: "FORBIDDEN",
    message: "No tienes permisos para acceder a este sitio.",
  },
  404: {
    type: "NOT_FOUND",
    message: "El recurso solicitado no existe.",
  },
});

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
        throw handleAxiosErrors(error);
      }
    }
  },
};
