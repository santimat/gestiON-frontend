import { LineChart } from "@mantine/charts";

import type { PeriodProductCount } from "@features/dashboard/types";

type SoldProductsLineChartProps = {
  productsSoldByPeriod: PeriodProductCount[];
  periodLabel?: string;
};

export const SoldProductsLineChart = ({
  productsSoldByPeriod,
  periodLabel,
}: SoldProductsLineChartProps) => {
  return (
    <div className="border-background-soft rounded-xl border p-4 pb-8">
      <div className="flex items-center justify-between gap-2 pb-4">
        <div>
          <p className="font-semibold">Ventas en el tiempo</p>
          <p className="text-secondary-foreground text-sm">
            Cantidad de productos vendidos
          </p>
        </div>
        <span className="bg-primary/20 text-primary rounded-full px-2 text-sm font-semibold">
          {periodLabel}
        </span>
      </div>
      <LineChart
        h={300}
        curveType="monotone"
        dataKey="period"
        lineProps={{ isAnimationActive: true, animationDuration: 800 }}
        withDots={false}
        data={productsSoldByPeriod ?? []}
        series={[{ name: "quantity", label: "Cantidad", color: "blue" }]}
      />
    </div>
  );
};
