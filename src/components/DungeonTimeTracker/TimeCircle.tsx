import { CircleButton } from "../CircleButton";
import LightMenu from "./LightMenu";
import PopOver from "../Popover";
import { useDungeonTimeTracker } from "./DungeonTimeTrackerContext";

function TimeCircleTrigger() {
  const triggerProps = PopOver.useTrigger();

  return <CircleButton className="popover-trigger" {...triggerProps} />;
}

export default function TimeCircle({ turnIndex }: { turnIndex: number }) {
  const { currentHour } = useDungeonTimeTracker();
  const turn = currentHour[turnIndex];

  void turn;

  return (
    <PopOver openOn="right" placement="above">
      <TimeCircleTrigger />
      <PopOver.Body>
        <LightMenu />
      </PopOver.Body>
    </PopOver>
  );
}
