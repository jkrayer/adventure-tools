import {
  createContext,
  useEffect,
  useId,
  useContext,
  useRef,
  useState,
  type CSSProperties,
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

type MenuLevelContextValue = {
  openSubmenuId: string | null;
  setOpenSubmenuId: (id: string | null) => void;
};

const MenuLevelContext = createContext<MenuLevelContextValue>({
  openSubmenuId: null,
  setOpenSubmenuId: () => {},
});

const Menu = (({ children }: PropsWithChildren<unknown>) => {
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpenSubmenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MenuLevelContext.Provider value={{ openSubmenuId, setOpenSubmenuId }}>
      <menu className="menu" ref={menuRef}>
        {children}
      </menu>
    </MenuLevelContext.Provider>
  );
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
  const id = useId();
  const { openSubmenuId, setOpenSubmenuId } = useContext(MenuLevelContext);
  const [nestedOpenSubmenuId, setNestedOpenSubmenuId] = useState<string | null>(
    null,
  );

  const isOpen = openSubmenuId === id;

  const [submenuTop, setSubmenuTop] = useState(0);
  const [openDirection, setOpenDirection] = useState<"left" | "right">("right");
  const submenuRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const rootRef = useRef<HTMLLIElement | null>(null);

  // Open on mount if defaultOpen — use a ref so the effect deps stay stable.
  const defaultOpenRef = useRef(defaultOpen && !isDisabled);
  useEffect(() => {
    if (defaultOpenRef.current) {
      setOpenSubmenuId(id);
    }
  }, [id, setOpenSubmenuId]);

  // Reset nested scope whenever this submenu closes.
  useEffect(() => {
    if (!isOpen) {
      setNestedOpenSubmenuId(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updatePosition = () => {
      const submenu = submenuRef.current;
      const trigger = triggerRef.current;
      const root = rootRef.current;

      if (!submenu || !trigger || !root) {
        return;
      }

      const viewportPadding = 8;
      const triggerRect = trigger.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      const submenuRect = submenu.getBoundingClientRect();

      const centeredTop =
        triggerRect.top +
        triggerRect.height / 2 -
        rootRect.top -
        submenuRect.height / 2;

      let nextTop = centeredTop;
      const topInViewport = rootRect.top + nextTop;
      const bottomInViewport = topInViewport + submenuRect.height;

      if (topInViewport < viewportPadding) {
        nextTop += viewportPadding - topInViewport;
      }

      if (bottomInViewport > window.innerHeight - viewportPadding) {
        nextTop -= bottomInViewport - (window.innerHeight - viewportPadding);
      }

      const rightGap = 4;
      const hasRoomOnRight =
        triggerRect.right + rightGap + submenuRect.width <=
        window.innerWidth - viewportPadding;
      const hasRoomOnLeft =
        triggerRect.left - rightGap - submenuRect.width >= viewportPadding;

      setOpenDirection(!hasRoomOnRight && hasRoomOnLeft ? "left" : "right");
      setSubmenuTop(nextTop);
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen]);

  const submenuStyle = {
    "--submenu-top": `${submenuTop}px`,
  } as CSSProperties;

  return (
    <li className="menu-submenu" ref={rootRef}>
      <button
        aria-expanded={isOpen}
        className="menu-item menu-submenu-trigger"
        disabled={isDisabled}
        onClick={() => setOpenSubmenuId(isOpen ? null : id)}
        ref={triggerRef}
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

      <MenuLevelContext.Provider
        value={{
          openSubmenuId: nestedOpenSubmenuId,
          setOpenSubmenuId: setNestedOpenSubmenuId,
        }}
      >
        <menu
          className={`menu menu-nested ${openDirection === "left" ? "open-left" : "open-right"} ${isOpen ? "open" : ""}`}
          ref={submenuRef}
          style={submenuStyle}
        >
          {children}
        </menu>
      </MenuLevelContext.Provider>
    </li>
  );
};

export default Menu;
