import type { AppError, FieldErrors, ZodParseResult } from "@/types";

export const handleZodParsingError = <T>(parsedData: ZodParseResult<T>) => {
  if (!parsedData.success) {
    const { issues } = parsedData.error;

    const parsedErrors = // reduce nos permite usar una variable acumuladora la cual luego retornamos, en este caso un objeto
      issues.reduce<FieldErrors>(
        (acc, { path, message }) => {
          const field = String(path[0]);
          // usamos cada campo como clave y le asignamos el mensaje correspondiente
          acc[field] = message;
          return acc;
        },
        // valor por default de la variable acc
        {},
      );

    throw {
      code: "VALIDATION_ERROR",
      message: "Error de validación.",
      fieldErrors: parsedErrors,
    } satisfies AppError;
  }
};
