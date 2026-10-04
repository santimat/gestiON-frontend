import { TextInput, Button, Stack, Group, PasswordInput } from "@mantine/core";
import type { SubmitEvent } from "react";

interface NewCashierFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const NewCashierForm = ({
  onSuccess,
  onCancel,
}: NewCashierFormProps) => {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    console.log("Cajero registrado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput label="Nombre y Apellido" placeholder="Mariana Rios" />
        <TextInput label="Email" placeholder="martina@comercio.com" />
        <PasswordInput
          label="Contraseña temporal"
          placeholder="******"
          description="El cajero va a poder cambiarla en su primer ingreso"
        />
        <Group justify="flex-end" gap="sm" mt="md">
          <Button
            variant="default"
            onClick={onCancel || onSuccess}
            type="button"
          >
            Cancelar
          </Button>
          <Button type="submit" color="blue">
            Guardar Producto
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
