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
import {
  Button,
  Fieldset,
  TextInput,
  FileInput,
  PasswordInput,
} from "@mantine/core";
import { toast } from "sonner";
import type { UseDisclosureHandlers } from "@mantine/hooks";
import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";

import { useCommerce } from "@/hooks/useCommerce";
import type { AppError, CommerceWithOwnerForm, FieldErrors } from "@/types";
import { DEFAULT_COMMERCE_WITH_OWNER } from "@/utils/constants";

type NewCommerceFormProps = {
  closeModal: UseDisclosureHandlers["close"];
};

export function NewCommerceForm({ closeModal }: NewCommerceFormProps) {
  const [formData, setFormData] = useState<CommerceWithOwnerForm>(
    DEFAULT_COMMERCE_WITH_OWNER,
  );

  const [errors, setErrors] = useState<FieldErrors>({});
  const { handleCreateCommerceWithOwner } = useCommerce();

  useEffect(() => {
    if (errors) {
      const clearErrorsTimeout = setTimeout(() => {
        setErrors({});
      }, 3000);

      return () => {
        clearTimeout(clearErrorsTimeout);
      };
    }
  }, [errors]);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    try {
      await handleCreateCommerceWithOwner(formData);
      toast.success("Comercio creado con exito");
      closeModal();
    } catch (error) {
      const appError = error as AppError;
      if (appError.fieldErrors) return setErrors(appError.fieldErrors);
      toast.error(appError.message);
    }
  };

  const handleClick = () => {
    closeModal();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const field = e.currentTarget.name;
    setFormData((prevState) => ({ ...prevState, [field]: value }));
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
          error={errors?.businessName}
          value={formData?.businessName}
          onChange={handleChange}
        />
        <TextInput
          label="Dirección"
          name="address"
          placeholder="Paso de la patria 117"
          leftSection={<MapPinHouse size={20} />}
          error={errors?.address}
          value={formData?.address}
          onChange={handleChange}
        />

        <FileInput
          label="Imagen del comercio"
          name="businessLogo"
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
            name="username"
            leftSection={<UserIcon size={20} />}
            error={errors?.username}
            value={formData?.username}
            onChange={handleChange}
          />
          <TextInput
            label="C-U-I-T (sin guiones)"
            placeholder="20455705631"
            name="cuit"
            leftSection={<IdCard size={20} />}
            error={errors?.cuit}
            value={formData?.cuit}
            onChange={handleChange}
          />
          <TextInput
            label="Número de Teléfono"
            placeholder="2346509733"
            name="phoneNumber"
            type="number"
            leftSection={<Phone size={20} />}
            error={errors?.phoneNumber}
            value={formData?.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Email"
            placeholder="juanroman@gmail.com"
            name="email"
            leftSection={<AtSignIcon size={20} />}
            error={errors?.email}
            value={formData?.email}
            onChange={handleChange}
          />
          <PasswordInput
            label="Contraseña"
            name="password"
            leftSection={<UserKey size={20} />}
            placeholder="*******"
            error={errors?.password}
            value={formData?.password}
            onChange={handleChange}
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
