import type { SellPoint, SellPointRequest, User } from "@/types";

export type UseSellPointStore = {
  sellPoints: SellPoint[];
  totalSellPoints: number;
  formSellPoint: SellPoint | null;
  isFormModalOpen: boolean;
  isLoading: boolean;
  error: string | null;
  isPendingToggleActive: boolean;
  openEdit: (sellPoint: SellPoint) => void;
  openCreate: () => void;
  closeFormModal: () => void;
  cashiersModalSellPoint: SellPoint | null;
  isCashiersModalOpen: boolean;
  openCashiersModal: (sellPoint: SellPoint) => void;
  closeCashiersModal: () => void;
  createSellPoint: (sellPoint: SellPointRequest) => Promise<void>;
  updateSellPoint: (
    sellPointId: number,
    sellPoint: SellPointRequest,
  ) => Promise<void>;
  getSellPoints: () => Promise<void>;
  getSellPointCashiers: (sellPointId: number) => Promise<User[]>;
  toggleActive: (sellPointId: number) => Promise<void>;
};
