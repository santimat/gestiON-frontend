import { Button, Modal } from "@mantine/core";
import { CheckCircle2 } from "lucide-react";

type SaleTicketModalProps = {
  opened: boolean;
  closeModal: () => void;
};

const MOCK_TICKET = {
  id: "#1042",
  items: 6,
  client: "Ernesto Torres",
  paymentMethod: "Efectivo",
  total: 17100,
};

export const SaleTicketModal = ({
  opened,
  closeModal,
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

      <div className="border-border bg-background-soft mt-4 rounded-xl border p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-secondary-foreground">Comprobante</span>
          <span className="font-medium">{MOCK_TICKET.id}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-secondary-foreground">Ítems</span>
          <span className="font-medium tabular-nums">{MOCK_TICKET.items}</span>
        </div>
        <div className="mt-2 flex justify-between gap-3">
          <span className="text-secondary-foreground">Cliente</span>
          <span className="truncate font-medium">{MOCK_TICKET.client}</span>
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-secondary-foreground">Pago</span>
          <span className="font-medium">{MOCK_TICKET.paymentMethod}</span>
        </div>
        <div className="border-border mt-3 flex items-end justify-between border-t pt-3">
          <span className="text-secondary-foreground">Total</span>
          <span className="text-xl font-semibold tabular-nums">
            ${MOCK_TICKET.total.toLocaleString("es-AR")}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <Button onClick={closeModal} className="bg-primary">
          Nueva venta
        </Button>
        <Button variant="default" onClick={closeModal}>
          Imprimir ticket
        </Button>
      </div>
    </Modal>
  );
};
