import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

function Label({ className, ...props }: LabelProps) {
  return (
    <label {...props} className={className ? `label ${className}` : "label"} />
  );
}

export default Label;
