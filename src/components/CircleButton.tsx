import type { ButtonHTMLAttributes } from "react";

type CircleButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const CircleButton = (props: CircleButtonProps) => {
  return <button {...props} className="btn btn-circle" type="button" />;
};
