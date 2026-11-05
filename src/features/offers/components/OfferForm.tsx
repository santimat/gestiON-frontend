import { toast } from "sonner";
import { BadgePercent } from "lucide-react";
import { DateTimePicker } from "@mantine/dates";
import { useState, type SubmitEvent } from "react";
import { MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";

import { PAYMENT_METHODS } from "@features/sales";
import type { AppError, FieldErrors } from "@shared/types";
import { useOffer } from "@features/offers/hooks/useOffer";
import { ModalHeader } from "@shared/components/ModalHeader";
import type { DiscountType, PaymentMethod } from "@features/sales";
import { offerMapper } from "@features/offers/mappers/offerMapper";
import type { Offer, OfferFormValues } from "@features/offers/types";
import { ModalFormActions } from "@shared/components/ModalFormActions";
import { getToday } from "../utils/offerUtils";

const DISCOUNT_TYPE_OPTIONS: { value: DiscountType; label: string }[] = [
  { value: "PERCENTAGE", label: "Porcentaje (%)" },
  { value: "FIXED_AMOUNT", label: "Monto fijo ($)" },
];

const PAYMENT_METHOD_OPTIONS = Object.entries(PAYMENT_METHODS).map(
  ([value, label]) => ({ value, label }),
);

const DEFAULT_OFFER_FORM: OfferFormValues = {
  discountType: "PERCENTAGE",
  value: "",
  startDate: getToday(),
  endDate: getToday(),
  paymentMethods: [],
};

type OfferFormProps = {
  offer: Offer | null;
  closeModal: () => void;
};

export const OfferForm = ({ offer, closeModal }: OfferFormProps) => {
  const { createOffer, updateOffer } = useOffer();
  const isEditing = offer !== null;

  const [offerForm, setOfferForm] = useState<OfferFormValues>(() =>
    offer ? offerMapper.toForm(offer) : DEFAULT_OFFER_FORM,
  );

  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const offerRequest = offerMapper.toRequest(offerForm);
      if (isEditing) await updateOffer(offer.id, offerRequest);
      else await createOffer(offerRequest);

      toast.success(`Oferta ${isEditing ? "actualizada" : "creada"} con éxito`);
      closeModal();
    } catch (error) {
      const appError = error as AppError;
      if (appError.fieldErrors) {
        setErrors(appError.fieldErrors);
        return;
      }
      toast.error(appError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalHeader
        title={isEditing ? "Editar Oferta" : "Nueva Oferta"}
        Icon={BadgePercent}
      />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Tipo de descuento"
              data={DISCOUNT_TYPE_OPTIONS}
              value={offerForm.discountType}
              error={errors.discountType}
              allowDeselect={false}
              required
              onChange={(value) => {
                if (!value) return;
                setOfferForm((prevState) => ({
                  ...prevState,
                  discountType: value as DiscountType,
                }));
              }}
            />
            <NumberInput
              label={
                offerForm.discountType === "PERCENTAGE"
                  ? "Valor (%)"
                  : "Valor ($)"
              }
              value={offerForm.value}
              error={errors.value}
              min={0}
              required
              onChange={(value) =>
                setOfferForm((prevState) => ({
                  ...prevState,
                  value: value,
                }))
              }
            />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-3">
            <DateTimePicker
              // valueFormat={"YYYY-MM-DDTHH:mm:ss"}
              label="Fecha de inicio"
              value={offerForm.startDate}
              error={errors.startDate}
              required
              onChange={(value) => {
                if (!value) return;
                setOfferForm((prevState) => ({
                  ...prevState,
                  startDate: value,
                }));
              }}
              timePickerProps={{ withDropdown: true, format: "24h" }}
            />
            <DateTimePicker
              // valueFormat={"YYYY-MM-DDTHH:mm:ss"}
              label="Fecha de finalización"
              value={offerForm.endDate}
              error={errors.endDate}
              required
              onChange={(value) => {
                if (!value) return;
                setOfferForm((prevState) => ({
                  ...prevState,
                  endDate: value,
                }));
              }}
              timePickerProps={{ withDropdown: true, format: "24h" }}
            />
          </div>

          <MultiSelect
            label="Métodos de pago (opcional)"
            placeholder={
              offerForm.paymentMethods?.length > 0 ? "" : "Sin seleccionar"
            }
            description="Sin seleccionar, para luego agregar a productos."
            data={PAYMENT_METHOD_OPTIONS}
            value={offerForm.paymentMethods}
            error={errors.paymentMethods}
            clearable
            onChange={(value) =>
              setOfferForm((prevState) => ({
                ...prevState,
                paymentMethods: value as PaymentMethod[],
              }))
            }
          />
        </div>

        <ModalFormActions
          submitText={isEditing ? "Guardar cambios" : "Crear oferta"}
          closeModal={closeModal}
          isSubmitting={isSubmitting}
        />
      </form>
    </>
  );
};
