import type { RegisterDTO } from "@/types";

export const CommerceMapper = {
  toCommerceRequest: (rawData: RegisterDTO) => {
    const { name, email, phoneNumber, password, ...commerceRequest } = rawData;
    return commerceRequest;
  },
};
