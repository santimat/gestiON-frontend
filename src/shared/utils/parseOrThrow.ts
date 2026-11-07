import type { ZodParseResult } from "@shared/types";
import { handleZodParsingError } from "@shared/utils/handleZodParseError";

type ParsableSchema<T> = {
  safeParse: (data: unknown) => ZodParseResult<T>;
};

export const parseOrThrow = <T>(
  schema: ParsableSchema<T>,
  data: unknown,
): T => {
  const parsedData = schema.safeParse(data);
  handleZodParsingError(parsedData);
  return (parsedData as { success: true; data: T }).data;
};
