import { useMemo, useState, useRef, useEffect } from "react";
import { isActiveDateRange } from "../lib/active-date-range";
import {
  initialDateRange,
  type InitialDateRange,
} from "../model/initial-date-range";
import type { DateRange } from "@/widgets/super-date-picker";
import { Button, Icon, IconType } from "@/shared/ui";

import "./used-date-range.scss";

type UsedDateRangeProps = {
  value: DateRange;
  onClick: (range: InitialDateRange) => void;
};

export function UsedDateRange({ value, onClick }: UsedDateRangeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const usedRangeRef = useRef<HTMLDivElement>(null);
  const memoizedDateRange = useMemo(() => initialDateRange, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        usedRangeRef.current &&
        !usedRangeRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [usedRangeRef]);

  return (
    <div className="usedRange" ref={usedRangeRef}>
      <div className="usedRange__icon" onClick={() => setIsOpen(!isOpen)}>
        <Icon type={IconType.CALENDAR} />
      </div>
      <div
        data-testid="usedRange-btns"
        className={`usedRange__btns ${isOpen ? "open" : ""}`}
      >
        <p>Обычно используют:</p>
        {memoizedDateRange.map((range, index) => {
          const isActive = isActiveDateRange(value, range);
          return (
            <Button
              data-testid={range.label}
              key={index}
              text={range.label}
              onClick={() => onClick(range)}
              className={`${isActive ? "active" : ""}`}
            />
          );
        })}
      </div>
    </div>
  );
}
