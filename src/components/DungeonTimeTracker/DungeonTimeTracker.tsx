import { AddButton, BackButton, ForwardButton } from "../CircleButton";
import {
  DungeonTimeTrackerProvider,
  useDungeonTimeTracker,
} from "./DungeonTimeTrackerContext";
import TimeCircle from "./TimeCircle";

function DungeonTimeTrackerContent() {
  const { hours, currentHourIndex, addHour, goToPreviousHour, goToNextHour } =
    useDungeonTimeTracker();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".5rem",
      }}
    >
      <BackButton
        disabled={currentHourIndex === 0}
        onClick={goToPreviousHour}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <TimeCircle turnIndex={0} />
        <TimeCircle turnIndex={1} />
        <TimeCircle turnIndex={2} />
        <TimeCircle turnIndex={3} />
        <TimeCircle turnIndex={4} />
        <TimeCircle turnIndex={5} />
      </div>
      {currentHourIndex === hours.length - 1 ? (
        <AddButton onClick={addHour} />
      ) : (
        <ForwardButton onClick={goToNextHour} />
      )}
    </div>
  );
}

export default function DungeonTimeTracker() {
  return (
    <DungeonTimeTrackerProvider>
      <DungeonTimeTrackerContent />
    </DungeonTimeTrackerProvider>
  );
}
