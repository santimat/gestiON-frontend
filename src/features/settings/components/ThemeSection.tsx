import { Check, Moon, Palette, Sun } from "lucide-react";

import { useTheme } from "@shared/theme/useTheme";
import { SettingsFormSection } from "@features/settings/components/SettingsFormSection";
import type { Theme } from "@shared/types";

const THEME_OPTIONS = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Oscuro", icon: Moon },
] as const satisfies ReadonlyArray<{
  value: Theme;
  label: string;
  icon: typeof Sun;
}>;

export const ThemeSection = () => {
  const { theme, setTheme } = useTheme();

  return (
    <SettingsFormSection
      icon={Palette}
      title="Apariencia"
      mainClasses="grid gap-3 p-4"
    >
      <p id="theme-label" className="text-sm font-medium">
        Tema
      </p>
      <div
        role="group"
        aria-labelledby="theme-label"
        className="grid grid-cols-2 gap-3"
      >
        {THEME_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = theme === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => setTheme(option.value)}
              className={`flex flex-col items-stretch gap-3 rounded-lg border-2 p-3 text-left transition-colors ${
                isSelected
                  ? "border-primary bg-surface ring-primary/15 ring-4"
                  : "border-border bg-surface hover:border-secondary-foreground/40"
              }`}
            >
              <span
                aria-hidden="true"
                className={`theme-preview relative flex h-16 flex-col items-start justify-start gap-2 overflow-hidden rounded-md border p-3 ${
                  option.value === "dark" ? "theme-preview-dark" : ""
                }`}
              >
                <span className="theme-preview-heading h-2 w-3/5 rounded-full" />
                <span className="theme-preview-line h-2 w-2/5 rounded-full" />
                {isSelected ? (
                  <span className="bg-primary text-primary-foreground absolute top-2 right-2 grid h-4 w-4 place-items-center rounded-full">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                ) : null}
              </span>
              <span className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </SettingsFormSection>
  );
};
