import type {
  CommerceWithOwner,
  CommerceWithOwnerRequest,
} from "@features/commerces/types";

export const commerceMapper = {
  toForm: (commerce: CommerceWithOwner): CommerceWithOwnerRequest => ({
    userId: commerce.userId,
    commerceId: commerce.commerceId,
    username: commerce.username,
    email: commerce.email,
    phoneNumber: commerce.phoneNumber,
    name: commerce.name,
    cuit: commerce.cuit,
    address: commerce.address,
    password: "",
    businessLogo: null,
  }),
};
