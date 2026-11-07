import { isAxiosError, type AxiosResponse } from "axios";

import { handleAxiosErrors } from "@shared/utils/handleAxiosError";

// request handler
export const withErrorHandling = async <T>(
  call: () => Promise<AxiosResponse<T>>,
): Promise<T> => {
  try {
    const { data } = await call();
    return data;
  } catch (error) {
    if (isAxiosError(error)) throw handleAxiosErrors(error);
    throw error;
  }
};
