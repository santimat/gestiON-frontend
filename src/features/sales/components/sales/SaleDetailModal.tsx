import { Button, Modal } from "@mantine/core";
import { ReceiptText } from "lucide-react";

import type { Sale } from "@features/sales/types";
import { ModalHeader } from "@shared/components/ModalHeader";
import { StatusBadge } from "@features/sales/components/sales/StatusBadge";
import { SaleDetailModalList } from "@features/sales/components/sales/SaleDetailModalList";
import { SaleDetailModalField } from "@features/sales/components/sales/SaleDetailModalField";

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
  const sellPointName = sale?.sellPointName ?? "Vendido por el dueño";
  const subtotal = sale?.subtotal.toLocaleString("es-AR");
  const discount = sale?.discount
    ? `${sale?.discountType === "PERCENTAGE" ? "%" : "$"}${sale.discount}`
    : null;
  const total = sale?.total.toLocaleString("es-AR");
  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      centered
      size="md"
      transitionProps={{ transition: "fade-down", duration: 300 }}
      withCloseButton={false}
    >
      <ModalHeader
        title={sale ? `Venta #${sale.id}` : "Venta"}
        Icon={ReceiptText}
      />

      {sale && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <SaleDetailModalField
              title="Cliente"
              content={sale.clientName ?? "Consumidor Final"}
            />
            <div className="flex flex-col">
              <p className="text-secondary-foreground text-xs">Estado</p>
              <StatusBadge status={sale.status} />
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
            <p className="font-semibold">${subtotal}</p>
          </div>

          {discount && (
            <div className="flex items-center justify-between">
              <p className="text-secondary-foreground">Descuento</p>
              <p className="text-destructive font-semibold">{discount}</p>
            </div>
          )}
          <div className="flex items-end justify-between pt-3">
            <p className="font-semibold">Total</p>
            <p className="text-xl font-semibold tabular-nums">${total}</p>
          </div>

          <Button
            variant="default"
            className="hover:bg-background-soft! h-10 w-full shadow-2xl shadow-gray-400"
            onClick={closeModal}
          >
            Cerrar
          </Button>
        </div>
      )}
    </Modal>
  );
};
