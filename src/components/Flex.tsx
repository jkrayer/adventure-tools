/**
 * Flex component
 * A flexible layout component for creating flexbox containers.
 * Supports justifyContent alignment and can be extended with sub-components.
 */

import type { ReactNode } from "react";

type Gap = "small" | "medium";

type FlexProps = {
  children: ReactNode;
  gap?: Gap;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
};

type FlexComponent = ((props: FlexProps) => ReactNode) & {
  Col: (props: { children: ReactNode; gap?: Gap }) => ReactNode;
};

const Flex = (({
  children,
  gap = "small",
  justifyContent = "flex-start",
}: FlexProps) => {
  const cls = gap === "medium" ? "flex-row gap-medium" : "flex-row";
  return (
    <div className={cls} style={{ justifyContent }}>
      {children}
    </div>
  );
}) as FlexComponent;

Flex.Col = function FlexCol({
  children,
  gap = "small",
}: {
  children: ReactNode;
  gap?: Gap;
}) {
  const cls = gap === "medium" ? "flex-col gap-medium" : "flex-col";
  return <div className={cls}>{children}</div>;
};

export default Flex;
