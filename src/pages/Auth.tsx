import { useEffect } from "react";

import { useAuth } from "@/hooks/useAuth";
import { LeftSection } from "@/components/auth/LeftSection";
import { RightSection } from "@/components/auth/RightSection";
import { LoadingPage } from "@/components/Loading";

export const AuthPage = () => {
  const { checkAuth, isCheckingAuth, hasHydrated } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // esperamos a saber si hay sesión para no mostrar el formulario y redirigir después
  if (isCheckingAuth || !hasHydrated) return <LoadingPage />;

  return (
    <div className="grid min-h-screen grid-cols-2">
      <LeftSection />
      <RightSection />
    </div>
  );
};
