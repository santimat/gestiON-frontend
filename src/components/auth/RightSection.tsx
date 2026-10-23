import { StoreIcon } from "lucide-react";

import { LoginForm } from "@/components/auth/LoginForm";

export const RightSection = () => {
  return (
    <section className="bg-background lg:border-border flex flex-col justify-center p-6 sm:p-12 lg:border-l">
      {/* encabezado compacto, sólo mobile */}
      <div className="mb-8 flex items-center gap-2 lg:hidden">
        <StoreIcon className="bg-primary text-card h-10 w-10 rounded-lg p-1" />
        <h1 className="text-foreground text-xl font-semibold">GestiON</h1>
      </div>
      <div className="mx-auto w-full max-w-100">
        <LoginForm />
      </div>
    </section>
  );
};
