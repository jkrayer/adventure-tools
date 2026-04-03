import type { FormHTMLAttributes, SubmitEventHandler } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement>;

export default function Form({ onSubmit, ...props }: FormProps) {
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return <form {...props} onSubmit={handleSubmit} />;
}
