import { Button, Modal } from "@mantine/core";
import { CheckCircle2 } from "lucide-react";

import type { PaymentMethod, SaleSummary } from "@features/sales/types";

const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  CASH: "Efectivo",
  CARD: "Tarjeta",
  TRANSFER: "Transferencia",
  CREDIT_ACCOUNT: "Cuenta corriente",
};

type SaleTicketModalProps = {
  opened: boolean;
  sale: SaleSummary | null;
  closeModal: () => void;
  onNewSale: () => void;
};

export const SaleTicketModal = ({
  opened,
  sale,
  closeModal,
  onNewSale,
}: SaleTicketModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={closeModal}
      centered
      size="sm"
      transitionProps={{ transition: "fade-down", duration: 300 }}
      withCloseButton={false}
    >
      <div className="flex flex-col items-center text-center">
        <span className="bg-success/40 text-success grid h-12 w-12 place-items-center rounded-full">
          <CheckCircle2 size={24} strokeWidth={1.75} />
        </span>
        <p className="mt-2 font-semibold">Venta confirmada</p>
      </div>

      {sale && (
        <div className="border-background-soft bg-card mt-4 rounded-xl border p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-foreground">Comprobante</span>
            <span className="font-medium">#{sale.id}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-secondary-foreground">Ítems</span>
            <span className="font-medium tabular-nums">{sale.itemCount}</span>
          </div>
          <div className="mt-2 flex justify-between gap-3">
            <span className="text-secondary-foreground">Cliente</span>
            <span className="truncate font-medium">
              {sale.clientName ?? "Consumidor final"}
            </span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-secondary-foreground">Pago</span>
            <span className="font-medium">
              {PAYMENT_LABELS[sale.paymentMethod]}
            </span>
          </div>
          {sale.discount > 0 && (
            <div className="mt-2 flex justify-between gap-3">
              <span className="text-secondary-foreground">Descuento</span>
              <span className="text-destructive font-medium tabular-nums">
                -${sale.discount.toLocaleString("es-AR")}
              </span>
            </div>
          )}
          <div className="border-background-soft mt-3 flex items-end justify-between border-t pt-3">
            <span className="text-secondary-foreground">Total</span>
            <span className="text-xl font-semibold tabular-nums">
              ${sale.total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2">
        <Button onClick={onNewSale} className="bg-primary">
          Nueva venta
        </Button>
        <Button variant="default" onClick={closeModal}>
          Imprimir ticket
        </Button>
      </div>
    </Modal>
  );
};
