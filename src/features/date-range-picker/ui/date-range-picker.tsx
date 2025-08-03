import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import type { DateRange } from "@/widgets/super-date-picker/model/types";
import { Icon, IconType } from "@/shared/ui";
import { SelectedDate } from "@/features/selected-date/ui/selected-date";

import "./date-range-picker.scss";

type DateRangePickerProps = {
  value: DateRange;
  isAllowClear?: boolean;
  onChange: (value: DateRange) => void;
};

export function DateRangePicker({
  value,
  onChange,
  isAllowClear,
  ...other
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(value.startDate);
  const [endDate, setEndDate] = useState<Date | null | undefined>(
    value.endDate
  );
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setStartDate(value.startDate);
    setEndDate(value.endDate);
  }, [value]);

  const onStartChange = (date: Date | null) => {
    if (date && endDate && date > endDate) {
      setError(true);
      return;
    } else {
      setError(false);
      setStartDate(date);
      onChange({ startDate: date, endDate });
    }
  };

  const onEndChange = (date: Date | null) => {
    if (date && startDate && date < startDate) {
      setError(true);
      return;
    } else {
      setError(false);
      setEndDate(date);
      onChange({ startDate, endDate: date });
    }
  };

  const onReset = (type: "startDate" | "endDate") => {
    setError(false);
    if (type === "startDate") {
      setStartDate(null);
      onChange({ startDate: null, endDate });
    } else if (type === "endDate") {
      setEndDate(null);
      onChange({ startDate, endDate: null });
    }
  };

  const displayStart = startDate
    ? format(startDate, "dd.MM.yyyy HH:mm")
    : "Выберите дату начала";
  const displayEnd = endDate
    ? format(endDate, "dd.MM.yyyy HH:mm")
    : "Выберите дату окончания";

  return (
    <div className="dateRangePicker">
      <div className="dateRangePicker__data">
        <ReactDatePicker
          selected={startDate}
          onChange={onStartChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          showTimeSelect={true}
          placeholderText="Выберите дату начала"
          customInput={
            <SelectedDate
              label={displayStart}
              onClick={() => setOpen((prev) => !prev)}
            />
          }
          {...other}
        />
        {isAllowClear && startDate && (
          <Icon
            type={IconType.CLOSE}
            className="clear"
            onClick={() => onReset("startDate")}
          />
        )}
      </div>
      <Icon type={IconType.RIGHT} />
      <div className="dateRangePicker__data">
        <ReactDatePicker
          selected={endDate}
          onChange={onEndChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || undefined}
          showTimeSelect={true}
          placeholderText="Выберите дату окончания"
          customInput={
            <SelectedDate
              label={displayEnd}
              onClick={() => setOpen((prev) => !prev)}
            />
          }
          {...other}
        />
        {isAllowClear && endDate && (
          <Icon
            type={IconType.CLOSE}
            className="clear"
            onClick={() => onReset("endDate")}
          />
        )}
      </div>
      {error && (
        <div className="error">
          Начальная дата не может быть больше конечной
        </div>
      )}
    </div>
  );
}
