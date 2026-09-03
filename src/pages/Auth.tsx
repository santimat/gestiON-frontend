import { LeftSection } from "@/features/auth/components/LeftSection";
import { RightSection } from "@/features/auth/components/RightSection";
export function AuthPage() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <LeftSection />
      <RightSection />
    </div>
  );
}
