import type {
  Offer,
  OfferFormValues,
  OfferRequest,
} from "@features/offers/types";

export const offerMapper = {
  toForm: (offer: Offer): OfferFormValues => ({
    discountType: offer.discountType ?? "PERCENTAGE",
    value: offer.value,
    startDate: offer.startDate.slice(0, 10),
    endDate: offer.endDate.slice(0, 10),
    status: offer.status,
    paymentMethods: offer.paymentMethods,
  }),

  toRequest: (form: OfferFormValues): OfferRequest => ({
    discountType: form.discountType,
    value: Number(form.value),
    startDate: `${form.startDate}T00:00:00`,
    endDate: `${form.endDate}T23:59:59`,
    paymentMethods: form.paymentMethods,
  }),
};
