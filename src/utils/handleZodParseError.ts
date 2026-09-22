import type { AppError, FieldErrors, ZodParseResult } from "@/types";

export function handleZodParsingError(parsedData: ZodParseResult) {
  if (!parsedData.success) {
    const { issues } = parsedData.error;

    const parsedErrors = // reduce nos permite usar una variable acumuladora la cual luego retornamos, en este caso un objeto
      issues.reduce<FieldErrors>(
        (acc, { path, message }) => {
          const field = path[0] as keyof FieldErrors;
          // usamos cada campo como clave y le asignamos el mensaje correspondiente
          acc[field] = message;
          return acc;
        },
        // valor por default de la variable acc
        {},
      );

    throw {
      type: "VALIDATION_ERROR",
      message: "Error de validación.",
      fieldErrors: parsedErrors,
    } satisfies AppError;
  }
}
