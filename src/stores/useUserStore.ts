import type { User } from "@/types";
import { create } from "zustand";

type UseUserStore = {
  users: User[];
};

export const useUserStore = create<UseUserStore>((set, get) => ({
  users: [],
}));
