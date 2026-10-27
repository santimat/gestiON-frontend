import { useEffect, useState } from "react";
import { toast } from "sonner";

import { SaleCart } from "@/components/sell/SaleCart";
import { SaleSummary } from "@/components/sell/SaleSummary";
import { ProductSearch } from "@/components/sell/ProductSearch";
import { SaleTicketModal } from "@/components/sell/SaleTicketModal";
import { useClient } from "@/hooks/useClient";
import { useSale } from "@/hooks/useSale";
import type { AppError, Sale } from "@/types";

export const Sell = () => {
  const [ticket, setTicket] = useState<Sale | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cart, saleDraft, createSale, resetSale } = useSale();
  const { getClients } = useClient();

  // los clientes alimentan el select "Cliente (opcional)" del resumen
  useEffect(() => {
    getClients();
  }, [getClients]);

  const handleConfirmSale = async () => {
    setIsSubmitting(true);
    try {
      // consumidor final: clientId null; el backend infiere el punto de venta
      const sale = await createSale({
        paymentMethod: saleDraft.paymentMethod,
        clientId: saleDraft.clientId,
        details: cart.map((line) => ({
          productId: line.productId,
          quantity: line.qty,
        })),
      });
      setTicket(sale);
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo registrar la venta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewSale = () => {
    setTicket(null);
    resetSale();
  };

  return (
    <>
      <header className="border-border flex w-full items-center justify-between border-b p-4">
        <div>
          <h1 className="text-xl font-semibold">Punto de venta</h1>
        </div>
      </header>

      <main className="grid flex-1 gap-4 overflow-auto p-6 lg:grid-cols-[minmax(0,1.15fr)_22rem] lg:items-start">
        <div className="flex flex-col gap-4">
          <ProductSearch />
          <SaleCart />
        </div>
        <SaleSummary
          onConfirm={handleConfirmSale}
          isSubmitting={isSubmitting}
        />
      </main>

      <SaleTicketModal
        opened={ticket !== null}
        sale={ticket}
        closeModal={() => setTicket(null)}
        onNewSale={handleNewSale}
      />
    </>
  );
};
