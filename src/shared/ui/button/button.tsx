import type { ButtonHTMLAttributes } from "react";
import "./button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

export function Button({ text, className, ...props }: ButtonProps) {
  return (
    <button className={`btn ${className}`} {...props}>
      {text}
    </button>
  );
}
