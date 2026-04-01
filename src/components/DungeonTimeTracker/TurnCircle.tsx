import PopOver from "../Popover";
import { useDungeonTimeTracker } from "./DungeonTimeTrackerContext";

type TurnCircleProps = {
  turnIndex: number;
};

export default function TurnCircle({ turnIndex }: TurnCircleProps) {
  const { currentHour, toggleTurnChecked } = useDungeonTimeTracker();
  const triggerProps = PopOver.useTrigger();
  const checked = currentHour[turnIndex].checked;

  return (
    <label
      className={`turn-circle ${checked ? "checked" : ""}`}
      onContextMenu={triggerProps.onContextMenu}
    >
      <input
        checked={checked}
        className="turn-circle-checkbox"
        onChange={() => toggleTurnChecked(turnIndex)}
        type="checkbox"
      />
    </label>
  );
}
