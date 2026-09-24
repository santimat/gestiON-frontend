import { userService } from "@/services/user/userService";
import type { User, UserDTO } from "@/types";
import { create } from "zustand";

type UseUserStore = {
  users: User[];
  createUser: (user: UserDTO) => Promise<void>;
};

export const useUserStore = create<UseUserStore>((set, get) => ({
  users: [],
  createUser: async (user: UserDTO) => {
    await userService.createUser(user);
  },
}));
