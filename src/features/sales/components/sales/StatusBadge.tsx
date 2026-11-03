import type { SaleStatus } from "@features/sales/types";
import { STATUS_PAYMENT } from "@features/sales/dictionary";

type StatusCardProps = {
  status: SaleStatus;
};

export const StatusBadge = ({ status }: StatusCardProps) => {
  const statusToShow = STATUS_PAYMENT[status];
  const bgColor = status == "PAYED" ? "bg-success/30" : "bg-warning/30";
  const textColor = status == "PAYED" ? "text-success" : "text-warning";
  return (
    <span className={`${bgColor} ${textColor} w-fit rounded-full px-2 text-sm`}>
      {statusToShow}
    </span>
  );
};
