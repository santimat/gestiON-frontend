import { LeftSection } from "@/components/auth/LeftSection";
import { RightSection } from "@/components/auth/RightSection";
export function AuthPage() {
  return (
    <div className="grid grid-cols-2 min-h-screen">
      <LeftSection />
      <RightSection />
    </div>
  );
}
