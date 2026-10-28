import type {
  CommerceStats,
  CommerceWithOwner,
  CurrentCommerce,
} from "@/types";

export type UseCommerceStore = {
  // Estado de UI: modal de alta/edición de comercio
  formCommerce: CommerceWithOwner | null;
  isFormModalOpen: boolean;
  openEdit: (commerce: CommerceWithOwner) => void;
  openCreate: () => void;
  closeFormModal: () => void;

  commercesWithOwner: CommerceWithOwner[];
  commerceStats?: CommerceStats | null;
  currentCommerce?: CurrentCommerce | null;
  isPendingToggleActive: boolean;
  isLoading: boolean;
  error: string | null;
  createCommerceWithOwner: (commercesWithOwner: FormData) => Promise<void>;
  getCommercesWithOwner: () => Promise<void>;
  getCommerceStats: () => Promise<void>;
  getCurrentCommerce: () => Promise<void>;
  toggleCommerceActive: (commerceId: number) => Promise<void>;
  updateCommerceWithOwner: ({
    commerceId,
    userId,
    formData,
  }: {
    commerceId: number;
    userId: number;
    formData: FormData;
  }) => Promise<void>;
};
