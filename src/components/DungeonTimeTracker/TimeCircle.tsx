import { CircleButton } from "../CircleButton";
import LightMenu from "./LightMenu";
import PopOver from "../Popover";

type Light = {
  duration: number;
  owner: string;
  type: "torch" | "lamp" | "light spell";
};

type DungeonTurn = {
  checked: boolean;
  lights: Light[];
};

export default function TimeCircle({ checked, lights }: DungeonTurn) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Right-clicked on TimeCircle"); // add light menu
  };

  return (
    <PopOver>
      <PopOver.Trigger>
        <CircleButton onContextMenu={handleClick} />{" "}
      </PopOver.Trigger>
      <PopOver.Body>
        <LightMenu />
      </PopOver.Body>
    </PopOver>
  );
}
