import type {
  Offer,
  OfferFormValues,
  OfferRequest,
} from "@features/offers/types";

export const offerMapper = {
  toForm: (offer: Offer): OfferFormValues => ({
    discountType: offer.discountType ?? "PERCENTAGE",
    value: String(offer.value),
    // el backend devuelve "YYYY-MM-DDTHH:mm:ss" y el input date solo lee la fecha
    startDate: offer.startDate.slice(0, 10),
    endDate: offer.endDate.slice(0, 10),
    paymentMethods: offer.paymentMethods,
  }),

  toRequest: (form: OfferFormValues): OfferRequest => ({
    discountType: form.discountType,
    value: Number(form.value),
    // el backend parsea LocalDateTime: necesita el ISO completo, no "YYYY-MM-DD".
    // La oferta termina al final del día elegido, no a la medianoche.
    startDate: `${form.startDate}T00:00:00`,
    endDate: `${form.endDate}T23:59:59`,
    paymentMethods: form.paymentMethods,
  }),
};
