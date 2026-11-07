import { BadgePercent } from "lucide-react";
import { DateTimePicker } from "@mantine/dates";
import { MultiSelect, NumberInput, Select } from "@mantine/core";

import { PAYMENT_METHODS } from "@features/sales";
import { useOffer } from "@features/offers/hooks/useOffer";
import { useEntityForm } from "@shared/hooks/useEntityForm";
import { ModalHeader } from "@shared/components/ModalHeader";
import { getToday } from "@features/offers/utils/offerUtils";
import type { DiscountType, PaymentMethod } from "@features/sales";
import { offerMapper } from "@features/offers/mappers/offerMapper";
import type { Offer, OfferFormValues } from "@features/offers/types";
import { ModalFormActions } from "@shared/components/ModalFormActions";

const DISCOUNT_TYPE_OPTIONS: { value: DiscountType; label: string }[] = [
  { value: "PERCENTAGE", label: "Porcentaje (%)" },
  { value: "FIXED_AMOUNT", label: "Monto fijo ($)" },
];

const PAYMENT_METHOD_OPTIONS = Object.entries(PAYMENT_METHODS).map(
  ([value, label]) => ({ value, label }),
);

const DEFAULT_OFFER_FORM: OfferFormValues = {
  discountType: "PERCENTAGE",
  value: null,
  startDate: getToday(),
  status: null,
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

  const {
    form: offerForm,
    setForm: setOfferForm,
    errors,
    isSubmitting,
    handleSubmit,
  } = useEntityForm<OfferFormValues>({
    initialValues: offer ? offerMapper.toForm(offer) : DEFAULT_OFFER_FORM,
    isEditing,
    closeModal,
    submit: async (form) => {
      const offerRequest = offerMapper.toRequest(form);
      if (isEditing && offer) await updateOffer(offer.id, offerRequest);
      else await createOffer(offerRequest);
    },
    successMessages: {
      create: "Oferta creada con éxito",
      update: "Oferta actualizada con éxito",
    },
    errorMessages: {
      create: "No se pudo guardar la oferta.",
      update: "No se pudo guardar la oferta.",
    },
  });

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
              value={offerForm.value ?? ""}
              error={errors.value}
              min={0}
              required
              onChange={(value) =>
                setOfferForm((prevState) => ({
                  ...prevState,
                  value: Number(value),
                }))
              }
            />
          </div>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-3">
            <DateTimePicker
              minDate={getToday()}
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
              minDate={getToday()}
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
