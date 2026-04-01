import { useMemo } from "react";
import Menu from "../Menu";

export default function LightMenu() {
  // characters
  const characterMenu = useMemo(() => {
    return (
      <>
        {startCharacters.map((character) => (
          <Menu.Item key={character.id} onClick={() => {}}>
            {character.character}
          </Menu.Item>
        ))}
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

const startCharacters: Character[] = [
  {
    id: 1,
    character: "Dell Graybeard",
    player: "Jeff",
    currentHP: 90,
    maxHP: 100,
  },
  {
    id: 2,
    character: "Una Undervoot",
    player: "Lianne",
    currentHP: 75,
    maxHP: 100,
  },
  {
    id: 3,
    character: "B.F. Bagman",
    player: "Steve",
    currentHP: 80,
    maxHP: 100,
  },
  {
    id: 4,
    character: "Ryan Wythyneye",
    player: "Bryam",
    currentHP: 85,
    maxHP: 100,
  },
  {
    id: 5,
    character: "Gordon Heavyfoot",
    player: "Roehl",
    currentHP: 95,
    maxHP: 100,
  },
  {
    id: 6,
    character: "Tiny Tim",
    player: "John",
    currentHP: 70,
    maxHP: 100,
  },
];
