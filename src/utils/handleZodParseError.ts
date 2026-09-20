import type { AuthError, RawZodIssue, ZodIssue, ZodParseResult } from "@/types";

export function handleZodParsingError(parsedLogin: ZodParseResult) {
	if (!parsedLogin.success) {
		const issues = parsedLogin.error.issues.map((issue: RawZodIssue) => {
			return {
				message: issue.message,
				field: issue.path[0],
			};
		}) as ZodIssue[];

		throw {
			type: "VALIDATION_ERROR",
			message: "Error de validación.",
			fieldErrors: issues,
		} satisfies AuthError;
	}
}
