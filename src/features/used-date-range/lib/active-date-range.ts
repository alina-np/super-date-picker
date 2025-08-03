import type { DateRange } from "@/widgets/super-date-picker/model/types";
import type { InitialDateRange } from "../model/initial-date-range";

export const isActiveDateRange = (
  value: DateRange,
  range: InitialDateRange
): boolean => {
  return (
    value.startDate?.getTime() === range.startDate?.getTime() &&
    value.endDate?.getTime() === range.endDate?.getTime()
  );
};
