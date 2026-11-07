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
import type { ChangeEvent } from "react";
import { Fieldset, TextInput, FileInput, PasswordInput } from "@mantine/core";

import type {
  CommerceWithOwner,
  CommerceWithOwnerRequest,
} from "@features/commerces/types";
import { useEntityForm } from "@shared/hooks/useEntityForm";
import { ModalHeader } from "@shared/components/ModalHeader";
import { useCommerce } from "@features/commerces/hooks/useCommerce";
import { ModalFormActions } from "@shared/components/ModalFormActions";
import { commerceMapper } from "@features/commerces/mappers/commerceMapper";

const DEFAULT_COMMERCE_WITH_OWNER: CommerceWithOwnerRequest = {
  userId: 0,
  commerceId: 0,
  username: "",
  email: "",
  cuit: "",
  password: "",
  phoneNumber: "",
  name: "",
  address: "",
  businessLogo: null,
};

type NewCommerceFormProps = {
  commerce: CommerceWithOwner | null;
  closeModal: () => void;
};

export const CommerceForm = ({
  commerce,
  closeModal,
}: NewCommerceFormProps) => {
  const { handleUpdateCommerceWithOwner, handleCreateCommerceWithOwner } =
    useCommerce();

  const isEditing = commerce !== null;

  const {
    form: commerceForm,
    setForm: setCommerceForm,
    errors,
    isSubmitting,
    handleSubmit,
  } = useEntityForm<CommerceWithOwnerRequest>({
    initialValues: commerce
      ? commerceMapper.toForm(commerce)
      : DEFAULT_COMMERCE_WITH_OWNER,
    isEditing,
    closeModal,
    submit: async (form, e) => {
      // el FormData sale del DOM: la validación del schema recibe strings
      const formData = new FormData(e.currentTarget);

      if (form?.businessLogo == null) {
        formData.delete("businessLogo");
      }

      if (isEditing && commerce) {
        await handleUpdateCommerceWithOwner({
          commerceId: commerce.commerceId,
          userId: commerce.userId,
          formData,
        });
      } else {
        await handleCreateCommerceWithOwner(formData);
      }
    },
    successMessages: {
      create: "Comercio creado con éxito",
      update: "Comercio actualizado con éxito",
    },
    errorMessages: {
      create: "No se pudo guardar el comercio.",
      update: "No se pudo guardar el comercio.",
    },
  });

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
            name="name"
            placeholder="Comercio lo de tota"
            leftSection={<StoreIcon size={20} />}
            error={errors?.name}
            value={commerceForm?.name}
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
