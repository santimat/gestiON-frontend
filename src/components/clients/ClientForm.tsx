import { toast } from "sonner";
import { useState } from "react";
import { TextInput } from "@mantine/core";
import type { ChangeEvent, SubmitEvent } from "react";
import { IdCard, MapPinHouse, Phone, UserPen, UserRound } from "lucide-react";

import { clientMapper } from "@/mappers";
import { useClient } from "@/hooks/useClient";
import { ModalHeader } from "@/components/ModalHeader";
import { DEFAULT_CLIENT_FORM } from "@/utils/constants";
import { ModalFormActions } from "@/components/ModalFormActions";
import type { AppError, Client, ClientRequest, FieldErrors } from "@/types";

type ClientFormProps = {
  client: Client | null;
  closeModal: () => void;
};

export const ClientForm = ({ client, closeModal }: ClientFormProps) => {
  const isEditing = client !== null;

  const { createClient, updateClient } = useClient();

  const [clientForm, setClientForm] = useState<ClientRequest>(() =>
    client ? clientMapper.toForm(client) : DEFAULT_CLIENT_FORM,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateClient(client.id, clientForm);
      } else {
        await createClient(clientForm);
      }
      setErrors({});
      closeModal();
      toast.success(
        isEditing
          ? "Cliente actualizado correctamente"
          : "Cliente creado correctamente",
      );
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) return setErrors(appError.fieldErrors);
      toast.error(appError?.message ?? "No se pudo guardar el cliente.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
