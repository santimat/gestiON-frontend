export const formatCurrency = (amount: number): string =>
  `$${amount.toLocaleString("es-AR")}`;
