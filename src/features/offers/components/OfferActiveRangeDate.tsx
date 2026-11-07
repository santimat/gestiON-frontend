import { formatDateValue } from "@features/offers/utils/offerUtils";
import type { Offer } from "@features/offers/types";

type OfferActiveRangeDateProps = {
  offer: Offer;
};

export const OfferActiveRangeDate = ({ offer }: OfferActiveRangeDateProps) => {
  return (
    <div>
      <p className="text-[14px] font-semibold">
        <span className="text-secondary-foreground text-xs">Del: </span>
        {formatDateValue(offer?.startDate)}
      </p>
      <p className="text-[14px] font-semibold">
        <span className="text-secondary-foreground text-xs">Al: </span>
        {formatDateValue(offer?.endDate)}
      </p>
    </div>
  );
};
