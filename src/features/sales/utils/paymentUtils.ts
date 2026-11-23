import { formatCurrency } from "@shared/utils/money";

export const validatePaymentAmount = (
  value: string,
  totalPending: number | null
): string => {
  const num = Number(value);
  if (value === "" || num <= 0) {
    return "El monto debe ser mayor a 0";
  }
  if (totalPending != null && num > totalPending) {
    return `El monto no puede superar el pendiente (${formatCurrency(totalPending)})`;
  }
  return "";
};