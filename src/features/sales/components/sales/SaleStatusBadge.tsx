import type { SaleStatus } from "@features/sales/types";
import { STATUS_PAYMENT } from "@features/sales/dictionary";
import { StatusBadge } from "@shared/components/StatusBadge";

const STATUS_TONES: Record<SaleStatus, "success" | "warning" | "primary"> = {
  PAYED: "success",
  PENDING: "warning",
  PARTIAL_PAYED: "primary",
  GIFTED: "success",
};

type StatusBadgeProps = {
  status: SaleStatus;
};

export const SaleStatusBadge = ({ status }: StatusBadgeProps) => (
  <StatusBadge label={STATUS_PAYMENT[status]} tone={STATUS_TONES[status]} />
);
