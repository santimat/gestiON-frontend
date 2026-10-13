import type { Client, ClientRequest } from "@/types";

export const clientMapper = {
  mapToForm: (client: Client): ClientRequest => ({
    name: client.name,
    lastName: client.lastName,
    address: client.address,
    phoneNumber: client.phoneNumber,
    dni: client.dni,
  }),
};
