import { AtIcon } from "@/shared/icons/AtIcon";
import { LockIcon } from "@/shared/icons/LockIcon";
import { Button, PasswordInput, TextInput } from "@mantine/core";

export function LoginForm() {
  return (
    <>
      <div className="mb-4">
        <h3 className="font-semibold text-2xl mb-2">Bienvenido de nuevo</h3>
        <p className=" text-secondary-foreground">
          Ingresá con el usuario que te dio el dueño del comercio.
        </p>
      </div>
      <form className="pt-2 text-foreground">
        <TextInput
          name="email"
          leftSection={<AtIcon />}
          leftSectionPointerEvents="none"
          label="Email"
          placeholder="pepe@example.com"
          mb={"sm"}
        />
        <PasswordInput
          name="password"
          label="Contraseña"
          placeholder="*******"
          leftSection={<LockIcon />}
          leftSectionPointerEvents="none"
        />
        <Button variant="filled" fullWidth mt={"lg"} className="bg-primary">
          Iniciar Sesión
        </Button>
      </form>
    </>
  );
}
