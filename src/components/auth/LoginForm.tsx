import { type SubmitEvent } from "react";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock } from "lucide-react";
import type { LoginDTO } from "@/types";
import { useLogin } from "@/hooks/useLogin";
export function LoginForm() {
	const { handleLogin, isLoading, error } = useLogin();

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		const rawData = Object.fromEntries(formData.entries()) as LoginDTO;
		handleLogin(rawData);
	};

	return (
		<>
			<div className="mb-4">
				<h3 className="font-semibold text-2xl mb-2">Bienvenido de nuevo</h3>
				<p className=" text-secondary-foreground">
					Ingresá con el usuario otorgado por el dueño del comercio.
				</p>
			</div>
			<form className="pt-2 text-foreground" onSubmit={handleSubmit}>
				<TextInput
					name="email"
					leftSection={<AtSign size={20} />}
					leftSectionPointerEvents="none"
					label="Email"
					placeholder="pepe@example.com"
					mb={"sm"}
					error={error?.email}
				/>
				<PasswordInput
					name="password"
					label="Contraseña"
					placeholder="*******"
					leftSection={<Lock size={20} />}
					leftSectionPointerEvents="none"
					error={error?.password}
				/>
				<Button
					type="submit"
					variant="filled"
					fullWidth
					mt={"lg"}
					className="bg-primary"
					loading={isLoading}
				>
					Iniciar Sesión
				</Button>
				<p className="text-red-900 text-center">{}</p>
			</form>
		</>
	);
}
