export const STOCK_STATUS = ["LOW_STOCK", "WITHOUT_STOCK"] as const;
export type StockStatus = (typeof STOCK_STATUS)[number];