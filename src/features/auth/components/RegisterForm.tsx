import { Button } from "@mantine/core";
import { CommerceForm } from "@/features/auth/components/CommerceForm";
import { UserForm } from "@/features/auth/components/UserForm";

export function RegisterForm() {
  return (
    <>
      <div className="mb-4">
        <h3 className="font-semibold text-2xl mb-2">Registrá tu comercio</h3>
        <p className=" text-secondary-foreground">
          Creamos el comercio y tu usuario administrador en un solo paso.
        </p>
      </div>
      <form className="pt-2 text-foreground">
        <CommerceForm />
        <UserForm />
        <Button variant="filled" fullWidth mt={"lg"} className="bg-primary">
          Registrar Comercio
        </Button>
      </form>
    </>
  );
}
