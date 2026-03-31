import { useState } from "react";
import { AddButton, BackButton, ForwardButton } from "../CircleButton";
import TimeCircle from "./TimeCircle";

type Light = {
  duration: number;
  owner: string;
  type: "torch" | "lamp" | "light spell";
};

type DungeonTurn = {
  checked: boolean;
  lights: Light[];
};

type DungeonHour = [
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
];

const newHour = (): DungeonHour => [
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
];

export default function DungeonTimeTracker() {
  const [state, setState] = useState<DungeonHour[]>([newHour()]);
  const [index, setIndex] = useState<number>(0);

  // Handlers
  const handleAddHour = () => {
    setState((prev) => [...prev, newHour()]);
    setIndex((prev) => prev + 1);
  };

  const handlePreviousHour = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleNextHour = () => {
    if (index < state.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".5rem",
      }}
    >
      <BackButton disabled={index === 0} onClick={handlePreviousHour} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <TimeCircle
          checked={state[index][0].checked}
          lights={state[index][0].lights}
        />
        <TimeCircle
          checked={state[index][1].checked}
          lights={state[index][1].lights}
        />
        <TimeCircle
          checked={state[index][2].checked}
          lights={state[index][2].lights}
        />
        <TimeCircle
          checked={state[index][3].checked}
          lights={state[index][3].lights}
        />
        <TimeCircle
          checked={state[index][4].checked}
          lights={state[index][4].lights}
        />
        <TimeCircle
          checked={state[index][5].checked}
          lights={state[index][5].lights}
        />
      </div>
      {index === state.length - 1 ? (
        <AddButton onClick={handleAddHour} />
      ) : (
        <ForwardButton onClick={handleNextHour} />
      )}
    </div>
  );
}
