import z from "zod";

export const LoginSchema = z.object({
	email: z.email("Formato inválido."),
	password: z
		.string()
		.min(6, "La contraseña debe contener al menos 6 caracteres."),
});
