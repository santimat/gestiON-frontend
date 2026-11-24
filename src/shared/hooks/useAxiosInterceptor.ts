import { isAxiosError } from "axios";
import { useLayoutEffect, useRef } from "react";

import { useAuth } from "@features/auth";
import { backendAPI } from "@shared/services/axiosConfig";
import { normalizeUrl } from "@features/auth/utils/normalizeUrl";
import { isAuthEndpoint } from "@features/auth/utils/checkEndpoint";
import { FORBIDDEN_COOLDOWN_MS } from "@features/auth/constants";
import type { ForbiddenRecord, AuthSnapshot } from "@features/auth/types";

export const useAxiosInterceptor = (): void => {
  const {
    authenticatedUser,
    hasHydrated,
    isCheckingAuth,
    clearAuthenticatedUser,
  } = useAuth();

  const authStateRef = useRef<AuthSnapshot>({
    authenticatedUser,
    hasHydrated,
    isCheckingAuth,
  });

  // evita bucles infinitos si un endpoint devuelve 403 al remontar la vista con el mismo usuario y rol
  const recent403Ref = useRef<Map<string, ForbiddenRecord>>(new Map());

  useLayoutEffect(() => {
    authStateRef.current = {
      authenticatedUser,
      hasHydrated,
      isCheckingAuth,
    };
  }, [authenticatedUser, hasHydrated, isCheckingAuth]);

  useLayoutEffect(() => {
    const interceptorId = backendAPI.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        if (!isAxiosError(error)) {
          return Promise.reject(error);
        }

        const status = error.response?.status;
        if (status !== 401 && status !== 403) {
          return Promise.reject(error);
        }

        const normalizedUrl = normalizeUrl(error.config?.url);
        if (isAuthEndpoint(normalizedUrl)) {
          return Promise.reject(error);
        }

        const currentAuth = authStateRef.current;
        if (
          !currentAuth.authenticatedUser ||
          !currentAuth.hasHydrated ||
          currentAuth.isCheckingAuth
        ) {
          return Promise.reject(error);
        }

        if (status === 403) {
          const now = Date.now();
          for (const [key, record] of recent403Ref.current.entries()) {
            if (record.expiresAt <= now) {
              recent403Ref.current.delete(key);
            }
          }

          const method = (error.config?.method ?? "get").toUpperCase();
          const endpointKey = `${method}:${normalizedUrl}`;
          const userKey = `${currentAuth.authenticatedUser.email}:${currentAuth.authenticatedUser.role}`;
          const previous = recent403Ref.current.get(endpointKey);

          if (previous && previous.userKey === userKey) {
            return Promise.reject(error);
          }

          recent403Ref.current.set(endpointKey, {
            userKey,
            expiresAt: now + FORBIDDEN_COOLDOWN_MS,
          });
        }

        // sincronizamos la ref al instante para ignorar errores paralelos antes del próximo render
        authStateRef.current = {
          authenticatedUser: null,
          hasHydrated: false,
          isCheckingAuth: false,
        };
        clearAuthenticatedUser();

        return Promise.reject(error);
      },
    );

    return () => {
      backendAPI.interceptors.response.eject(interceptorId);
    };
  }, [clearAuthenticatedUser]);
};
