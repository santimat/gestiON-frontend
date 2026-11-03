import { useState } from "react";
import { ReceiptText } from "lucide-react";

import type { SaleSummary } from "@features/sales/types";
import { useSales } from "@features/sales/hooks/useSales";
import { ListContainer } from "@shared/components/ListContainer";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { useSalesSearch } from "@features/sales/hooks/useSalesSearch";
import { SalesList } from "@features/sales/components/sales/SalesList";
import { SalesFilterBar } from "@features/sales/components/sales/SalesFilterBar";
import { SaleDetailModal } from "@features/sales/components/sales/SaleDetailModal";

export const Sales = () => {
  const [detail, setDetail] = useState<SaleSummary | null>(null);

  const { sales, totalSales, isLoading, error } = useSales();
  const { isFiltered, setFilters, filters } = useSalesSearch();

  usePageHeader({
    title: "Ventas",
    subtitle: `${totalSales} ${totalSales === 1 ? "venta" : "ventas"} registradas`,
  });

  return (
    <>
      <SaleDetailModal
        opened={detail !== null}
        sale={detail}
        closeModal={() => setDetail(null)}
      />

      <main className="flex flex-col gap-4 p-6">
        <SalesFilterBar filters={filters} setFilters={setFilters} />

        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={sales.length === 0}
          emptyMessage={
            isFiltered
              ? "No hay ventas para mostrar"
              : "Todavía no hay ventas registradas"
          }
          icon={ReceiptText}
        >
          <SalesList sales={sales} onOpenDetail={setDetail} />
        </ListContainer>
      </main>
    </>
  );
};
