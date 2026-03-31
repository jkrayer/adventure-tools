import {
  createContext,
  useEffect,
  useContext,
  useState,
  type ReactNode,
} from "react";

const not = (x: boolean): boolean => !x;

/**
 * Popover Context
 * This context will be used to manage the state of the popover, such as whether
 * it is open or closed, and to provide a way for the trigger to toggle the popover.
 */
const PopoverContext = createContext({
  isOpen: false,
  toggle: () => {},
});

/**
 * Popover component meant to render bits of related content in a floating container.
 * This should also export sub-components for the popover trigger, header, body,
 * and footer, and use them inside the Popover component. This will allow us to
 * create a more flexible and reusable popover component.
 */
function PopOver({ children }: { children: ReactNode }) {
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

  return (
    <PopoverContext.Provider value={{ isOpen, toggle: () => setIsOpen(not) }}>
      <div className="popover">{children}</div>
    </PopoverContext.Provider>
  );
}

PopOver.Trigger = function PopOverTrigger({
  children,
}: {
  children: ReactNode;
}) {
  const { toggle } = useContext(PopoverContext);

  return (
    <button className="popover-trigger" onClick={toggle}>
      {children}
    </button>
  );
};

// PopOver.Header = function PopOverHeader({ children }: { children: ReactNode }) {
//   return <div className="popover-header">{children}</div>;
// };

PopOver.Body = function PopOverBody({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(PopoverContext);

  return (
    <div className={`popover-body ${isOpen ? "open" : ""}`}>{children}</div>
  );
};

// PopOver.Footer = function PopOverFooter({ children }: { children: ReactNode }) {
//   return <div className="popover-footer">{children}</div>;
// };

export default PopOver;
