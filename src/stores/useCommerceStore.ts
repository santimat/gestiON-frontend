import { create } from "zustand";
import type { Commerce, CommerceDTO } from "@/types";
import { commerceService } from "@/services/commerce/commerceService";

type UseCommerceStore = {
  commerces: Commerce[] | [];
  createCommerce: (commerce: CommerceDTO) => Promise<Commerce>;
};

export const useCommerceStore = create<UseCommerceStore>((set, get) => ({
  commerces: [],
  createCommerce: async (commerce: CommerceDTO) => {
    const newCommerce = await commerceService.createCommerce(commerce);
    set(({ commerces }) => ({
      commerces: [...commerces, newCommerce],
    }));
    return newCommerce as Commerce;
  },
}));
