import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type CircleButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type CircleLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const CircleButton = (props: CircleButtonProps) => {
  return <button {...props} className="btn btn-circle" type="button" />;
};

export const CircleLink = ({ className, ...props }: CircleLinkProps) => {
  return (
    <a
      {...props}
      className={className ? `btn btn-circle ${className}` : "btn btn-circle"}
    />
  );
};

export const AddButton = ({
  title = "Add",
  ...props
}: Omit<CircleButtonProps, "children">) => {
  return (
    <CircleButton
      {...props}
      className="btn btn-circle"
      title={title}
      type="button"
    >
      <svg
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
      className="btn btn-circle"
      title={title}
      type="button"
    >
      <svg
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
      className="btn btn-circle"
      title={title}
      type="button"
    >
      <svg
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

export const GithubLink = ({
  href = "https://github.com/jkrayer/project-goldenrod",
  title = "GitHub repository",
  ...props
}: Omit<CircleLinkProps, "children">) => {
  return (
    <CircleLink
      {...props}
      aria-label={title}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 0C3.58 0 0 3.67 0 8.2C0 11.82 2.29 14.89 5.47 15.97C5.87 16.05 6.02 15.79 6.02 15.56C6.02 15.35 6.01 14.64 6.01 13.89C3.78 14.39 3.31 12.91 3.31 12.91C2.95 11.97 2.43 11.71 2.43 11.71C1.72 11.21 2.49 11.22 2.49 11.22C3.27 11.28 3.68 12.05 3.68 12.05C4.38 13.29 5.52 12.93 5.97 12.71C6.04 12.2 6.24 11.84 6.46 11.63C4.68 11.42 2.81 10.71 2.81 7.54C2.81 6.64 3.12 5.91 3.64 5.33C3.56 5.12 3.29 4.26 3.72 3.08C3.72 3.08 4.39 2.86 6.01 3.99C6.65 3.81 7.33 3.72 8 3.72C8.67 3.72 9.35 3.81 9.99 3.99C11.61 2.86 12.28 3.08 12.28 3.08C12.71 4.26 12.44 5.12 12.36 5.33C12.88 5.91 13.19 6.64 13.19 7.54C13.19 10.72 11.31 11.41 9.53 11.63C9.81 11.88 10.05 12.37 10.05 13.13C10.05 14.21 10.04 15.27 10.04 15.56C10.04 15.79 10.19 16.06 10.6 15.97C13.77 14.89 16 11.82 16 8.2C16 3.67 12.42 0 8 0Z" />
      </svg>
    </CircleLink>
  );
};
