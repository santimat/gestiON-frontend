import type { CommerceWithOwner, CommerceWithOwnerRequest } from "@/types";

export const commerceMapper = {
  mapToForm: (commerce: CommerceWithOwner): CommerceWithOwnerRequest => ({
    userId: commerce.userId,
    commerceId: commerce.commerceId,
    username: commerce.username,
    email: commerce.email,
    phoneNumber: commerce.phoneNumber,
    businessName: commerce.businessName,
    cuit: commerce.cuit,
    address: commerce.address,
    password: "",
    businessLogo: null,
  }),
};
