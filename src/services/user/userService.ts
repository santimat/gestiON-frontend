import { isAxiosError } from "axios";

import type { UserDTO } from "@/types";
import { backendAPI } from "@/services/axios/axiosConfig";
import { handleAxiosErrors } from "@/utils/handleAxiosError";
import { UserRequestSchema } from "@/schemas/CreateUserSchema";
import { handleZodParsingError } from "@/utils/handleZodParseError";

export const userService = {
  createUser: async (user: UserDTO) => {
    const parsedUser = UserRequestSchema.safeParse(user);
    handleZodParsingError(parsedUser);

    try {
      const { data } = await backendAPI.post("/users", parsedUser);
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw handleAxiosErrors(error);
      }
    }
  },
};
