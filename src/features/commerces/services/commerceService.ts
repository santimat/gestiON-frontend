import {
  CommercePatchSchema,
  CommerceWithOwnerUpdateSchema,
  CommerceWithOwnerRequestSchema,
} from "@features/commerces/schemas";
import { executeApiCall } from "@shared/utils/apiClient";
import { parseOrThrow } from "@shared/utils/parseOrThrow";
import { backendAPI } from "@shared/services/axiosConfig";
import { toPageParams } from "@shared/utils/pagination";
import type {
  CommerceFilters,
  CommerceWithOwner,
  CurrentCommerce,
} from "@features/commerces/types";

export const commerceService = {
  createCommerceWithOwner: async (commerceWithOwner: FormData) => {
    const objectToParse = Object.fromEntries(commerceWithOwner.entries());
    parseOrThrow(CommerceWithOwnerRequestSchema, objectToParse);

    return executeApiCall(() =>
      backendAPI.post("/commerces", commerceWithOwner),
    );
  },
  getCommercesWithOwner: async (filters?: CommerceFilters) => {
    const data = await executeApiCall(() =>
      backendAPI.get("/commerces", { params: toPageParams(filters ?? {}) }),
    );
    const commercesWithOwner: CommerceWithOwner[] = data?.content ?? [];
    const totalCommerces: number =
      data?.page?.totalElements ??
      data?.totalElements ??
      commercesWithOwner.length;
    const totalPages: number = data?.page?.totalPages ?? data?.totalPages ?? 0;

    return { commercesWithOwner, totalCommerces, totalPages };
  },
  getCommerceStats: async () => {
    return executeApiCall(() => backendAPI.get("/commerces/stats"));
  },
  getCurrentCommerce: async () => {
    return executeApiCall(() => backendAPI.get("/commerces/current"));
  },
  toggleCommerceActive: async (commerceId: number) => {
    return executeApiCall(() =>
      backendAPI.patch(`/commerces/${commerceId}/toggle-active`),
    );
  },
  updateCommerceWithOwner: async ({
    commerceId,
    userId,
    formData,
  }: {
    commerceId: number;
    userId: number;
    formData: FormData;
  }) => {
    const dataToParse = { ...Object.fromEntries(formData), commerceId, userId };
    parseOrThrow(CommerceWithOwnerUpdateSchema, dataToParse);

    return executeApiCall(() =>
      backendAPI.put(`/commerces/${commerceId}/user/${userId}`, formData),
    );
  },

  patchCommerce: async (formData: FormData) => {
    const objectToParse = Object.fromEntries(formData.entries());
    parseOrThrow(CommercePatchSchema, objectToParse);

    return executeApiCall<CurrentCommerce>(() =>
      backendAPI.patch("/commerces", formData),
    );
  },
};
