import type { DateRange, SuperDatePickerProps } from "../model/types";
import {
  DateRangePicker,
  SingleDatePicker,
  UsedDateRange,
  type InitialDateRange,
} from "@/features";

import "./super-date-picker.scss";
import "react-datepicker/dist/react-datepicker.css";

export function SuperDatePicker({
  value,
  onChange,
  singleDate = false,
  timeFormat = "HH:mm",
  dateFormat = "yyyy-MM-dd",
  className = "",
  isCommonUsedDate = true,
  width = "full",
  isAllowClear = true,
}: SuperDatePickerProps) {
  const commonProps = { dateFormat, timeFormat, isAllowClear };

  const onTimeChange = (range: DateRange) => {
    if (onChange) {
      onChange(range);
    }
  };

  const handleSingleDateChange = (date: Date | null) => {
    onTimeChange({ startDate: date, endDate: null });
  };

  const handleDateRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    onTimeChange({ startDate: start, endDate: end });
  };

  const handleDateRangeClick = (range: InitialDateRange) => {
    onTimeChange(range);
  };

  return (
    <div className={`superDatePicker superDatePicker-${width} ${className}`}>
      {isCommonUsedDate && (
        <UsedDateRange onClick={handleDateRangeClick} value={value} />
      )}
      {singleDate ? (
        <SingleDatePicker
          value={value}
          onChange={handleSingleDateChange}
          {...commonProps}
        />
      ) : (
        <DateRangePicker
          value={value}
          onChange={() => handleDateRangeChange}
          {...commonProps}
        />
      )}
    </div>
  );
}
