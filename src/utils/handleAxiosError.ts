import { AxiosError } from "axios";
import type { AppError } from "@/types";
import { ErrorDictionary } from "./errorDictionary";

export const handleAxiosErrors = (error: AxiosError) => {
  const { code } = error.response?.data as AppError;
  throw {
    code: code || "NETWORK_ERROR",
    message: ErrorDictionary[code] || "Error de conexión, intentá de nuevo.",
  } satisfies AppError;
};
