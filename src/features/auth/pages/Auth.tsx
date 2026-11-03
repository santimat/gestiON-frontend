import { useEffect } from "react";

import { useAuth } from "@features/auth/hooks/useAuth";
import { LeftSection } from "@features/auth/components/LeftSection";
import { RightSection } from "@features/auth/components/RightSection";
import { LoadingPage } from "@shared/components/Loading";

export const AuthPage = () => {
  const { checkAuth, isCheckingAuth, hasHydrated } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // esperamos a saber si hay sesión para no mostrar el formulario y redirigir después
  if (isCheckingAuth || !hasHydrated) return <LoadingPage />;

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <LeftSection />
      <RightSection />
    </div>
  );
};
