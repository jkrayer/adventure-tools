import type { ButtonHTMLAttributes } from "react";

type CircleButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const CircleButton = (props: CircleButtonProps) => {
  return <button {...props} className="btn btn-circle" type="button" />;
};

export const AddButton = ({
  title = "Add",
  ...props
}: Omit<CircleButtonProps, "children">) => {
  return (
    <CircleButton
      {...props}
      className="btn btn-circle btn-plus"
      title={title}
      type="button"
    >
      <svg
        className="btn-plus-icon"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="7" width="16" height="2"></rect>
        <rect x="7" y="0" width="2" height="16"></rect>
      </svg>
    </CircleButton>
  );
};

export const BackButton = ({
  title = "Back",
  ...props
}: Omit<CircleButtonProps, "children">) => {
  return (
    <CircleButton
      {...props}
      className="btn btn-circle btn-plus"
      title={title}
      type="button"
    >
      <svg
        className="btn-plus-icon"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="7" width="14" height="2"></rect>
        <polygon points="0,8 7,4 7,12" />
      </svg>
    </CircleButton>
  );
};

export const ForwardButton = ({
  title = "Forward",
  ...props
}: Omit<CircleButtonProps, "children">) => {
  return (
    <CircleButton
      {...props}
      className="btn btn-circle btn-plus"
      title={title}
      type="button"
    >
      <svg
        className="btn-plus-icon"
        width="16px"
        height="16px"
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="7" width="14" height="2"></rect>
        <polygon points="16,8 9,4 9,12" />
      </svg>
    </CircleButton>
  );
};
