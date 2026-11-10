import { lazy, useEffect, useState } from "react";

import { useClient } from "@features/clients";
import { useOfferPaymentMethod } from "@features/offers";
import { useSale } from "@features/sales/hooks/useSale";
import { toastAppError } from "@shared/utils/toastAppError";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { SaleCart } from "@features/sales/components/sell/SaleCart";
import { SaleSummary } from "@features/sales/components/sell/SaleSummary";
import type { SaleSummary as SaleSummaryData } from "@features/sales/types";
import { ProductSearch } from "@features/sales/components/sell/ProductSearch";

const SaleTicketModal = lazy(() =>
  import("@features/sales/components/sell/SaleTicketModal").then((module) => ({
    default: module.SaleTicketModal,
  })),
);

export const Sell = () => {
  const [ticket, setTicket] = useState<SaleSummaryData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { cart, saleDraft, createSale, resetSale, clearCart } = useSale();
  const { getClients } = useClient();
  const { getOfferPaymentMethods } = useOfferPaymentMethod();

  useEffect(() => {
    getClients();
    getOfferPaymentMethods().catch((error) => {
      toastAppError(error, "No se pudieron cargar las ofertas de pago.");
    });
  }, [getClients, getOfferPaymentMethods]);

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

      let discount = undefined;
      if (hasDiscount) {
        if (saleDraft.discountType === "PERCENTAGE") {
          discount = Math.min(saleDraft.discount, 100);
        } else {
          discount = Math.min(saleDraft.discount, subtotal);
        }
      }

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
      toastAppError(error, "No se pudo registrar la venta.");
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
      <main className="grid flex-1 gap-4 overflow-auto lg:items-start xl:grid-cols-[minmax(0,1.15fr)_22rem]">
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
