import type { ButtonHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

export default function AcquisitionButton({
  children = "Acquire",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={`acquisition-action ${className}`}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight size={16} strokeWidth={1.25} aria-hidden="true" />
    </button>
  );
}
