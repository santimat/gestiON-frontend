import { Store } from "lucide-react";

export const PreviewPanel = () => {
  const SELL_DETAIL = [
    { code: "V-1042", detail: "5 productos · Efectivo", total: "$18.450" },
    { code: "V-1041", detail: "2 productos · Mercado Pago", total: "$7.390" },
  ];

  const PREVIEW_STATS = [
    { label: "Ventas hoy", value: "$54.270" },
    { label: "Ticket prom.", value: "$13.568" },
    { label: "Stock crítico", value: "3" },
  ];
  const PREVIEW_BARS = [38, 62, 45, 80, 55, 92, 70];

  return (
    <div className="bg-card shadow-raised border-border overflow-hidden rounded-2xl border">
      <div className="border-border flex items-center justify-between border-b px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground grid h-6 w-6 place-items-center rounded-md">
            <Store className="h-auto w-4" color="white" strokeWidth={2} />
          </span>
          <p className="text-sm font-medium">MaxiKiosco Don Juan</p>
        </div>
        <p className="text-secondary-foreground text-xs">Hoy</p>
      </div>

      <div className="border-border grid grid-cols-3 gap-3 border-b p-5">
        {PREVIEW_STATS.map(({ label, value }) => (
          <div
            key={label}
            className="bg-background border-border rounded-lg border p-3"
          >
            <p className="text-secondary-foreground text-[11px]">{label}</p>
            <p className="mt-1 text-sm font-semibold sm:text-base">{value}</p>
          </div>
        ))}
      </div>

      <div className="border-border flex h-32 items-end gap-2 border-b px-5 py-5">
        {PREVIEW_BARS.map((height, index) => (
          <div
            key={`bar-${index}`}
            className={`flex-1 rounded-sm ${
              index === 5 ? "bg-primary" : "bg-primary/30"
            }`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>

      <div className="space-y-2 p-5">
        {SELL_DETAIL.map(({ code, detail, total }) => (
          <div
            key={code}
            className="border-border flex items-center justify-between rounded-lg border p-3"
          >
            <div>
              <p className="text-xs font-medium">{code}</p>
              <p className="text-secondary-foreground text-[11px]">{detail}</p>
            </div>
            <p className="text-success text-xs font-semibold">{total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
