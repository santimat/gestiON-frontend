import { useState } from "react";
import { Button, Modal } from "@mantine/core";
import { ReceiptText } from "lucide-react";
import { toast } from "sonner";

import type { Sale } from "@features/sales/types";
import { formatCurrency } from "@shared/utils/money";
import { ModalHeader } from "@shared/components/ModalHeader";
import { SaleStatusBadge } from "@/features/sales/components/sales/SaleStatusBadge";
import { SaleDetailModalList } from "@features/sales/components/sales/SaleDetailModalList";
import { SaleDetailModalField } from "@features/sales/components/sales/SaleDetailModalField";
import { useSales } from "@features/sales/hooks/useSales";
import { useSaleDetailsStore } from "@features/sales/stores/useSaleDetailsStore";
import { toastAppError } from "@shared/utils/toastAppError";

type SaleDetailModalProps = {
  opened: boolean;
  sale: Sale | null;
  closeModal: () => void;
};

export const SaleDetailModal = ({
  opened,
  sale,
  closeModal,
}: SaleDetailModalProps) => {
  const { markSalePaid } = useSales();
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkPaid = async () => {
    if (!sale?.id) return;
    setIsMarking(true);
    try {
      await markSalePaid(sale.id);
      useSaleDetailsStore.setState((prev) => {
        if (prev.saleWithDetails?.id !== sale.id) return prev;
        return {
          ...prev,
          saleWithDetails: { ...prev.saleWithDetails, status: "PAYED" },
        };
      });
      toast.success("Venta marcada como pagada.");
    } catch (error) {
      toastAppError(error, "No se pudo marcar la venta como pagada.");
    } finally {
      setIsMarking(false);
    }
  };

  if (!sale?.id) return null;

  const sellPointName = sale.sellPointName ?? "Vendido por el dueño";
  const subtotal = formatCurrency(sale.subtotal);
  const discount = sale.discount
    ? `${
        sale.discountType === "PERCENTAGE"
          ? `%${sale.discount}`
          : formatCurrency(sale.discount)
      }`
    : null;
  const total = formatCurrency(sale.total);

  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      centered
      size="md"
      transitionProps={{ transition: "fade-down", duration: 300 }}
      withCloseButton={false}
    >
      <ModalHeader title={`Venta #${sale.id}`} Icon={ReceiptText} />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <SaleDetailModalField
            title="Cliente"
            content={sale.clientName ?? "Consumidor Final"}
          />
          <div className="flex flex-col">
            <p className="text-secondary-foreground text-xs">Estado</p>
            <SaleStatusBadge status={sale.status} />
          </div>
        </div>
        <SaleDetailModalList details={sale.details} />
        <div className="flex items-center justify-between">
          <SaleDetailModalField title="Cajero" content={sale.userName} />
          <SaleDetailModalField
            title="Punto de venta"
            content={sellPointName}
          />
        </div>

        <hr className="text-background-soft" />

        <div className="flex items-center justify-between">
          <p className="text-secondary-foreground">Subtotal</p>
          <p className="font-semibold">{subtotal}</p>
        </div>

        {discount && (
          <div className="flex items-center justify-between">
            <p className="text-secondary-foreground">Descuento</p>
            <p className="text-destructive font-semibold">-{discount}</p>
          </div>
        )}
        <div className="flex items-end justify-between pt-3">
          <p className="font-semibold">Total</p>
          <p className="text-xl font-semibold tabular-nums">{total}</p>
        </div>

        {sale.status === "PENDING" && (
          <Button
            className="h-10 w-full"
            onClick={handleMarkPaid}
            loading={isMarking}
          >
            Marcar como paga
          </Button>
        )}

        <Button
          variant="default"
          className="hover:bg-background-soft! shadow-raised h-10 w-full"
          onClick={closeModal}
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  );
};
