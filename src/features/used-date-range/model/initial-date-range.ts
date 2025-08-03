import {
  startOfDay,
  endOfDay,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import type { DateRange } from "src/widgets/super-date-picker";

export type InitialDateRange = DateRange & {
  label: string;
};

export const initialDateRange: InitialDateRange[] = [
  {
    label: "Сегодня",
    startDate: startOfDay(new Date()),
    endDate: endOfDay(new Date()),
  },
  {
    label: "Вчера",
    startDate: startOfDay(addDays(new Date(), -1)),
    endDate: endOfDay(addDays(new Date(), -1)),
  },
  {
    label: "Эта неделя",
    startDate: startOfDay(addDays(new Date(), -6)),
    endDate: endOfDay(new Date()),
  },
  {
    label: "Этот месяц",
    startDate: startOfMonth(new Date()),
    endDate: endOfMonth(new Date()),
  },
  {
    label: "Этот год",
    startDate: startOfYear(new Date()),
    endDate: endOfYear(new Date()),
  },
];
