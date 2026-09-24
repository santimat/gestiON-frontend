import { useShallow } from "zustand/shallow";

import type { UserDTO } from "@/types";
import { useUserStore } from "@/stores/useUserStore";

export const useUser = () => {
  const { createUser } = useUserStore(
    useShallow(({ createUser }) => ({ createUser })),
  );

  const handleCreateUser = async (user: UserDTO) => {
    await createUser(user);
  };

  return {
    handleCreateUser,
  };
};
