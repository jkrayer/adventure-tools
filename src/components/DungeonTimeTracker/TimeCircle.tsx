import LightMenu from "./LightMenu";
import PopOver from "../Popover";
import { useDungeonTimeTracker } from "./DungeonTimeTrackerContext";
import TurnCircle from "./TurnCircle";

export default function TimeCircle({ turnIndex }: { turnIndex: number }) {
  const { currentHour } = useDungeonTimeTracker();
  void currentHour;

  return (
    <PopOver openOn="right" placement="above">
      <TurnCircle turnIndex={turnIndex} />
      <PopOver.Body>
        <LightMenu />
      </PopOver.Body>
    </PopOver>
  );
}
