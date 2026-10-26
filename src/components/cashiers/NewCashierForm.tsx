import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { KeyRound, Mail, Phone, UserPen, UserRound } from "lucide-react";
import { toast } from "sonner";

import { cashierMapper } from "@/mappers";
import { useCashier } from "@/hooks/useCashier";
import { ModalHeader } from "@/components/ModalHeader";
import { DEFAULT_CASHIER_FORM } from "@/utils/constants";
import { ModalFormActions } from "@/components/ModalFormActions";
import type { AppError, CashierRequest, FieldErrors, User } from "@/types";

type NewCashierProps = {
  cashier: User | null;
  closeModal: () => void;
};

export const NewCashierForm = ({ cashier, closeModal }: NewCashierProps) => {
  const isEditing = cashier !== null;

  const { handleCreateCashier, updateCashier } = useCashier();

  const [cashierForm, setCashierForm] = useState<CashierRequest>(() =>
    cashier ? cashierMapper.toForm(cashier) : DEFAULT_CASHIER_FORM,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await updateCashier({ cashierId: cashier.id, cashier: cashierForm });
      } else {
        await handleCreateCashier(cashierForm);
      }
      setErrors({});
      closeModal();
      toast.success(
        isEditing
          ? "Cajero actualizado correctamente"
          : "Cajero creado correctamente",
      );
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) return setErrors(appError.fieldErrors);
      toast.error(
        appError?.message ??
          (isEditing
            ? "No se pudo actualizar el cajero."
            : "No se pudo crear el cajero."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
