import { PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock, User } from "lucide-react";

export function UserForm() {
	return (
		<section>
			<p className="uppercase text-secondary-foreground font-semibold text-[14px] tracking-tight pb-4">
				Usuario Administrador
			</p>
			<TextInput
				name="fullName"
				label="Nombre y Apellido"
				placeholder="Carlitos Tevez"
				leftSectionPointerEvents="none"
				leftSection={<User size={20} />}
				mb={"sm"}
			/>
			<TextInput
				name="email"
				label="Correo Electrónico"
				placeholder="pepe@example.com"
				leftSectionPointerEvents="none"
				leftSection={<AtSign size={20} />}
				mb={"sm"}
			/>
			<PasswordInput
				name="password"
				label="Contraseña"
				placeholder="*******"
				leftSectionPointerEvents="none"
				leftSection={<Lock size={20} />}
			/>
		</section>
	);
}
