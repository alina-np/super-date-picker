import { ReactComponent as Right } from "@/shared/assets/icons/right.svg";
import { ReactComponent as Calendar } from "@/shared/assets/icons/calendar.svg";
import { ReactComponent as Close } from "@/shared/assets/icons/close.svg";

import "./icon.scss";

export enum IconType {
  CALENDAR = "calendar",
  RIGHT = "right",
  CLOSE = "close",
}

interface IconProps {
  type: IconType;
  className?: string;
  onClick?: VoidFunction;
}

export function Icon({ type, className, onClick }: IconProps) {
  const iconMap = {
    [IconType.CALENDAR]: Calendar,
    [IconType.RIGHT]: Right,
    [IconType.CLOSE]: Close,
  };

  const IconComponent = iconMap[type];
  return <IconComponent onClick={onClick} className={`icon ${className || ''}`} />;
}
