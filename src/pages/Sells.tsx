import { ReceiptText } from "lucide-react";
import { useEffect, useState } from "react";

import type { SaleSummary } from "@/types";
import { useSales } from "@/hooks/useSales";
import { usePageHeader } from "@/hooks/usePageHeader";
import { SalesList } from "@/components/sells/SalesList";
import { ListContainer } from "@/components/ListContainer";
import { SalesFilterBar } from "@/components/sells/SalesFilterBar";
import { SaleDetailModal } from "@/components/sells/SaleDetailModal";

export const Sells = () => {
  const [detail, setDetail] = useState<SaleSummary | null>(null);

  const { sales, totalSales, isLoading, error, salesFilter, getSales } =
    useSales();

  useEffect(() => {
    getSales();
  }, [getSales]);

  usePageHeader({
    title: "Ventas",
    subtitle: `${totalSales} ${totalSales === 1 ? "venta" : "ventas"} registradas`,
  });

  const isFiltered = Object.values(salesFilter).some(
    (value) => value !== undefined && value !== "",
  );

  return (
    <>
      <SaleDetailModal
        opened={detail !== null}
        sale={detail}
        closeModal={() => setDetail(null)}
      />

      <main className="flex flex-col gap-4 p-6">
        <SalesFilterBar />

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
