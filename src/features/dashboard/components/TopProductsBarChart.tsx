import { Trophy } from "lucide-react";
import { BarChart } from "@mantine/charts";

import type { TopProductSoldResponse } from "@features/dashboard/types";

type TopProductsBarChartProps = {
  topProductsSold: TopProductSoldResponse[];
};

export const TopProductsBarChart = ({
  topProductsSold,
}: TopProductsBarChartProps) => {
  return (
    <div className="border-background-soft rounded-xl border p-4 pb-8">
      <div className="flex items-center justify-between gap-2 pb-4">
        <div>
          <p className="font-semibold">Top 5 productos del mes</p>
          <p className="text-secondary-foreground text-sm">
            Productos más vendidos del mes
          </p>
        </div>
        <Trophy size={24} className="text-success" />
      </div>
      <BarChart
        h={300}
        dataKey="productName"
        series={[{ name: "quantity", label: "Cantidad", color: "blue" }]}
        data={topProductsSold}
      />
    </div>
  );
};
