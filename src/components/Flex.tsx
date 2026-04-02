/**
 * Flex component
 * A flexible layout component for creating flexbox containers.
 * Supports justifyContent alignment and can be extended with sub-components.
 */

import type { ReactNode } from "react";

type FlexProps = {
  children: ReactNode;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
};

type FlexComponent = ((props: FlexProps) => ReactNode) & {
  Col: (props: { children: ReactNode }) => ReactNode;
};

const Flex = (({ children, justifyContent = "flex-start" }: FlexProps) => {
  return (
    <div className="flex" style={{ justifyContent }}>
      {children}
    </div>
  );
}) as FlexComponent;

Flex.Col = function FlexCol({ children }: { children: ReactNode }) {
  return <div className="flex col">{children}</div>;
};

export default Flex;
