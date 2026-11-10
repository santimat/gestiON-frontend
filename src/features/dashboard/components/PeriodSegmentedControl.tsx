import { SegmentedControl } from "@mantine/core";

import { COLORS } from "@/shared/utils/colors";
import type {
  PeriodGranularity,
  DashboardStatsByPeriodFilters,
} from "@features/dashboard/types";
import { useIsMobile } from "@/shared/hooks/useMediaQuery";

const PERIODS = [
  { label: "Hoy", value: "DAY" },
  { label: "Semana", value: "WEEK" },
  { label: "Mes", value: "MONTH" },
];

type PeriodSegmentedControlProps = {
  statsByPeriodFilters: DashboardStatsByPeriodFilters;
  setStatsByPeriodFilters: (
    statsByPeriodFilters: DashboardStatsByPeriodFilters,
  ) => void;
};

export const PeriodSegmentedControl = ({
  statsByPeriodFilters,
  setStatsByPeriodFilters,
}: PeriodSegmentedControlProps) => {
  const isMobile = useIsMobile();

  return (
    <SegmentedControl
      className="border-background-soft border"
      data={PERIODS}
      size={isMobile ? "xs" : "md"}
      value={statsByPeriodFilters.granularity}
      onChange={(value) =>
        setStatsByPeriodFilters({
          ...statsByPeriodFilters,
          granularity: value as PeriodGranularity,
        })
      }
      color={COLORS.primary}
      autoContrast
    />
  );
};
