import { AtIcon } from "@/shared/icons/AtIcon";
import { LockIcon } from "@/shared/icons/LockIcon";
import { UserIcon } from "@/shared/icons/UserIcon";
import { PasswordInput, TextInput } from "@mantine/core";

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
        leftSection={<UserIcon />}
        mb={"sm"}
      />
      <TextInput
        name="email"
        label="Correo Electrónico"
        placeholder="pepe@example.com"
        leftSectionPointerEvents="none"
        leftSection={<AtIcon />}
        mb={"sm"}
      />
      <PasswordInput
        name="password"
        label="Contraseña"
        placeholder="*******"
        leftSectionPointerEvents="none"
        leftSection={<LockIcon />}
      />
    </section>
  );
}
