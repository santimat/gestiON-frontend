import { CheckCircle2 } from "lucide-react";
import { Button, Modal } from "@mantine/core";

import type { SaleSummary } from "@features/sales/types";
import { PAYMENT_METHODS } from "@features/sales/dictionary";
import { SaleTicketModalRow } from "@features/sales/components/sell/SaleTickModalRow";

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
  const paymentMethod = sale?.paymentMethod
    ? PAYMENT_METHODS[sale.paymentMethod]
    : "";
  const dicountText =
    sale?.discountType === "PERCENTAGE"
      ? `${sale.discount}%`
      : `$${sale?.discount.toLocaleString("es-AR")}`;

  const subtTotal = `$${sale?.subtotal.toLocaleString("es-AR")}`;
  const total = `$${sale?.total.toLocaleString("es-AR")}`;

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
        <div className="border-background-soft bg-card mt-4 rounded-xl border p-4 text-sm [&>div]:not-first:mt-2">
          <SaleTicketModalRow title="Comprobante" content={`#${sale.id}`} />
          <SaleTicketModalRow title="Ítems" content={sale.itemCount} />
          <SaleTicketModalRow
            title="Cliente"
            content={sale.clientName ?? "Consumidor Final"}
          />
          <SaleTicketModalRow title="Metodo de pago" content={paymentMethod} />

          <hr className="text-background-soft my-4" />

          <SaleTicketModalRow title="Subtotal" content={subtTotal} />
          {sale.discount > 0 && (
            <SaleTicketModalRow
              title="Descuento"
              content={dicountText}
              color="destructive"
            />
          )}
          <SaleTicketModalRow title="Total" content={total} />
        </div>
      )}

      <div className="mt-5 flex flex-col gap-2">
        <Button onClick={onNewSale} className="bg-primary">
          Nueva venta
        </Button>
      </div>
    </Modal>
  );
};
