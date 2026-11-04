import { BadgePercent } from "lucide-react";
import { useState, type SubmitEvent } from "react";
import { MultiSelect, NumberInput, Select, TextInput } from "@mantine/core";
import { toast } from "sonner";

import type { AppError, FieldErrors } from "@shared/types";
import type { DiscountType, PaymentMethod } from "@features/sales";
import type { Offer, OfferFormValues } from "@features/offers/types";
import { PAYMENT_METHODS } from "@features/sales";
import { ModalHeader } from "@shared/components/ModalHeader";
import { useOffer } from "@features/offers/hooks/useOffer";
import { offerMapper } from "@features/offers/mappers/offerMapper";
import { ModalFormActions } from "@shared/components/ModalFormActions";

const DISCOUNT_TYPE_OPTIONS: { value: DiscountType; label: string }[] = [
  { value: "PERCENTAGE", label: "Porcentaje (%)" },
  { value: "FIXED_AMOUNT", label: "Monto fijo ($)" },
];

const PAYMENT_METHOD_OPTIONS = Object.entries(PAYMENT_METHODS).map(
  ([value, label]) => ({ value, label }),
);

// "en-CA" da YYYY-MM-DD en el horario local: toISOString() usa UTC y podría
// desfasar un día
const today = () => new Date().toLocaleDateString("en-CA");

const emptyOfferForm = (): OfferFormValues => ({
  discountType: "PERCENTAGE",
  value: "",
  startDate: today(),
  endDate: today(),
  paymentMethods: [],
});

type OfferFormProps = {
  offer: Offer | null;
  closeModal: () => void;
};

export const OfferForm = ({ offer, closeModal }: OfferFormProps) => {
  const { createOffer, updateOffer } = useOffer();
  const isEditing = offer !== null;

  const [offerForm, setOfferForm] = useState<OfferFormValues>(() =>
    offer ? offerMapper.toForm(offer) : emptyOfferForm(),
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
                  value: String(value),
                }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <TextInput
              type="date"
              label="Inicio"
              value={offerForm.startDate}
              error={errors.startDate}
              required
              onChange={(event) =>
                setOfferForm((prevState) => ({
                  ...prevState,
                  startDate: event.currentTarget.value,
                }))
              }
            />
            <TextInput
              type="date"
              label="Finalización"
              value={offerForm.endDate}
              error={errors.endDate}
              required
              onChange={(event) =>
                setOfferForm((prevState) => ({
                  ...prevState,
                  endDate: event.currentTarget.value,
                }))
              }
            />
          </div>

          <MultiSelect
            label="Métodos de pago (opcional)"
            placeholder="Todos los métodos"
            description="Sin seleccionar ningún método la oferta aplica a todos."
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
