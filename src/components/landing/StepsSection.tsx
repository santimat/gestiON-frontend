export const StepsSection = () => {
  const STEPS = [
    {
      step: 1,
      title: "Pedí el alta de tu comercio",
      description:
        "El comercio lo creamos nosotros desde el panel privado y te pasamos el acceso.",
    },
    {
      step: 2,
      title: "Cargá productos y categorías",
      description:
        "Precio, stock inicial y código. Los que ya tenés los editás cuando quieras.",
    },
    {
      step: 3,
      title: "Vendé y mirá el panel",
      description:
        "Tus cajeros cobran desde el mostrador; vos revisás ganancias cuando quieras.",
    },
  ];
  return (
    <section id="how-to-start" className="border-border scroll-mt-20 border-b">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Cómo empezar
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ step, title, description }) => (
            <li key={`${step}-${title}`} className="relative">
              {step < STEPS.length && (
                <span className="bg-primary absolute top-4 left-8 hidden h-0.5 w-full md:block"></span>
              )}
              <span className="bg-card text-primary border-border grid h-8 w-8 place-items-center rounded-full border text-sm font-semibold">
                {step}
              </span>
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="text-secondary-foreground mt-1.5 text-sm leading-relaxed">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
