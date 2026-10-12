import { useAuth } from "@/hooks/useAuth";
import { LeftSection } from "@/components/auth/LeftSection";
import { RightSection } from "@/components/auth/RightSection";
import { Navigate } from "react-router";
import { useEffect } from "react";
export const AuthPage = () => {
  const { authenticatedUser, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const navigateTo =
    authenticatedUser?.role === "SUDO" ? "/commerces" : "/dashboard";
  if (authenticatedUser?.email) return <Navigate to={navigateTo} />;

  return (
    <div className="grid min-h-screen grid-cols-2">
      <LeftSection />
      <RightSection />
    </div>
  );
};
