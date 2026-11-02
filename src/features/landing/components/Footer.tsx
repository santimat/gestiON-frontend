import { GestiONLogo } from "@/shared/components/GestiONLogo";

export const Footer = () => {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <GestiONLogo className="h-auto w-6" />
          <p className="text-sm font-medium">GestiON</p>
        </div>
        <p className="text-secondary-foreground text-xs">
          Gestión de inventario y ventas para pymes
        </p>
      </div>
    </footer>
  );
};
