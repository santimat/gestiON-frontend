import { create } from "zustand";

import type { UsePageHeaderStore } from "@shared/layout/stores/pageHeader/types";

export const usePageHeaderStore = create<UsePageHeaderStore>((set) => ({
  header: null,
  setHeader: (header) => set({ header }),
  clearHeader: () => set({ header: null }),
}));
