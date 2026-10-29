import { useEffect, useState } from "react";
import { toast } from "sonner";

import { SaleCart } from "@/components/sell/SaleCart";
import { SaleSummary } from "@/components/sell/SaleSummary";
import { ProductSearch } from "@/components/sell/ProductSearch";
import { SaleTicketModal } from "@/components/sell/SaleTicketModal";
import { useClient } from "@/hooks/useClient";
import { useSale } from "@/hooks/useSale";
import { usePageHeader } from "@/hooks/usePageHeader";
import type { AppError, Sale } from "@/types";

export const Sell = () => {
  const [ticket, setTicket] = useState<Sale | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cart, saleDraft, createSale, resetSale, clearCart } = useSale();
  const { getClients } = useClient();

  useEffect(() => {
    getClients();
  }, [getClients]);

  usePageHeader({ title: "Punto de venta" });

  const handleConfirmSale = async () => {
    setIsSubmitting(true);
    try {
      // caps de descuento idénticos a los del preview del resumen:
      // así el total que se registra siempre es el que se mostró al cajero
      const subtotal = cart.reduce(
        (acc, line) => acc + line.salePrice * line.qty,
        0,
      );
      const hasDiscount = saleDraft.discount > 0;
      const discount = hasDiscount
        ? saleDraft.discountType === "PERCENTAGE"
          ? // el backend admite 100% (venta gratis); el cap evita negativos por error de tipeo
            Math.min(saleDraft.discount, 100)
          : Math.min(saleDraft.discount, subtotal)
        : undefined;

      // consumidor final: clientId null; el backend infiere el punto de venta
      const sale = await createSale({
        paymentMethod: saleDraft.paymentMethod,
        clientId: saleDraft.clientId,
        details: cart.map((line) => ({
          productId: line.productId,
          quantity: line.qty,
        })),
        discountType: hasDiscount
          ? saleDraft.discountType
          : // sin descuento: el tipo y el monto van de la mano, no se envían
            undefined,
        discount,
      });
      setTicket(sale);
    } catch (error) {
      const appError = error as AppError;
      toast.error(appError?.message ?? "No se pudo registrar la venta.");
    } finally {
      clearCart();
      setIsSubmitting(false);
    }
  };

  const handleNewSale = () => {
    setTicket(null);
    resetSale();
  };

  return (
    <>
      <main className="grid flex-1 gap-4 overflow-auto p-6 lg:items-start xl:grid-cols-[minmax(0,1.15fr)_22rem]">
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
