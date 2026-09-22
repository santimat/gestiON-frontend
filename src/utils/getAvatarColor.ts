import { AVAILABLE_AVATAR_COLORS } from "@/utils/constants";

export function getAvatarColor(id: number = 0) {
	const randomColorIdx = id % AVAILABLE_AVATAR_COLORS.length;
	return AVAILABLE_AVATAR_COLORS[randomColorIdx];
}
