import { Link } from "react-router";
import { Button } from "@mantine/core";
import { ArrowRight, Store } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-background/85 border-border sticky top-0 z-30 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="GestiON - Inicio"
        >
          <span className="bg-primary text-primary-foreground grid h-8 w-8 shrink-0 place-items-center rounded-lg">
            <Store className="h-auto w-6" strokeWidth={2} color="white" />
          </span>
          <span className="font-display text-base font-semibold">GestiON</span>
        </Link>

        <nav
          aria-label="Secciones principales"
          className="hidden items-center gap-6 md:flex"
        >
          <a
            href="#features"
            className="text-secondary-foreground hover:text-foreground text-sm transition-colors"
          >
            Funcionalidades
          </a>
          <a
            href="#roles"
            className="text-secondary-foreground hover:text-foreground text-sm transition-colors"
          >
            Administrador y cajero
          </a>
          <a
            href="#how-to-start"
            className="text-secondary-foreground hover:text-foreground text-sm transition-colors"
          >
            Cómo empezar
          </a>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button size="sm" className="gap-1">
            <Link to="/login" className="flex items-center gap-1">
              <span className="sm:hidden">Ingresar</span>
              <span className="hidden sm:inline">Empezar a usar</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
