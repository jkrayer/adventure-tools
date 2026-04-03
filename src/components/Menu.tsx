import {
  type AnchorHTMLAttributes,
  createContext,
  useEffect,
  useId,
  useContext,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEventHandler,
  type PointerEvent,
  type PropsWithChildren,
  type ReactElement,
} from "react";

type MenuItemButtonBaseProps = PropsWithChildren<{
  as?: "button";
  isDisabled?: boolean;
  holdToConfirmMs?: number;
}>;

type MenuItemButtonProps = MenuItemButtonBaseProps & {
  intent?: "default";
  onClick: MouseEventHandler<HTMLButtonElement>;
};

type MenuItemDangerousButtonProps = MenuItemButtonBaseProps & {
  intent: "danger" | "dangerous";
  onAction: () => void;
};

type MenuItemAnchorProps = PropsWithChildren<{
  as: "a";
  href: string;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel">;

type MenuItemProps =
  | MenuItemButtonProps
  | MenuItemDangerousButtonProps
  | MenuItemAnchorProps;

type MenuDangerousItemProps = PropsWithChildren<{
  holdToConfirmMs?: number;
  isDisabled?: boolean;
  onAction: () => void;
}>;

type MenuProps = PropsWithChildren<{
  onAction?: () => void;
}>;

type MenuSubmenuProps = PropsWithChildren<{
  label: string;
  defaultOpen?: boolean;
  isDisabled?: boolean;
}>;

type MenuComponent = ((props: MenuProps) => ReactElement) & {
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

const MenuActionContext = createContext({
  closeAllMenus: () => {},
});

function MenuDangerousItem({
  children,
  holdToConfirmMs = 1000,
  isDisabled = false,
  onAction,
}: MenuDangerousItemProps) {
  const { closeAllMenus } = useContext(MenuActionContext);
  const [isHolding, setIsHolding] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const isCompleteRef = useRef(false);

  const style = useMemo(
    () => ({ "--danger-hold-ms": `${holdToConfirmMs}ms` }) as CSSProperties,
    [holdToConfirmMs],
  );

  const clearHold = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isCompleteRef.current) {
      setIsHolding(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startHold = (event: PointerEvent<HTMLButtonElement>) => {
    if (isDisabled || event.button !== 0 || timeoutRef.current !== null) {
      return;
    }

    isCompleteRef.current = false;
    setIsHolding(true);
    timeoutRef.current = window.setTimeout(() => {
      isCompleteRef.current = true;
      setIsHolding(false);
      timeoutRef.current = null;
      onAction();
      closeAllMenus();
    }, holdToConfirmMs);
  };

  return (
    <li>
      <button
        className={`menu-item menu-item-danger ${isHolding ? "holding" : ""}`}
        disabled={isDisabled}
        onClick={(event) => {
          event.preventDefault();
        }}
        onPointerCancel={clearHold}
        onPointerDown={startHold}
        onPointerLeave={clearHold}
        onPointerUp={clearHold}
        style={style}
        type="button"
      >
        <span className="menu-item-label">{children}</span>
      </button>
    </li>
  );
}

const Menu = (({ children, onAction }: MenuProps) => {
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);

  const closeAllMenus = () => {
    setOpenSubmenuId(null);
    onAction?.();
  };

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
    <MenuActionContext.Provider value={{ closeAllMenus }}>
      <MenuLevelContext.Provider value={{ openSubmenuId, setOpenSubmenuId }}>
        <menu className="menu" ref={menuRef}>
          {children}
        </menu>
      </MenuLevelContext.Provider>
    </MenuActionContext.Provider>
  );
}) as MenuComponent;

Menu.Item = function MenuItem(menuItemProps: MenuItemProps) {
  const { as = "button", children, isDisabled = false } = menuItemProps;
  const { closeAllMenus } = useContext(MenuActionContext);

  if (as === "a") {
    const { href, onClick, rel, target } = menuItemProps as MenuItemAnchorProps;

    return (
      <li>
        <a
          className="menu-item"
          href={href}
          onClick={(event) => {
            if (isDisabled) {
              event.preventDefault();
              return;
            }

            onClick?.(event);

            if (!event.defaultPrevented) {
              closeAllMenus();
            }
          }}
          rel={rel}
          target={target}
        >
          {children}
        </a>
      </li>
    );
  }

  if (
    "intent" in menuItemProps &&
    (menuItemProps.intent === "dangerous" || menuItemProps.intent === "danger")
  ) {
    const { holdToConfirmMs = 1000, onAction } = menuItemProps;

    return (
      <MenuDangerousItem
        holdToConfirmMs={holdToConfirmMs}
        isDisabled={isDisabled}
        onAction={onAction}
      >
        {children}
      </MenuDangerousItem>
    );
  }

  const { onClick } = menuItemProps as MenuItemButtonProps;

  return (
    <li>
      <button
        className="menu-item"
        disabled={isDisabled}
        onClick={(event) => {
          onClick(event);

          if (!event.defaultPrevented) {
            closeAllMenus();
          }
        }}
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
