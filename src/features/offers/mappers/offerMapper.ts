import type {
  Offer,
  OfferFormValues,
  OfferRequest,
} from "@features/offers/types";

export const offerMapper = {
  toForm: (offer: Offer): OfferFormValues => ({
    discountType: offer.discountType ?? "PERCENTAGE",
    value: offer.value,
    startDate: new Date(offer.startDate).toLocaleString("sv-SE", {
      timeZone: "America/Argentina/Buenos_Aires",
    }),
    endDate: new Date(offer.endDate).toLocaleString("sv-SE", {
      timeZone: "America/Argentina/Buenos_Aires",
    }),
    status: offer.status,
    paymentMethods: offer.paymentMethods,
  }),

  toRequest: (form: OfferFormValues): OfferRequest => ({
    discountType: form.discountType,
    value: Number(form.value),
    startDate: form.startDate,
    endDate: form.endDate,
    paymentMethods: form.paymentMethods,
  }),
};
