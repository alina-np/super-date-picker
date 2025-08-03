export type DateRange = {
  startDate: Date | null;
  endDate?: Date | null;
};

export type SuperDatePickerProps = {
  value: DateRange;
  onChange?: (value: DateRange) => void;
  id?: string | number;
  singleDate?: boolean;
  timeFormat?: string;
  dateFormat?: string;
  className?: string;
  isCommonUsedDate?: boolean;
  width?: "auto" | "full";
  isAllowClear?: boolean;
};
