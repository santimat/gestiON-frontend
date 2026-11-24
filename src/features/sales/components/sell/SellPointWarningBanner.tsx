import { AlertCircle } from "lucide-react";

export const SellPointWarningBanner = () => (
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
        No tenés un punto de venta asignado
      </p>
      <p className="mt-0.5 text-sm opacity-90">
        Para registrar una venta debés estar asociado a un punto de venta.
        Pedile al dueño del comercio que te asigne uno.
      </p>
    </div>
  </div>
);
