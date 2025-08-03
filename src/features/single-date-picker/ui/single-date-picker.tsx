import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import { SelectedDate } from "@/features/selected-date/ui/selected-date";
import type { DateRange } from "@/widgets/super-date-picker/model/types";
import { Icon, IconType } from "@/shared/ui";

import "./single-date-picker.scss";

type SingleDatePickerProps = {
  value: DateRange;
  isAllowClear?: boolean;
  onChange: (date: Date | null) => void;
};

export function SingleDatePicker({
  value,
  onChange,
  isAllowClear,
  ...other
}: SingleDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(value.startDate);
  const [open, setOpen] = useState(false);

  const displayStart = startDate
    ? format(startDate, "dd.MM.yyyy HH:mm")
    : "Выберите дату начала";

  useEffect(() => {
    setStartDate(value.startDate);
  }, [value.startDate]);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    onChange(date);
  };

  const onReset = () => {
    setStartDate(null);
    onChange(null);
  };

  return (
    <div className="singleDatePicker">
      <ReactDatePicker
        selected={startDate}
        onChange={handleChange}
        showTimeInput={true}
        placeholderText="Выберите дату"
        onClickOutside={() => setOpen(false)}
        customInput={
          <SelectedDate
            label={displayStart}
            onClick={() => setOpen((prev) => !prev)}
          />
        }
        {...other}
      />
      {isAllowClear && startDate && (
        <Icon type={IconType.CLOSE} className="clear" onClick={onReset} />
      )}
    </div>
  );
}
