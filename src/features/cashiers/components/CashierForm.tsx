import type { ChangeEvent } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { KeyRound, Mail, Phone, UserPen, UserRound } from "lucide-react";

import type { User } from "@features/auth";
import { useEntityForm } from "@shared/hooks/useEntityForm";
import { ModalHeader } from "@shared/components/ModalHeader";
import type { CashierRequest } from "@features/cashiers/types";
import { useCashier } from "@features/cashiers/hooks/useCashier";
import { ModalFormActions } from "@shared/components/ModalFormActions";
import { cashierMapper } from "@features/cashiers/mappers/cashierMapper";

type NewCashierProps = {
  cashier: User | null;
  closeModal: () => void;
};

const DEFAULT_CASHIER_FORM: CashierRequest = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
};

export const CashierForm = ({ cashier, closeModal }: NewCashierProps) => {
  const isEditing = cashier !== null;

  const { handleCreateCashier, updateCashier } = useCashier();

  const {
    form: cashierForm,
    setForm: setCashierForm,
    errors,
    isSubmitting,
    handleSubmit,
  } = useEntityForm<CashierRequest>({
    initialValues: cashier
      ? cashierMapper.toForm(cashier)
      : DEFAULT_CASHIER_FORM,
    isEditing,
    closeModal,
    submit: (form) =>
      isEditing && cashier
        ? updateCashier({ cashierId: cashier.id, cashier: form })
        : handleCreateCashier(form),
    successMessages: {
      create: "Cajero creado correctamente",
      update: "Cajero actualizado correctamente",
    },
    errorMessages: {
      create: "No se pudo crear el cajero.",
      update: "No se pudo actualizar el cajero.",
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCashierForm((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar Cajero" : "Nuevo Cajero"}
        Icon={UserPen}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput
            leftSection={<UserRound size={20} />}
            name="name"
            label="Nombre"
            placeholder="Mariana"
            value={cashierForm.name}
            error={errors.name}
            onChange={handleChange}
            required
          />
          <TextInput
            leftSection={<Phone size={20} />}
            name="phoneNumber"
            label="Telefono"
            placeholder="2346589631"
            value={cashierForm.phoneNumber}
            error={errors.phoneNumber}
            onChange={handleChange}
            required
          />

          <TextInput
            leftSection={<Mail size={20} />}
            name="email"
            label="Email"
            placeholder="martina@comercio.com"
            value={cashierForm.email}
            error={errors.email}
            onChange={handleChange}
            required
          />

          <PasswordInput
            leftSection={<KeyRound size={20} />}
            name="password"
            label={isEditing ? "Nueva Contraseña (opcional)" : "Contraseña"}
            placeholder={
              isEditing ? "Dejar vacío para conservar la actual" : "••••••"
            }
            value={cashierForm.password}
            error={errors.password}
            onChange={handleChange}
            required={!isEditing}
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
