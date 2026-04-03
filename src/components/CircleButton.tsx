import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import Icon from "./Icon";

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
      <Icon name="plus" />
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
      <Icon name="back" />
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
      <Icon name="forward" />
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
      <Icon name="github" />
    </CircleLink>
  );
};
