import { AVAILABLE_AVATAR_COLORS } from "@/utils/constants";

export const getAvatarColor = (id: number = 0) => {
  // color estable por usuario, siempre dentro del largo de la paleta
  const colorIdx = id % AVAILABLE_AVATAR_COLORS.length;
  return AVAILABLE_AVATAR_COLORS[colorIdx];
};
