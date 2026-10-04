import { TextInput, Button, Stack, Group } from "@mantine/core";
import type { SubmitEvent } from "react";

interface NewClientFormProps {
  closeModal: () => void;
}

export const NewClientForm = ({ closeModal }: NewClientFormProps) => {
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    console.log("Cliente registrado");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput label="Nombre" placeholder="Mariana Rios" />
        <TextInput label="Apellido" placeholder="martina@comercio.com" />
        <TextInput label="Direccion" placeholder="Dorrego 236" />
        <TextInput label="telefono" placeholder="2346589631" />
        <TextInput label="DNI" placeholder="35264875" />

        <Group justify="flex-end" gap="sm" mt="md">
          <Button variant="default" onClick={closeModal} type="button">
            Cancelar
          </Button>
          <Button type="submit" color="blue">
            Guardar Cliente
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
