// import { PAYMENT_METHODS } from "@features/sales";
import type { Offer, OfferStatus } from "@features/offers/types";

export const OFFER_STATUS_LABELS: Record<OfferStatus, string> = {
  ACTIVE: "Vigente",
  SCHEDULED: "Programada",
  EXPIRED: "Vencida",
};

export const getToday = () => new Date().toISOString();

// const formatDay = (isoDate: string) =>
//   new Date(isoDate).toLocaleDateString("es-AR");

// el backend solo filtra vencidas / no vencidas: "programada" se calcula acá
// comparando contra el inicio (hoy a medianoche, para que cuenta todo el día)
// export const offerStatus = (offer: Offer): OfferStatus => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   if (new Date(offer.startDate) > today) return "PROGRAMADA";
//   if (new Date(offer.endDate) < today) return "VENCIDA";
//   return "VIGENTE";
// };

// export const formatOfferValue = (offer: Offer): string =>
//   offer.discountType === "PERCENTAGE"
//     ? `${offer.value}%`
//     : `$${offer.value.toLocaleString("es-AR")}`;

// export const formatOfferPeriod = (offer: Offer): string =>
//   `${formatDay(offer.startDate)} – ${formatDay(offer.endDate)}`;

// export const formatOfferTargets = (offer: Offer): string => {
//   if (offer.paymentMethods.length === 0) return "Todos los métodos de pago";

//   return `Pago con ${offer.paymentMethods
//     .map((method) => PAYMENT_METHODS[method])
//     .join(", ")}`;
// };
