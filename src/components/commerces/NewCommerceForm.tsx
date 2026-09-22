import type { SubmitEvent } from "react";
import {
  Button,
  Fieldset,
  TextInput,
  FileInput,
  PasswordInput,
} from "@mantine/core";
import type { UseDisclosureHandlers } from "@mantine/hooks";
import { FileImage } from "lucide-react";

type NewCommerceFormProps = {
  closeModal: UseDisclosureHandlers["close"];
};

export function NewCommerceForm({ closeModal }: NewCommerceFormProps) {
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
  };

  const handleClick = () => {
    closeModal();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <Fieldset
        className="grid grid-cols-3 gap-4"
        legend="Información del comercio"
      >
        <TextInput
          label="Nombre del comercio"
          name="businessName"
          placeholder="Comercio lo de tota"
          required
        />
        <TextInput
          label="Dirección"
          name="address"
          placeholder="Paso de la patria 117"
          required
        />

        <FileInput
          label="Imagen del comercio"
          placeholder="Máximo de imagen 10MB"
          rightSection={<FileImage />}
          rightSectionPointerEvents="none"
        />
      </Fieldset>
      <Fieldset className="grid gap-4" legend="Información del dueño">
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            label="Nombre del dueño"
            placeholder="Juan Román Riquelme"
            name="name"
            required
          />
          <TextInput
            label="C-U-I-T (sin guiones)"
            placeholder="20455705631"
            name="cuit"
            required
          />
          <TextInput
            label="Número de Teléfono"
            placeholder="2346509733"
            name="phoneNumber"
            type="number"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Email"
            placeholder="juanroman@gmail.com"
            name="email"
            required
          />
          <PasswordInput
            label="Contraseña"
            required
            name="password"
            placeholder="*******"
          />
        </div>
      </Fieldset>
      <div className="flex justify-end gap-4">
        <Button type="submit">Agregar</Button>
        <Button className="bg-destructive!" onClick={handleClick}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
