import type { RegisterDTO } from "@/types";

export const UserMapper = {
  toUserRequest: (rawData: RegisterDTO) => {
    const { businessName, cuit, address, ...userRequest } = rawData;
    return userRequest;
  },
};
