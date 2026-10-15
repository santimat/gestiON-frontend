import { useState } from "react";

import { SaleCart } from "@/components/sell/SaleCart";
import { SaleSummary } from "@/components/sell/SaleSummary";
import { ProductSearch } from "@/components/sell/ProductSearch";
import { SaleTicketModal } from "@/components/sell/SaleTicketModal";

export const Sell = () => {
  const [ticketOpened, setTicketOpened] = useState(false);

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
        <SaleSummary onConfirm={() => setTicketOpened(true)} />
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
        <p>hola</p>
      </main>

      <SaleTicketModal
        opened={ticketOpened}
        closeModal={() => setTicketOpened(false)}
      />
    </>
  );
};
