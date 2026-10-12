import { Link } from "react-router";
import { Button } from "@mantine/core";
import { PreviewPanel } from "@/components/landing/PreviewPanel";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="border-border border-b">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div>
          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Tu stock, tus cajeros y tus ventas en una sola pantalla.
          </h1>
          <p className="text-secondary-foreground mt-4 max-w-lg text-base sm:text-lg">
            GestiON es un sistema web para comercios chicos: cargás productos,
            controlás el stock, cobrás rápido desde el mostrador y ves cuánto
            ganaste, desde la PC o el celular.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="gap-2">
              <Link to="/login" className="flex items-center gap-2">
                Empezar a usar el sistema
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <a href="#features" className="flex items-center gap-2">
                Ver qué incluye
              </a>
            </Button>
          </div>
        </div>

        <PreviewPanel />
      </div>
    </section>
  );
};
