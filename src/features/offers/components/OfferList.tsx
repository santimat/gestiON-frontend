import { lazy } from "react";

import type { Offer } from "@features/offers/types";
import { EntityListShell } from "@shared/components/EntityListShell";

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

export const OfferList = ({ offers }: OfferListProps) => (
  <EntityListShell
    items={offers}
    getKey={(offer) => offer.id}
    headers={HEADERS}
    columns={COLUMNS}
    renderMobile={(offer) => <OfferItemMobile offer={offer} />}
    renderDesktop={(offer) => <OfferItem offer={offer} columns={COLUMNS} />}
  />
);
