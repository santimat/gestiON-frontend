import {
  BadgeDollarSign,
  BanknoteArrowUp,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import { formatCurrency } from "@/shared/utils/money";
import { StatCard } from "@features/dashboard/components/StatCard";
import type { DashboardByPeriodStats } from "@features/dashboard/types";

type KpiCardsSectionProps = {
  dashboardByPeriodStats: DashboardByPeriodStats | null;
  periodLabel: string;
  lowStockProductsCount: number;
};

export const KpiCardsSection = ({
  dashboardByPeriodStats,
  periodLabel,
  lowStockProductsCount,
}: KpiCardsSectionProps) => {
  return (
    <div className="grid grid-cols-1 justify-center gap-2 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Ganancias"
        value={formatCurrency(dashboardByPeriodStats?.profit ?? 0)}
        hint={`Ganancias ${periodLabel}`}
        icon={TrendingUp}
        tone="success"
      />
      <StatCard
        label="Ventas realizadas"
        value={String(dashboardByPeriodStats?.salesCount)}
        icon={BadgeDollarSign}
        hint={`Ventas ${periodLabel}`}
      />
      <StatCard
        label="Venta promedio"
        value={formatCurrency(dashboardByPeriodStats?.averageSaleValue ?? 0)}
        tone="success"
        icon={BanknoteArrowUp}
        hint={`Valor de venta promedio ${periodLabel}`}
      />
      <StatCard
        label="Stock bajo"
        value={String(lowStockProductsCount)}
        tone="warning"
        icon={TriangleAlert}
        hint={`Productos a reponer`}
      />
    </div>
  );
};
