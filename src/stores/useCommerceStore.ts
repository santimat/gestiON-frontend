import { create } from "zustand";
import type { Commerce, RegisterDTO } from "@/types";
import { commerceService } from "@/services/commerce/commerceService";

type UseCommerceStore = {
  commerces: Commerce[] | [];
  createCommerce: (rawData: RegisterDTO) => Promise<void>;
};

export const useCommerceStore = create<UseCommerceStore>((set, get) => ({
  commerces: [],
  createCommerce: async (rawData: RegisterDTO) => {
    const newCommerce = await commerceService.createCommerce(rawData);
    set(({ commerces }) => ({
      commerces: [...commerces, newCommerce],
    }));
  },
}));
