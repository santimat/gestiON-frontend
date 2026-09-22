import type { SubmitEvent } from "react";
import {
  Button,
  Fieldset,
  TextInput,
  FileInput,
  PasswordInput,
} from "@mantine/core";
import type { UseDisclosureHandlers } from "@mantine/hooks";
import {
  AtSignIcon,
  FileImage,
  IdCard,
  MapPinHouse,
  Phone,
  StoreIcon,
  UserIcon,
  UserKey,
} from "lucide-react";

type NewCommerceFormProps = {
  closeModal: UseDisclosureHandlers["close"];
};

export function NewCommerceForm({ closeModal }: NewCommerceFormProps) {
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());
    console.log(rawData);
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
          leftSection={<StoreIcon size={20} />}
          required
        />
        <TextInput
          label="Dirección"
          name="address"
          placeholder="Paso de la patria 117"
          leftSection={<MapPinHouse size={20} />}
          required
        />

        <FileInput
          label="Imagen del comercio"
          placeholder="Máximo de imagen 10MB"
          leftSection={<FileImage size={20} />}
          leftSectionPointerEvents="none"
        />
      </Fieldset>
      <Fieldset className="grid gap-4" legend="Información del dueño">
        <div className="grid grid-cols-3 gap-4">
          <TextInput
            label="Nombre del dueño"
            placeholder="Juan Román Riquelme"
            name="name"
            leftSection={<UserIcon size={20} />}
            required
          />
          <TextInput
            label="C-U-I-T (sin guiones)"
            placeholder="20455705631"
            name="cuit"
            leftSection={<IdCard size={20} />}
            required
          />
          <TextInput
            label="Número de Teléfono"
            placeholder="2346509733"
            name="phoneNumber"
            type="number"
            leftSection={<Phone size={20} />}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Email"
            placeholder="juanroman@gmail.com"
            name="email"
            leftSection={<AtSignIcon size={20} />}
            required
          />
          <PasswordInput
            label="Contraseña"
            required
            name="password"
            leftSection={<UserKey size={20} />}
            placeholder="*******"
          />
        </div>
      </Fieldset>
      <div className="flex justify-end gap-4">
        <Button className="bg-destructive!" onClick={handleClick}>
          Cancelar
        </Button>
        <Button type="submit">Agregar</Button>
      </div>
    </form>
  );
}
