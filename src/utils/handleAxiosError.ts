import { AxiosError } from "axios";
import type { AppError } from "@/types";

const HANDLED_ERRORS: Record<number, AppError> = {
  400: {
    type: "BAD_REQUEST",
    message: "Solicitud incorrecta.",
  },
  401: {
    type: "INVALID_CREDENTIALS",
    message: "Debes estar autorizado para realizar esta acción.",
  },
  403: {
    type: "FORBIDDEN",
    message: "No tienes permiso para realizar esta acción.",
  },
  404: {
    type: "NOT_FOUND",
    message: "El recurso no fue encontrado.",
  },
  409: {
    type: "DUPLICATE_RESOURCE",
    message: "El recurso que intentas crear ya existe.",
  },
};

const handleAxiosErrors = (
  error: AxiosError,
  overrides?: typeof HANDLED_ERRORS,
) => {
  const knownsErrors = { ...HANDLED_ERRORS, ...overrides };
  const responseCode = error.status as keyof typeof HANDLED_ERRORS;
  const knownError = knownsErrors[responseCode];
  if (knownError) throw knownError;

  throw {
    type: "NETWORK_ERROR",
    message: "Error de conexión, intentá de nuevo.",
  } satisfies AppError;
};

export const createAxiosErrorHandler = (overrides?: typeof HANDLED_ERRORS) => {
  return (error: AxiosError) => handleAxiosErrors(error, overrides);
};
