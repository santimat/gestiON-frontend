import { useEffect } from "react";

import { useFilters } from "@shared/hooks/useFilters";
import { useOffer } from "@features/offers/hooks/useOffer";
import { OffersFilterSchema } from "@features/offers/schemas/OffersFilterSchema";

export const useOfferSearch = () => {
  const { filters, setFilters } = useFilters(OffersFilterSchema);
  const { getOffers } = useOffer();

  // `filters` es un objeto nuevo en cada render: si entrara en las deps del
  // efecto, el fetch se re-dispara en loop. `expired` es primitivo y es el
  // único filtro, así el efecto solo corre cuando cambia de verdad.
  const { expired } = filters;

  useEffect(() => {
    getOffers({ expired });
  }, [getOffers, expired]);

  return {
    filters,
    setFilters,
    isFiltered: expired !== undefined,
  };
};
