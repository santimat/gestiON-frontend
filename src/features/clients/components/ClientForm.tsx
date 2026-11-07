import { TextInput } from "@mantine/core";
import type { ChangeEvent } from "react";
import { IdCard, MapPinHouse, Phone, UserPen, UserRound } from "lucide-react";

import { clientMapper } from "@features/clients/mappers/clientMapper";
import { useClient } from "@features/clients/hooks/useClient";
import { useEntityForm } from "@shared/hooks/useEntityForm";
import { ModalHeader } from "@shared/components/ModalHeader";
import { DEFAULT_CLIENT_FORM } from "@features/clients/constants";
import { ModalFormActions } from "@shared/components/ModalFormActions";
import type { Client, ClientRequest } from "@features/clients/types";

type ClientFormProps = {
  client: Client | null;
  closeModal: () => void;
};

export const ClientForm = ({ client, closeModal }: ClientFormProps) => {
  const isEditing = client !== null;

  const { handleCreateClient, updateClient } = useClient();

  const {
    form: clientForm,
    setForm: setClientForm,
    errors,
    isSubmitting,
    handleSubmit,
  } = useEntityForm<ClientRequest>({
    initialValues: client ? clientMapper.toForm(client) : DEFAULT_CLIENT_FORM,
    isEditing,
    closeModal,
    submit: (form) =>
      isEditing && client
        ? updateClient(client.id, form)
        : handleCreateClient(form),
    successMessages: {
      create: "Cliente creado correctamente",
      update: "Cliente actualizado correctamente",
    },
    errorMessages: {
      create: "No se pudo guardar el cliente.",
      update: "No se pudo guardar el cliente.",
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDniChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientForm((prevState) => ({
      ...prevState,
      [name]: value.replace(/\D/g, ""),
    }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar Cliente" : "Nuevo Cliente"}
        Icon={UserPen}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput
            leftSection={<UserRound size={20} />}
            name="name"
            label="Nombre"
            placeholder="Mariana"
            value={clientForm.name}
            error={errors.name}
            onChange={handleChange}
            required
          />

          <TextInput
            leftSection={<UserPen size={20} />}
            name="lastName"
            label="Apellido"
            placeholder="Rios"
            value={clientForm.lastName}
            error={errors.lastName}
            onChange={handleChange}
            required
          />

          <TextInput
            leftSection={<IdCard size={20} />}
            name="dni"
            label="DNI"
            placeholder="35264875"
            value={clientForm.dni}
            error={errors.dni}
            onChange={handleDniChange}
            required
          />

          <TextInput
            leftSection={<Phone size={20} />}
            name="phoneNumber"
            label="Telefono"
            placeholder="2346589631"
            value={clientForm.phoneNumber}
            error={errors.phoneNumber}
            onChange={handleChange}
            required
          />

          <TextInput
            leftSection={<MapPinHouse size={20} />}
            name="address"
            label="Direccion"
            placeholder="Dorrego 236"
            value={clientForm.address}
            error={errors.address}
            onChange={handleChange}
            required
            className="col-span-1 sm:col-span-2"
          />
        </div>
        <ModalFormActions
          submitText={isEditing ? "Guardar cambios" : "Agregar"}
          closeModal={closeModal}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
};
