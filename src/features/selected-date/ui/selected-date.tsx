import { useRef } from "react";
import "./selected-date.scss";

type SelestedDateProps = {
  label: string;
  onClick?: VoidFunction;
};

export function SelectedDate({ onClick, label }: SelestedDateProps) {
  const selectedDateRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={selectedDateRef}
      onClick={onClick}
      role="button"
      className="selectedDate"
    >
      {label}
    </div>
  );
}
