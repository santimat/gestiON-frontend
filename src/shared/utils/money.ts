export const formatCurrency = (amount: number) => {
  if (!amount || amount <= 0) return "$0";

  return `$${amount.toLocaleString("es-AR")}`;
};
