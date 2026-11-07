import { Pencil } from "lucide-react";
import { Button } from "@mantine/core";

import type { Offer } from "@features/offers/types";
import { useOffer } from "@features/offers/hooks/useOffer";
import { OfferStatusBadge } from "@features/offers/components/OfferStatusBadge";
import { OfferActiveRangeDate } from "@features/offers/components/OfferActiveRangeDate";

type OfferItemMobileProps = {
  offer: Offer;
};

export const OfferItemMobile = ({ offer }: OfferItemMobileProps) => {
  const { openEdit } = useOffer();

  return (
    <div className="border-background-soft bg-card shadow-card flex flex-col rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-secondary-foreground truncate text-xs">
          {/* TODO: agregar donde se aplica la oferta*/}
          {/*{formatOfferTargets(offer)}*/}
        </p>
        <OfferStatusBadge status={offer.status} />
      </div>
      <OfferActiveRangeDate
        startDate={offer.startDate}
        endDate={offer.endDate}
      />
      <div className="mt-3 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={() => openEdit(offer)}
        >
          <Pencil size={14} />
          Editar
        </Button>
      </div>
    </div>
  );
};
