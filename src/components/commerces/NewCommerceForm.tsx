import {
  AtSignIcon,
  BuildingComplexIcon,
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
import { DEFAULT_COMMERCE_WITH_OWNER } from "@/utils/constants";
import type {
  AppError,
  CommerceWithOwner,
  CommerceWithOwnerRequest,
  FieldErrors,
} from "@/types";

type NewCommerceFormProps = {
  commerce: CommerceWithOwner | null;
  closeModal: UseDisclosureHandlers["close"];
};

const mapDtoToForm = (
  commerce: CommerceWithOwner,
): CommerceWithOwnerRequest => ({
  userId: commerce.userId,
  commerceId: commerce.commerceId,
  username: commerce.username,
  email: commerce.email,
  phoneNumber: commerce.phoneNumber,
  businessName: commerce.businessName,
  cuit: commerce.cuit,
  address: commerce.address,
  password: "",
  businessLogo: null,
});

export const NewCommerceForm = ({
  commerce,
  closeModal,
}: NewCommerceFormProps) => {
  const { handleUpdateCommerceWithOwner, handleCreateCommerceWithOwner } =
    useCommerce();

  const isEditing = commerce !== null;

  const [commerceForm, setCommerceForm] = useState<CommerceWithOwnerRequest>(
    () => (commerce ? mapDtoToForm(commerce) : DEFAULT_COMMERCE_WITH_OWNER),
  );

  const [errors, setErrors] = useState<FieldErrors | null>(null);

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

    if (commerceForm?.businessLogo == null) {
      formData.delete("businessLogo");
    }

    try {
      if (commerce) {
        await handleUpdateCommerceWithOwner({
          commerceId: commerce.commerceId,
          userId: commerce.userId,
          formData,
        });
        toast.success("Comercio actualizado con éxito");
      } else {
        await handleCreateCommerceWithOwner(formData);
        toast.success("Comercio creado con éxito");
      }
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
    const field = e.target.name;
    const value = e.target.value;
    setCommerceForm((prevState) => ({ ...prevState, [field]: value }));
  };

  const handleChangeFile = (payload: File | null) => {
    setCommerceForm((prevState) => ({ ...prevState, businessLogo: payload }));
  };

  return (
    <>
      <header className="mb-4">
        <div className="flex gap-2">
          <BuildingComplexIcon className="text-primary" />
          <p className="font-semibold">
            {isEditing ? "Editar comercio" : "Nuevo comercio"}
          </p>
        </div>
      </header>
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
            value={commerceForm?.businessName}
            onChange={handleChange}
          />
          <TextInput
            label="Dirección"
            name="address"
            placeholder="Paso de la patria 117"
            leftSection={<MapPinHouse size={20} />}
            error={errors?.address}
            value={commerceForm?.address}
            onChange={handleChange}
          />

          <FileInput
            label="Imagen del comercio"
            name="businessLogo"
            placeholder="Máximo de imagen 10MB"
            leftSection={<FileImage size={20} />}
            error={errors?.businessLogo}
            value={commerceForm?.businessLogo}
            leftSectionPointerEvents="none"
            onChange={handleChangeFile}
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
              value={commerceForm?.username}
              onChange={handleChange}
            />
            <TextInput
              label="C-U-I-T (sin guiones)"
              placeholder="20455705631"
              name="cuit"
              leftSection={<IdCard size={20} />}
              error={errors?.cuit}
              value={commerceForm?.cuit}
              onChange={handleChange}
            />
            <TextInput
              label="Número de Teléfono"
              placeholder="2346509733"
              name="phoneNumber"
              type="number"
              leftSection={<Phone size={20} />}
              error={errors?.phoneNumber}
              value={commerceForm?.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className={`grid ${isEditing ? "" : "grid-cols-2"} gap-4`}>
            <TextInput
              label="Email"
              placeholder="juanroman@gmail.com"
              name="email"
              leftSection={<AtSignIcon size={20} />}
              error={errors?.email}
              value={commerceForm?.email}
              onChange={handleChange}
            />
            {!isEditing && (
              <PasswordInput
                label="Contraseña"
                name="password"
                leftSection={<UserKey size={20} />}
                placeholder="*******"
                error={errors?.password}
                value={commerceForm?.password}
                onChange={handleChange}
              />
            )}
          </div>
        </Fieldset>
        <div className="flex justify-end gap-4">
          <Button className="bg-destructive!" onClick={handleClick}>
            Cancelar
          </Button>
          <Button type="submit">Agregar</Button>
        </div>
      </form>
    </>
  );
};
