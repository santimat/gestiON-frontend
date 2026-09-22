import type { RegisterDTO } from "@/types";
import type { ZodSafeParseResult } from "zod";

export class CommerMapper {
  static toCommerceRequest(rawData: ZodSafeParseResult<RegisterDTO>) {
    const { name, email, phoneNumber, password, ...commerceRequest } = rawData;
    return commerceRequest;
  }
}
