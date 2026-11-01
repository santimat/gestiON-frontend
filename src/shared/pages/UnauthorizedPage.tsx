import { Link, useNavigate } from "react-router";
import { Button } from "@mantine/core";
import { ArrowLeft, Home, ShieldX } from "lucide-react";

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    // si el usuario tiene historial de navegación, lo llevamos a la página anterior
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    // si no tiene historial, lo llevamos al inicio
    navigate("/");
  };

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="bg-primary-soft text-primary mb-8 flex h-24 w-24 items-center justify-center rounded-full">
        <ShieldX className="h-12 w-12" aria-hidden="true" />
      </div>

      <div className="max-w-md text-center">
        <p className="text-secondary-foreground text-sm font-semibold tracking-wide uppercase">
          Error 403
        </p>
        <h1 className="text-foreground mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Acceso no permitido
        </h1>
        <p className="text-secondary-foreground mt-4 text-base">
          No tenés permisos para entrar a esta sección. Si creés que deberías
          tener acceso, hablá con el dueño del comercio.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            component={Link}
            to="/"
            className="w-full sm:w-auto"
            leftSection={<Home className="h-4 w-4" />}
          >
            Ir al inicio
          </Button>
          <Button
            variant="outline"
            onClick={handleBack}
            className="w-full sm:w-auto"
            leftSection={<ArrowLeft className="h-4 w-4" />}
          >
            Volver atrás
          </Button>
        </div>
      </div>

      <p className="text-secondary-foreground mt-16 text-sm">
        GestiON — Gestión de inventario y ventas para pymes
      </p>
    </main>
  );
};
