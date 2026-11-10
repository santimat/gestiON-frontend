import { useEffect } from "react";

import { useSales } from "@/features/sales";
import { useProductStats } from "@features/products";
import { useLocalFilters } from "@/shared/hooks/useLocalFilters";
import { usePageHeader } from "@/shared/layout/hooks/usePageHeader";
import { useDashboard } from "@features/dashboard/hooks/useDashboard";
import { PERIOD_LABELS, PERIOD_SHORTS } from "@features/dashboard/constants";
import { LastSalesList } from "@features/dashboard/components/LastSalesList";
import { KpiCardsSection } from "@features/dashboard/components/KpiCardsSection";
import { LowStockProducts } from "@features/dashboard/components/LowStockProducts";
import { TopProductsBarChart } from "@features/dashboard/components/TopProductsBarChart";
import { SoldProductsLineChart } from "@features/dashboard/components/SoldProductsLineChart";
import { PeriodSegmentedControl } from "@features/dashboard/components/PeriodSegmentedControl";
import { DashboardStatsByPeriodFiltersSchema } from "@/features/dashboard/schemas/DashboardStatsByPeriodFiltersSchema";

export const Dashboard = () => {
  const {
    getSalesStatsByPeriod,
    dashboardByPeriodStats,
    getTopProductsSold,
    topProductsSold,
  } = useDashboard();

  const { getSales, sales } = useSales();

  const { getLowStockProducts, lowStockProducts } = useProductStats();
  const { filters: statsByPeriodFilters, setFilters: setStatsByPeriodFilters } =
    useLocalFilters(DashboardStatsByPeriodFiltersSchema, {
      granularity: "WEEK",
    });

  const periodLabel = PERIOD_LABELS[statsByPeriodFilters?.granularity];
  const periodShort = PERIOD_SHORTS[statsByPeriodFilters?.granularity];

  const lowStockProductsCount = lowStockProducts?.length ?? 0;

  useEffect(() => {
    getSalesStatsByPeriod(statsByPeriodFilters);
  }, [statsByPeriodFilters, getSalesStatsByPeriod]);

  useEffect(() => {
    getLowStockProducts();
    getTopProductsSold();
    getSales({ size: 5 });
  }, [getLowStockProducts, getTopProductsSold, getSales]);

  usePageHeader({
    title: "Dashboard",
    subtitle: "Resumen de ganancias y stock del comercio",
    actions: (
      <PeriodSegmentedControl
        {...{ statsByPeriodFilters, setStatsByPeriodFilters }}
      />
    ),
  });

  return (
    <main className="flex flex-col gap-4">
      <KpiCardsSection
        {...{ dashboardByPeriodStats, periodLabel, lowStockProductsCount }}
      />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <SoldProductsLineChart
          productsSoldByPeriod={
            dashboardByPeriodStats?.productsSoldByPeriod ?? []
          }
          periodLabel={periodShort}
        />
        <TopProductsBarChart {...{ topProductsSold }} />
      </div>
      <div className="grid grid-cols-1 gap-4 pb-4 xl:grid-cols-2">
        <LowStockProducts {...{ lowStockProducts }} />
        <div className="border-background-soft rounded-xl border p-4">
          <p className="font-semibold">Ultimas {sales.length} ventas</p>
          <LastSalesList sales={sales} />
        </div>
      </div>
    </main>
  );
};
