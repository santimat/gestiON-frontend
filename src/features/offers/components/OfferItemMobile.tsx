import { Button } from "@mantine/core";
import { Pencil, Tags } from "lucide-react";

import type { Offer } from "@features/offers/types";
import type { Product } from "@features/products";
import { useProduct } from "@features/products";
import { useOffer } from "@features/offers/hooks/useOffer";
import { canAssignProducts } from "@features/offers/utils/offerUtils";
import { OfferAppliesTo } from "@features/offers/components/OfferAppliesTo";
import { useOfferAssigment } from "@features/offers/hooks/useOfferAssigment";
import { OfferStatusBadge } from "@features/offers/components/OfferStatusBadge";
import { OfferActiveRangeDate } from "@features/offers/components/OfferActiveRangeDate";

type OfferItemMobileProps = {
  offer: Offer;
};

export const OfferItemMobile = ({ offer }: OfferItemMobileProps) => {
  const { openEdit } = useOffer();
  const { openAssign } = useOfferAssigment();
  const { products } = useProduct();

  const assignedProductCount = products.filter(
    (product: Product) => product.offerId === offer.id,
  ).length;

  return (
    <div className="border-background-soft bg-card shadow-card flex flex-col rounded-xl border p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-secondary-foreground truncate text-xs">
          <OfferAppliesTo
            paymentMethods={offer.paymentMethods}
            assignedProductCount={assignedProductCount}
          />
        </p>
        <OfferStatusBadge status={offer.status} />
      </div>
      <OfferActiveRangeDate
        startDate={offer.startDate}
        endDate={offer.endDate}
      />
      <div className="mt-3 flex gap-2">
        {canAssignProducts(offer) && (
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => openAssign(offer)}
          >
            <Tags size={14} />
            Asignar
          </Button>
        )}
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
