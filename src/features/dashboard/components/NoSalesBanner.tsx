import { AlertCircle } from "lucide-react";

export const NoSalesBanner = () => (
  <div
    className="border-warning/20 bg-warning/10 text-warning flex items-start gap-3 rounded-xl border p-4"
    role="alert"
  >
    <AlertCircle
      size={20}
      strokeWidth={2}
      className="mt-0.5 shrink-0"
      aria-hidden="true"
    />
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold">
        Todavía no hay estadísticas para mostrar dentro de este periodo de
        tiempo.
      </p>
      <p className="mt-0.5 text-sm opacity-90">
        Para poder visualizar las estadísticas primero hay que empezar a operar
        registrando ventas. O bien, puede que el periodo de tiempo seleccionado
        no tenga ventas registradas.
      </p>
    </div>
  </div>
);
