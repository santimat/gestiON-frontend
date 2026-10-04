import { PasswordInput, TextInput } from "@mantine/core";
import { AtSign, Lock, User } from "lucide-react";

export const UserForm = () => {
  return (
    <section>
      <p className="text-secondary-foreground pb-4 text-[14px] font-semibold tracking-tight uppercase">
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
};
