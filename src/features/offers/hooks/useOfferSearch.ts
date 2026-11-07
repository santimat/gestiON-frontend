import { useEffect } from "react";

import { useFilters } from "@shared/hooks/useFilters";
import { useOffer } from "@features/offers/hooks/useOffer";
import { OffersFilterSchema } from "@features/offers/schemas/OffersFilterSchema";

export const useOfferSearch = () => {
  const { filters, setFilters } = useFilters(OffersFilterSchema);
  const { getOffers } = useOffer();

  useEffect(() => {
    getOffers(filters);
  }, [getOffers, filters]);

  const isFiltered = Object.values(filters).some(
    (value) => value || value != undefined,
  );

  return {
    filters,
    setFilters,
    isFiltered,
  };
};
