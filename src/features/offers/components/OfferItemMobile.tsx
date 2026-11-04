import { Pencil } from "lucide-react";
import { Button } from "@mantine/core";

import type { Offer } from "@features/offers/types";
import { useOffer } from "@features/offers/hooks/useOffer";
import { OfferStatusBadge } from "@features/offers/components/OfferStatusBadge";
import {
  formatOfferPeriod,
  formatOfferTargets,
  formatOfferValue,
} from "@features/offers/utils/offerUtils";

type OfferItemMobileProps = {
  offer: Offer;
};

export const OfferItemMobile = ({ offer }: OfferItemMobileProps) => {
  const { openEdit } = useOffer();

  return (
    <div className="border-background-soft bg-card shadow-card flex flex-col rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-semibold tabular-nums">
            {formatOfferValue(offer)}
          </p>
          <p className="text-secondary-foreground truncate text-xs">
            {formatOfferTargets(offer)}
          </p>
        </div>
        <OfferStatusBadge offer={offer} />
      </div>
      <p className="text-secondary-foreground mt-2 text-xs tabular-nums">
        {formatOfferPeriod(offer)}
      </p>
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
