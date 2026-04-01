import Menu from "../Menu";
import PopOver from "../Popover";
import { useCharacters } from "../../context/CharactersContext";
import { useDungeonTimeTracker, type Light } from "./DungeonTimeTrackerContext";

const lightSources: Array<{
  label: string;
  light: Pick<Light, "duration" | "type">;
}> = [
  { label: "Light Spell", light: { duration: 6, type: "light spell" } },
  { label: "Lantern", light: { duration: 24, type: "lamp" } },
  { label: "Torch", light: { duration: 6, type: "torch" } },
];

export default function LightMenu({ turnIndex }: { turnIndex: number }) {
  const { characters } = useCharacters();
  const { addLight, removeLight, currentHour } = useDungeonTimeTracker();
  const { close } = PopOver.useControls();
  const turnLights = currentHour[turnIndex].lights;

  return (
    <Menu onAction={close}>
      <Menu.Submenu label="Add Light">
        {lightSources.map(({ label, light }) => (
          <Menu.Submenu key={label} label={label}>
            {characters.map((character) => (
              <Menu.Item
                key={character.id}
                onClick={() =>
                  addLight(turnIndex, {
                    ...light,
                    owner: character.character,
                  })
                }
              >
                {character.character}
              </Menu.Item>
            ))}
          </Menu.Submenu>
        ))}
      </Menu.Submenu>
      <Menu.Submenu label="Cancel Light" isDisabled={turnLights.length === 0}>
        {turnLights.map((light, lightIndex) => (
          <Menu.Item
            key={`${light.owner}-${light.type}-${lightIndex}`}
            onClick={() => removeLight(turnIndex, lightIndex)}
          >
            {`${light.owner} - ${light.type}`}
          </Menu.Item>
        ))}
      </Menu.Submenu>
    </Menu>
  );
}
