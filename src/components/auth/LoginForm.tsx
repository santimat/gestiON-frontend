import { toast } from "sonner";
import { useNavigate } from "react-router";
import { AtSign, Lock } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { Button, PasswordInput, TextInput } from "@mantine/core";

import { useAuth } from "@/hooks/useAuth";
import type { AppError, FieldErrors, LoginDTO } from "@/types";
import { getRedirectByRole } from "@/utils/getRedirectByRole";

export const LoginForm = () => {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries()) as LoginDTO;
    setIsLoading(true);
    setErrors({});
    try {
      const userRole = await handleLogin(rawData);
      const redirectTo = getRedirectByRole(userRole);
      navigate(redirectTo);
    } catch (err) {
      const appError = err as AppError;
      if (appError.fieldErrors) {
        return setErrors(appError.fieldErrors);
      }

      toast.error(appError.message);
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="mb-2 text-2xl font-semibold">Bienvenido de nuevo</h3>
        <p className="text-secondary-foreground">
          Ingresá con el usuario otorgado por el dueño del comercio.
        </p>
      </div>
      <form className="text-foreground pt-2" onSubmit={handleSubmit}>
        <TextInput
          name="email"
          leftSection={<AtSign size={20} />}
          leftSectionPointerEvents="none"
          label="Email"
          placeholder="pepe@example.com"
          mb={"sm"}
          error={errors?.email}
        />
        <PasswordInput
          name="password"
          label="Contraseña"
          placeholder="*******"
          leftSection={<Lock size={20} />}
          leftSectionPointerEvents="none"
          error={errors?.password}
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
        <p className="text-center text-red-900">{}</p>
      </form>
    </>
  );
};
