import { Button, Modal } from "@mantine/core";
import { ReceiptText } from "lucide-react";

import { ModalHeader } from "@shared/components/ModalHeader";
import type { SaleSummary } from "@features/sales/types";
import { StatusBadge } from "@features/sales/components/sales/StatusBadge";

type SaleDetailModalProps = {
  opened: boolean;
  sale: SaleSummary | null;
  closeModal: () => void;
};

export const SaleDetailModal = ({
  opened,
  sale,
  closeModal,
}: SaleDetailModalProps) => (
  <Modal
    opened={opened}
    onClose={closeModal}
    centered
    size="sm"
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
          <div>
            <p className="text-secondary-foreground text-xs">Cliente</p>
            <p className="font-medium">
              {sale.clientName ?? "Consumidor final"}
            </p>
          </div>
          <div>
            <p className="text-secondary-foreground text-xs">Estado</p>
            <StatusBadge status={sale.status} />
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary-foreground">Ítems</span>
            <span className="font-medium tabular-nums">{sale.itemCount}</span>
          </div>
        </div>

        {/* el backend todavía no expone el detalle por venta (GET /sales/{id}):
            cuando llegue, acá van las líneas de productos */}
        <div className="border-background-soft bg-card rounded-lg border p-3 text-sm">
          <p className="text-secondary-foreground text-xs">
            El detalle de los productos se podrá ver cuando el backend sume el
            endpoint de detalle por venta.
          </p>
        </div>

        <div className="border-background-soft flex items-end justify-between border-t pt-3">
          <span className="text-secondary-foreground text-sm">Total</span>
          <span className="text-xl font-semibold tabular-nums">
            ${sale.total.toLocaleString("es-AR")}
          </span>
        </div>

        <Button variant="default" className="h-10 w-full" onClick={closeModal}>
          Cerrar
        </Button>
      </div>
    )}
  </Modal>
);
