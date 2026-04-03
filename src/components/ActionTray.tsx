import type { PropsWithChildren } from "react";
import Flex from "./Flex";

/**
 * Tray is a component used to reserve some portion of the screen for a tool
 * or set of tools
 *
 * May be a compound component or a set of highly similar components...
 */

type TrayProps = PropsWithChildren<{ devMode?: boolean }>;

export default function ActionTray({ children }: TrayProps) {
  return <div className="tray tray-actions">{children}</div>;
}

export function CharacterTray({ children }: TrayProps) {
  return (
    <div className="tray tray-characters">
      <Flex.Col>{children}</Flex.Col>
    </div>
  );
}
