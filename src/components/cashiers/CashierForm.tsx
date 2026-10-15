import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { KeyRound, Mail, Phone, UserRound } from "lucide-react";
import { toast } from "sonner";

import { useUser } from "@/hooks/useUser";
import { ModalHeader } from "@/components/ModalHeader";
import { DEFAULT_CASHIER_FORM } from "@/utils/constants";
import { ModalFormActions } from "@/components/ModalFormActions";
import type { AppError, CashierRequest, FieldErrors } from "@/types";

type CashierFormProps = {
  closeModal: () => void;
};

export const CashierForm = ({ closeModal }: CashierFormProps) => {
  const { createCashier } = useUser();

  const [cashierForm, setCashierForm] =
    useState<CashierRequest>(DEFAULT_CASHIER_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await createCashier(cashierForm);
      setErrors({});
      closeModal();
      toast.success("Cajero creado correctamente");
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) return setErrors(appError.fieldErrors);
      toast.error(appError?.message ?? "No se pudo crear el cajero.");
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
      <ModalHeader title="Nuevo Cajero" Icon={UserRound} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            leftSection={<UserRound size={20} />}
            name="name"
            label="Nombre y Apellido"
            placeholder="Mariana Rios"
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
            label="Contraseña temporal"
            placeholder="******"
            description="El cajero va a poder cambiarla en su primer ingreso"
            value={cashierForm.password}
            error={errors.password}
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
        </div>
        <ModalFormActions
          submitText="Agregar"
          closeModal={closeModal}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
};
