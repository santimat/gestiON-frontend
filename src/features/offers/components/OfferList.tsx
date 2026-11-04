import { lazy } from "react";

import type { Offer } from "@features/offers/types";
import { useIsMobile } from "@shared/hooks/useMediaQuery";

const OfferItem = lazy(() =>
  import("@features/offers/components/OfferItem").then((module) => ({
    default: module.OfferItem,
  })),
);

const OfferItemMobile = lazy(() =>
  import("@features/offers/components/OfferItemMobile").then((module) => ({
    default: module.OfferItemMobile,
  })),
);

type OfferListProps = {
  offers: Offer[];
};

const HEADERS = ["Descuento", "Aplica a", "Vigencia", "Estado", "Acciones"];

const COLUMNS =
  "grid grid-cols-[0.9fr_1.2fr_1fr_0.7fr_0.4fr] items-center gap-x-4";

export const OfferList = ({ offers }: OfferListProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="grid gap-3">
        {offers.map((offer) => (
          <OfferItemMobile key={`offer-mobile-${offer.id}`} offer={offer} />
        ))}
      </div>
    );
  }

  return (
    <section className="bg-card border-background-soft overflow-hidden rounded-lg border">
      <ul
        className={`border-background-soft text-secondary-foreground ${COLUMNS} border-b p-2 text-sm`}
      >
        {HEADERS.map((header) => (
          <li key={header}>{header}</li>
        ))}
      </ul>
      <ul className="[&>li]:not-first:border-background-soft text-sm [&>li]:not-first:border-t">
        {offers.map((offer) => (
          <OfferItem
            key={`offer-${offer.id}`}
            offer={offer}
            columns={COLUMNS}
          />
        ))}
      </ul>
    </section>
  );
};
