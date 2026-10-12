import { Link } from "react-router";
import { Button } from "@mantine/core";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:py-16">
        <div>
          <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            ¿Listo para ordenar tu stock?
          </h2>
          <p className="text-secondary-foreground mt-2 text-sm sm:text-base">
            Entrá con el acceso de demostración y recorré las pantallas.
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Link to="/login" className="flex items-center gap-2">
            Ingresar al sistema
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};
