import { useMemo } from "react";
import Menu from "../Menu";
import { useCharacters } from "../../context/CharactersContext";

export default function LightMenu() {
  const { characters } = useCharacters();

  // characters
  const characterMenu = useMemo(() => {
    return (
      <>
        {characters.map((character) => (
          <Menu.Item key={character.id} onClick={() => {}}>
            {character.character}
          </Menu.Item>
        ))}
      </>
    );
  }, [characters]);

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
