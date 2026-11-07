import { formatDateValue } from "@features/offers/utils/offerUtils";

type OfferActiveRangeDateProps = {
  startDate: string;
  endDate: string;
};

export const OfferActiveRangeDate = ({
  startDate,
  endDate,
}: OfferActiveRangeDateProps) => {
  return (
    <div>
      <p className="text-[14px] font-semibold">
        <span className="text-secondary-foreground text-xs">Del: </span>
        {formatDateValue(startDate)}
      </p>
      <p className="text-[14px] font-semibold">
        <span className="text-secondary-foreground text-xs">Al: </span>
        {formatDateValue(endDate)}
      </p>
    </div>
  );
};