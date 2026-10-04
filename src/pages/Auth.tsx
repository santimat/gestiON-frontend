import { LeftSection } from "@/components/auth/LeftSection";
import { RightSection } from "@/components/auth/RightSection";
export const AuthPage = () => {
  return (
    <div className="grid min-h-screen grid-cols-2">
      <LeftSection />
      <RightSection />
    </div>
  );
};
