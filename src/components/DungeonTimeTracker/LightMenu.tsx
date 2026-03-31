import { useMemo } from "react";
import Menu from "../Menu";

export default function LightMenu() {
  // characters
  const characterMenu = useMemo(() => {
    return (
      <>
        <Menu.Item onClick={() => {}}>Light Spell</Menu.Item>
        <Menu.Item onClick={() => {}}>Lantern</Menu.Item>
        <Menu.Item onClick={() => {}}>Torch</Menu.Item>
      </>
    );
  }, []);

  return (
    <Menu>
      <Menu.Submenu label="Add Light">
        <Menu.Submenu label="LightSpell">{characterMenu}</Menu.Submenu>
        <Menu.Submenu label="Lantern">{characterMenu}</Menu.Submenu>
        <Menu.Submenu label="Torch">{characterMenu}</Menu.Submenu>
      </Menu.Submenu>
      {/* if no lights then disable */}
      <Menu.Item onClick={() => {}}>Cancel Light</Menu.Item>
    </Menu>
  );
}
