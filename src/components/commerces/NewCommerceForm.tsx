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
import { toast } from "sonner";
import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { Fieldset, TextInput, FileInput, PasswordInput } from "@mantine/core";

import type {
  AppError,
  CommerceWithOwner,
  CommerceWithOwnerRequest,
  FieldErrors,
} from "@/types";
import { commerceMapper } from "@/mappers";
import { useCommerce } from "@/hooks/useCommerce";
import { ModalHeader } from "@/components/ModalHeader";
import { DEFAULT_COMMERCE_WITH_OWNER } from "@/utils/constants";
import { ModalFormActions } from "@/components/ModalFormActions";

type NewCommerceFormProps = {
  commerce: CommerceWithOwner | null;
  closeModal: () => void;
};

export const NewCommerceForm = ({
  commerce,
  closeModal,
}: NewCommerceFormProps) => {
  const { handleUpdateCommerceWithOwner, handleCreateCommerceWithOwner } =
    useCommerce();

  const isEditing = commerce !== null;

  const [commerceForm, setCommerceForm] = useState<CommerceWithOwnerRequest>(
    () =>
      commerce ? commerceMapper.toForm(commerce) : DEFAULT_COMMERCE_WITH_OWNER,
  );

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (commerceForm?.businessLogo == null) {
      formData.delete("businessLogo");
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
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
      toast.error(appError?.message ?? "No se pudo guardar el comercio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommerceForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeFile = (payload: File | null) => {
    setCommerceForm((prevState) => ({ ...prevState, businessLogo: payload }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar comercio" : "Nuevo comercio"}
        Icon={BuildingComplexIcon}
      />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Fieldset
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          <div className={`grid ${isEditing ? "" : "sm:grid-cols-2"} gap-4`}>
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
        <ModalFormActions
          submitText={isEditing ? "Guardar Cambios" : "Agregar Comercio"}
          closeModal={closeModal}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
};
