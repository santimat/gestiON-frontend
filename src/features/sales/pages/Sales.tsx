import { ReceiptText } from "lucide-react";

import { useSales } from "@features/sales/hooks/useSales";
import { ListContainer } from "@shared/components/ListContainer";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { useSalesSearch } from "@features/sales/hooks/useSalesSearch";
import { useSaleDetails } from "@features/sales/hooks/useSaleDetails";
import { SalesList } from "@features/sales/components/sales/SalesList";
import { SalesFilterBar } from "@features/sales/components/sales/SalesFilterBar";
import { SaleDetailModal } from "@features/sales/components/sales/SaleDetailModal";
import { useEffect } from "react";
import { toast } from "sonner";

export const Sales = () => {
  const { sales, totalSales, isLoading, error } = useSales();
  const { isFiltered, setFilters, filters } = useSalesSearch();
  const { saleWithDetails, closeDetailModal, isDetailModalOpen } =
    useSaleDetails();

  usePageHeader({
    title: "Ventas",
    subtitle: `${totalSales} ${totalSales === 1 ? "venta" : "ventas"} registradas`,
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      <SaleDetailModal
        opened={isDetailModalOpen}
        sale={saleWithDetails}
        closeModal={closeDetailModal}
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
          <SalesList sales={sales} />
        </ListContainer>
      </main>
    </>
  );
};
