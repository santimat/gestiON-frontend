import type { Offer } from "@features/offers/types";

export function canAssignProducts(
  offer: Pick<Offer, "paymentMethods">,
): boolean {
  return (offer.paymentMethods ?? []).length === 0;
}

export const getToday = () =>
  new Date().toLocaleString("sv-SE", {
    timeZone: "America/Argentina/Buenos_Aires",
  });

export const formatDateValue = (date: string) => {
  const parsedDate = new Date(date).toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h24",
  });
  return `${parsedDate}hs`;
};

export const formatOfferValue = ({ value, discountType }: Offer) => {
  if (discountType == "PERCENTAGE") {
    return `${value}%`;
  }
  return `$${value}`;
};
