import { useAuthStore } from "@/stores/useAuthStore";
import type { AuthError, LoginDTO } from "@/types";
import { useState } from "react";

export function useLogin() {
	const { login, isLoading } = useAuthStore();
	const [error, setError] = useState<Record<string, string>>({});

	const handleLogin = async (loginRequest: LoginDTO) => {
		try {
			await login(loginRequest);
		} catch (err) {
			const authError = err as AuthError;
			if (
				authError.type === "VALIDATION_ERROR" &&
				authError.fieldErrors?.length
			) {
				const parsedErrors = // reduce nos permite usar una variable acumuladora la cual luego retornamos, en este caso un objeto
					authError.fieldErrors?.reduce<Record<string, string>>(
						(acc, { field, message }) => {
							// usamos cada campo como clave y le asignamos el mensaje correspondiente
							acc[field] = message;
							return acc;
						},
						// valor por default de la variable acc
						{},
					);
				setError(parsedErrors);
			}
		}
	};

	return { isLoading, handleLogin, error };
}
