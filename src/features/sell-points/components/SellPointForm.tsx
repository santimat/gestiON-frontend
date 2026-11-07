import { MonitorIcon } from "lucide-react";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Checkbox, TextInput } from "@mantine/core";

import type { SellPoint, SellPointRequest } from "@features/sell-points/types";
import { useCashier } from "@features/cashiers";
import { useSellPoint } from "@features/sell-points/hooks/useSellPoint";
import { useEntityForm } from "@shared/hooks/useEntityForm";
import { ModalHeader } from "@shared/components/ModalHeader";
import { ModalFormActions } from "@shared/components/ModalFormActions";
import { toastAppError } from "@shared/utils/toastAppError";

const DEFAULT_SELL_POINT_FORM: SellPointRequest = {
  name: "",
  cashierIds: [],
};

type NewSellPointFormProps = {
  sellPoint: SellPoint | null;
  closeModal: () => void;
};

export const SellPointForm = ({
  sellPoint,
  closeModal,
}: NewSellPointFormProps) => {
  const isEditing = sellPoint !== null;

  const { cashiers, getCashiers, isLoading: isLoadingCashiers } = useCashier();
  const { handleCreateSellPoint, handleUpdateSellPoint, getSellPointCashiers } =
    useSellPoint();

  const {
    form: sellPointForm,
    setForm: setSellPointForm,
    errors,
    isSubmitting,
    handleSubmit,
  } = useEntityForm<SellPointRequest>({
    initialValues: sellPoint
      ? { name: sellPoint.name, cashierIds: [] }
      : DEFAULT_SELL_POINT_FORM,
    isEditing,
    closeModal,
    submit: (form) => {
      const request = { name: form.name.trim(), cashierIds: form.cashierIds };
      return isEditing && sellPoint
        ? handleUpdateSellPoint(sellPoint.id, request)
        : handleCreateSellPoint(request);
    },
    successMessages: {
      create: "Punto de venta creado correctamente",
      update: "Punto de venta actualizado correctamente",
    },
    errorMessages: {
      create: "No se pudo crear el punto de venta.",
      update: "No se pudo actualizar el punto de venta.",
    },
  });
  // arranca en true al editar: espera el fetch de los cajeros ya asignados
  const [isLoadingAssigned, setIsLoadingAssigned] = useState(isEditing);

  // al abrir el modal cargamos la lista de cajeros;
  // si estamos editando, además precargamos los asignados al punto de venta
  useEffect(() => {
    getCashiers();

    if (!sellPoint) return;

    getSellPointCashiers(sellPoint.id)
      .then((assigned) =>
        setSellPointForm((prevState) => ({
          ...prevState,
          cashierIds: assigned.map((cashier) => cashier.id),
        })),
      )
      .catch((error) => {
        toastAppError(
          error,
          "No se pudieron cargar los cajeros del punto de venta.",
        );
        closeModal();
      })
      .finally(() => setIsLoadingAssigned(false));
  }, [
    sellPoint,
    getCashiers,
    getSellPointCashiers,
    closeModal,
    setSellPointForm,
  ]);

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
            <div className="border-background-soft max-h-48 overflow-y-auto rounded-lg border p-2">
              {isLoadingCashiers || isLoadingAssigned ? (
                <p className="text-secondary-foreground p-2 text-xs">
                  Cargando cajeros...
                </p>
              ) : (
                <>
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
                </>
              )}
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
