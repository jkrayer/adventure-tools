import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className, ...props }: InputProps) {
  return (
    <input {...props} className={className ? `input ${className}` : "input"} />
  );
}

export default Input;
