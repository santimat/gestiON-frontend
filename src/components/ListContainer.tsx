import { type LucideIcon } from "lucide-react";

import { LoadingPage } from "@/components/Loading";

type ListContainerProps = {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  icon: LucideIcon;
  children: React.ReactNode;
  emptyMessage?: string;
};
export const ListContainer = ({
  isLoading,
  error,
  children,
  isEmpty,
  icon: Icon,
  emptyMessage = "No hay elementos para mostrar",
}: ListContainerProps) => {
  if (error) return <div className="text-destructive text-center">{error}</div>;

  if (isLoading) return <LoadingPage />;

  if (isEmpty) {
    return (
      <div className="border-border text-secondary-foreground flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border p-10">
        <Icon size={40} strokeWidth={1.5} />
        <p className="text-foreground font-medium">{emptyMessage}</p>
        <p className="text-sm">Agrega uno nuevo para empezar.</p>
      </div>
    );
  }

  return <>{children}</>;
};
