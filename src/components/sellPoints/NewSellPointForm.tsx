import type { ChangeEvent, SubmitEvent } from "react";
import { useState } from "react";
import { Checkbox, TextInput } from "@mantine/core";
import { MonitorIcon } from "lucide-react";
import { toast } from "sonner";

import { ModalHeader } from "@/components/ModalHeader";
import { ModalFormActions } from "@/components/ModalFormActions";
import { useSellPoint } from "@/hooks/useSellPoint";
import { DEFAULT_SELL_POINT_FORM } from "@/utils/constants";
import type {
  AppError,
  FieldErrors,
  SellPoint,
  SellPointRequest,
  User,
} from "@/types";

type NewSellPointFormProps = {
  sellPoint: SellPoint | null;
  cashiers: User[];
  closeModal: () => void;
};

export const NewSellPointForm = ({
  sellPoint,
  cashiers,
  closeModal,
}: NewSellPointFormProps) => {
  const isEditing = sellPoint !== null;

  const { handleCreateSellPoint } = useSellPoint();

  const [sellPointForm, setSellPointForm] = useState<SellPointRequest>(() =>
    sellPoint
      ? { name: sellPoint.name, cashierIds: [] }
      : DEFAULT_SELL_POINT_FORM,
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (isEditing) {
        // TODO: reemplazar por el servicio de actualización cuando exista (fase PUT /sell-points)
      } else {
        await handleCreateSellPoint({
          name: sellPointForm.name.trim(),
          cashierIds: sellPointForm.cashierIds,
        });
      }
      setErrors({});
      closeModal();
      toast.success(
        isEditing
          ? "Punto de venta actualizado correctamente"
          : "Punto de venta creado correctamente",
      );
    } catch (error) {
      const appError = error as AppError;
      if (appError?.fieldErrors) return setErrors(appError.fieldErrors);
      toast.error(
        appError?.message ??
          (isEditing
            ? "No se pudo actualizar el punto de venta."
            : "No se pudo crear el punto de venta."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSellPointForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleToggleCashier = (cashierId: number, checked: boolean) => {
    setSellPointForm((prevState) => ({
      ...prevState,
      cashierIds: checked
        ? [...prevState.cashierIds, cashierId]
        : prevState.cashierIds.filter((id) => id !== cashierId),
    }));
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar punto de venta" : "Nuevo punto de venta"}
        Icon={MonitorIcon}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <TextInput
            leftSection={<MonitorIcon size={20} />}
            name="name"
            label="Nombre"
            placeholder="Caja 1"
            value={sellPointForm.name}
            error={errors.name}
            onChange={handleChange}
            required
          />

          <div className="space-y-1">
            <p className="text-sm font-medium">Cajeros asignados</p>
            <div className="border-border max-h-48 overflow-y-auto rounded-lg border p-2">
              {cashiers.length === 0 && (
                <p className="text-secondary-foreground p-2 text-xs">
                  No hay cajeros cargados.
                </p>
              )}
              {cashiers.map((cashier) => (
                <div
                  key={`sell-point-cashier-${cashier.id}`}
                  className="hover:bg-background-soft rounded-md px-2 py-1.5 transition-colors"
                >
                  <Checkbox
                    aria-label={`Asignar a ${cashier.name}`}
                    label={
                      <span className="flex items-center gap-2 text-sm">
                        {cashier.name}
                        {!cashier.active && (
                          <span className="text-secondary-foreground text-xs">
                            Inactivo
                          </span>
                        )}
                      </span>
                    }
                    checked={sellPointForm.cashierIds.includes(cashier.id)}
                    onChange={(event) =>
                      handleToggleCashier(
                        cashier.id,
                        event.currentTarget.checked,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </div>
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
