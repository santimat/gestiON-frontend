import { isAxiosError } from "axios";

import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";

export const userService = {
  toggleActive: async (userId: number) => {
    try {
      const { data } = await backendAPI.patch(`/users/${userId}/toggle-active`);
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
  getCashiers: async () => {
    try {
      const { data } = await backendAPI.get("/users/cashiers");
      return data;
    } catch (error) {
      if (isAxiosError(error)) throw handleAxiosErrors(error);
    }
  },
};
