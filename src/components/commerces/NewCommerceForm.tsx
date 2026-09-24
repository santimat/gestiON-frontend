import {
  Button,
  Fieldset,
  TextInput,
  FileInput,
  PasswordInput,
} from "@mantine/core";
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
import { toast } from "sonner";
import type { UseDisclosureHandlers } from "@mantine/hooks";
import { useEffect, useState, type SubmitEvent } from "react";

import { useUser } from "@/hooks/useUser";
import { useCommerce } from "@/hooks/useCommerce";
import { CommerceMapper } from "@/mappers/CommerceMapper";
import type { AppError, FieldErrors, RegisterDTO } from "@/types";
import { UserMapper } from "@/mappers/UserMapper";

type NewCommerceFormProps = {
  closeModal: UseDisclosureHandlers["close"];
};

export function NewCommerceForm({ closeModal }: NewCommerceFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});
  const { handleCreateCommerce } = useCommerce();
  const { handleCreateUser } = useUser();

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
    const rawData = Object.fromEntries(formData.entries()) as RegisterDTO;
    const commerceRequest = CommerceMapper.toCommerceRequest(rawData);
    const userRequest = UserMapper.toUserRequest(rawData);

    // TODO: AGREGAR LA VALIDACION DE ZOD TAMBIEN ACA PARA USER Y COMMERCE

    try {
      const commerceId = await handleCreateCommerce(commerceRequest);
      await handleCreateUser({ ...userRequest, commerceId });
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) {
        return setErrors(appError?.fieldErrors);
      }
      toast.error(appError?.message);
    }
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
          error={errors?.businessName}
        />
        <TextInput
          label="Dirección"
          name="address"
          placeholder="Paso de la patria 117"
          leftSection={<MapPinHouse size={20} />}
          error={errors?.address}
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
            error={errors?.name}
          />
          <TextInput
            label="C-U-I-T (sin guiones)"
            placeholder="20455705631"
            name="cuit"
            leftSection={<IdCard size={20} />}
            error={errors?.cuit}
          />
          <TextInput
            label="Número de Teléfono"
            placeholder="2346509733"
            name="phoneNumber"
            type="number"
            leftSection={<Phone size={20} />}
            error={errors?.phoneNumber}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Email"
            placeholder="juanroman@gmail.com"
            name="email"
            leftSection={<AtSignIcon size={20} />}
            error={errors?.email}
          />
          <PasswordInput
            label="Contraseña"
            name="password"
            leftSection={<UserKey size={20} />}
            placeholder="*******"
            error={errors?.password}
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
