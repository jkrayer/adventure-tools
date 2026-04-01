import PopOver from "../Popover";
import { useDungeonTimeTracker } from "./DungeonTimeTrackerContext";

type TurnCircleProps = {
  turnIndex: number;
};

const turnMarkers: Record<number, string> = {
  1: "W",
  3: "W",
  5: "WR",
};

export default function TurnCircle({ turnIndex }: TurnCircleProps) {
  const { currentHour, toggleTurnChecked } = useDungeonTimeTracker();
  const triggerProps = PopOver.useTrigger();
  const checked = currentHour[turnIndex].checked;
  const marker = turnMarkers[turnIndex];

  return (
    <label
      className={`turn-circle ${checked ? "checked" : ""}`}
      onContextMenu={triggerProps.onContextMenu}
    >
      {marker && <span className="turn-circle-marker">{marker}</span>}
      <input
        checked={checked}
        className="turn-circle-checkbox"
        onChange={() => toggleTurnChecked(turnIndex)}
        type="checkbox"
      />
    </label>
  );
}
