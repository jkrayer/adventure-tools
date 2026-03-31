import {
  useState,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactElement,
} from "react";

type MenuItemProps = PropsWithChildren<{
  onClick: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}>;

type MenuSubmenuProps = PropsWithChildren<{
  label: string;
  defaultOpen?: boolean;
  isDisabled?: boolean;
}>;

type MenuComponent = ((props: PropsWithChildren<unknown>) => ReactElement) & {
  Item: (props: MenuItemProps) => ReactElement;
  Submenu: (props: MenuSubmenuProps) => ReactElement;
};

const Menu = (({ children }: PropsWithChildren<unknown>) => {
  return <menu className="menu">{children}</menu>;
}) as MenuComponent;

Menu.Item = function MenuItem({
  children,
  onClick,
  isDisabled = false,
}: MenuItemProps) {
  return (
    <li>
      <button
        className="menu-item"
        disabled={isDisabled}
        onClick={onClick}
        type="button"
      >
        {children}
      </button>
    </li>
  );
};

Menu.Submenu = function MenuSubmenu({
  label,
  defaultOpen = false,
  isDisabled = false,
  children,
}: MenuSubmenuProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen && !isDisabled);

  return (
    <li className="menu-submenu">
      <button
        aria-expanded={isOpen}
        className="menu-item menu-submenu-trigger"
        disabled={isDisabled}
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span>{label}</span>
        <span
          aria-hidden="true"
          className={`menu-submenu-caret ${isOpen ? "open" : ""}`}
        >
          ▸
        </span>
      </button>

      <menu className={`menu menu-nested ${isOpen ? "open" : ""}`}>
        {children}
      </menu>
    </li>
  );
};

export default Menu;
