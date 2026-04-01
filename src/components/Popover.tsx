import {
  createContext,
  useEffect,
  useContext,
  useId,
  useState,
  type MouseEventHandler,
  type ReactNode,
} from "react";

const not = (x: boolean): boolean => !x;
const OPEN_POPOVER_EVENT = "popover:open";
type PopoverPlacement = "above" | "below";
type PopoverOpenOn = "left" | "right";

type PopoverContextValue = {
  isOpen: boolean;
  placement: PopoverPlacement;
  openOn: PopoverOpenOn;
  toggle: () => void;
};

type PopoverTriggerProps = {
  onClick?: MouseEventHandler<HTMLElement>;
  onContextMenu?: MouseEventHandler<HTMLElement>;
};

type PopOverComponent = ((props: {
  children: ReactNode;
  placement?: PopoverPlacement;
  openOn?: PopoverOpenOn;
}) => ReactNode) & {
  Trigger: ({ children }: { children: ReactNode }) => ReactNode;
  Body: ({ children }: { children: ReactNode }) => ReactNode;
  useTrigger: () => PopoverTriggerProps;
};

/**
 * Popover Context
 * This context will be used to manage the state of the popover, such as whether
 * it is open or closed, and to provide a way for the trigger to toggle the popover.
 */
const PopoverContext = createContext({
  isOpen: false,
  placement: "above" as PopoverPlacement,
  openOn: "left" as PopoverOpenOn,
  toggle: () => {},
});

/**
 * Popover component meant to render bits of related content in a floating container.
 * This should also export sub-components for the popover trigger, header, body,
 * and footer, and use them inside the Popover component. This will allow us to
 * create a more flexible and reusable popover component.
 */
const PopOver: PopOverComponent = function PopOver({
  children,
  placement = "above",
  openOn = "left",
}: {
  children: ReactNode;
  placement?: PopoverPlacement;
  openOn?: PopoverOpenOn;
}) {
  const popoverId = useId();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".popover")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handlePopoverOpen = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;

      if (customEvent.detail.id !== popoverId) {
        setIsOpen(false);
      }
    };

    window.addEventListener(OPEN_POPOVER_EVENT, handlePopoverOpen);

    return () => {
      window.removeEventListener(OPEN_POPOVER_EVENT, handlePopoverOpen);
    };
  }, [popoverId]);

  const toggle = () => {
    setIsOpen((prevIsOpen) => {
      const nextIsOpen = not(prevIsOpen);

      if (nextIsOpen) {
        window.dispatchEvent(
          new CustomEvent(OPEN_POPOVER_EVENT, { detail: { id: popoverId } }),
        );
      }

      return nextIsOpen;
    });
  };

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        placement,
        openOn,
        toggle,
      }}
    >
      <div className="popover">{children}</div>
    </PopoverContext.Provider>
  );
};

function usePopoverTrigger(): PopoverTriggerProps {
  const { openOn, toggle } = useContext<PopoverContextValue>(PopoverContext);

  if (openOn === "right") {
    return {
      onContextMenu: (event) => {
        event.preventDefault();
        toggle();
      },
    };
  }

  return { onClick: () => toggle() };
}

PopOver.useTrigger = usePopoverTrigger;

PopOver.Trigger = function PopOverTrigger({
  children,
}: {
  children: ReactNode;
}) {
  const triggerProps = usePopoverTrigger();

  return (
    <button className="popover-trigger" {...triggerProps}>
      {children}
    </button>
  );
};

// PopOver.Header = function PopOverHeader({ children }: { children: ReactNode }) {
//   return <div className="popover-header">{children}</div>;
// };

PopOver.Body = function PopOverBody({ children }: { children: ReactNode }) {
  const { isOpen, placement } = useContext<PopoverContextValue>(PopoverContext);

  return (
    <div className={`popover-body ${placement} ${isOpen ? "open" : ""}`}>
      {children}
    </div>
  );
};

// PopOver.Footer = function PopOverFooter({ children }: { children: ReactNode }) {
//   return <div className="popover-footer">{children}</div>;
// };

export default PopOver;
