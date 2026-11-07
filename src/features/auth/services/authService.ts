import type { LoginDTO } from "@features/auth/types";
import { executeApiCall } from "@shared/utils/apiClient";
import { backendAPI } from "@shared/services/axiosConfig";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import { LoginSchema } from "@features/auth/schemas/LoginSchema";

export const authService = {
  login: async (loginRequest: LoginDTO) => {
    const parsedLogin = parseOrThrow(LoginSchema, loginRequest);
    return executeApiCall(() => backendAPI.post("/auth/login", parsedLogin));
  },
  logout: async () => {
    await executeApiCall(() => backendAPI.post("/auth/logout"));
  },
  checkAuth: async () => {
    return executeApiCall(() => backendAPI.get("/auth/me"));
  },
};
