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

function TimeCircleTrigger() {
  const triggerProps = PopOver.useTrigger();

  return <CircleButton className="popover-trigger" {...triggerProps} />;
}

export default function TimeCircle({ checked, lights }: DungeonTurn) {
  void checked;
  void lights;

  return (
    <PopOver openOn="right" placement="above">
      <TimeCircleTrigger />
      <PopOver.Body>
        <LightMenu />
      </PopOver.Body>
    </PopOver>
  );
}
