import { AxiosError } from "axios";
import type { AppError } from "@/types";
import { ErrorDictionary } from "./errorDictionary";

export const handleAxiosErrors = (error: AxiosError): AppError => {
  const code = (error.response?.data as AppError | undefined)?.code;

  return {
    code: code || "NETWORK_ERROR",
    message:
      (code && ErrorDictionary[code]) || "Error de conexión, intentá de nuevo.",
  };
};
