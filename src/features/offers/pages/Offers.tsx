import { lazy, useEffect } from "react";
import { Button, Modal } from "@mantine/core";
import { BadgePercent, Plus } from "lucide-react";

import { useAuth } from "@features/auth";
import { useOffer } from "@features/offers/hooks/useOffer";
import { ListContainer } from "@shared/components/ListContainer";
import { OfferList } from "@features/offers/components/OfferList";
import { usePageHeader } from "@shared/layout/hooks/usePageHeader";
import { useOfferSearch } from "@features/offers/hooks/useOfferSearch";
import { OffersFilterBar } from "@features/offers/components/OffersFilterBar";

const OfferForm = lazy(() =>
  import("@features/offers/components/OfferForm").then((module) => ({
    default: module.OfferForm,
  })),
);

export const Offers = () => {
  const { authenticatedUser } = useAuth();
  const {
    offers,
    isLoading,
    error,
    formOffer,
    isFormModalOpen,
    openCreate,
    closeFormModal,
  } = useOffer();
  const { filters, setFilters, isFiltered } = useOfferSearch();

  const canCreate = authenticatedUser?.role === "OWNER";

  useEffect(() => {
    return () => closeFormModal();
  }, [closeFormModal]);

  usePageHeader({
    title: "Ofertas",
    subtitle: `${offers.length} ${offers.length === 1 ? "oferta" : "ofertas"}`,
    actions: canCreate ? (
      <Button
        leftSection={<Plus />}
        onClick={openCreate}
        className="bg-primary rounded-md p-2 text-white"
      >
        <span className="hidden sm:inline">Nueva oferta</span>
      </Button>
    ) : null,
  });

  return (
    <>
      <Modal
        opened={isFormModalOpen}
        onClose={closeFormModal}
        centered
        size="md"
        transitionProps={{ transition: "fade-down", duration: 300 }}
        withCloseButton={false}
      >
        <OfferForm
          key={formOffer?.id ?? "create"}
          offer={formOffer}
          closeModal={closeFormModal}
        />
      </Modal>

      <main className="flex flex-col gap-6 p-6">
        <OffersFilterBar filters={filters} setFilters={setFilters} />

        <ListContainer
          isLoading={isLoading}
          error={error}
          isEmpty={offers.length === 0}
          emptyMessage={
            isFiltered
              ? "No hay ofertas para mostrar"
              : "Todavía no hay ofertas"
          }
          icon={BadgePercent}
        >
          <OfferList offers={offers} />
        </ListContainer>
      </main>
    </>
  );
};
