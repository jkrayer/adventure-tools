import { createContext, useContext, useState, type ReactNode } from "react";

export type Light = {
  duration: number;
  owner: string;
  type: "torch" | "lamp" | "light spell";
};

export type DungeonTurn = {
  checked: boolean;
  lights: Light[];
};

export type DungeonHour = [
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
  DungeonTurn,
];

type DungeonTimeTrackerContextValue = {
  hours: DungeonHour[];
  currentHour: DungeonHour;
  currentHourIndex: number;
  addHour: () => void;
  goToPreviousHour: () => void;
  goToNextHour: () => void;
};

const DungeonTimeTrackerContext = createContext<
  DungeonTimeTrackerContextValue | undefined
>(undefined);

const newHour = (): DungeonHour => [
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
  { checked: false, lights: [] },
];

export function DungeonTimeTrackerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hours, setHours] = useState<DungeonHour[]>([newHour()]);
  const [currentHourIndex, setCurrentHourIndex] = useState<number>(0);

  const addHour = () => {
    setHours((prev) => [...prev, newHour()]);
    setCurrentHourIndex((prev) => prev + 1);
  };

  const goToPreviousHour = () => {
    setCurrentHourIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNextHour = () => {
    setCurrentHourIndex((prev) => (prev < hours.length - 1 ? prev + 1 : prev));
  };

  return (
    <DungeonTimeTrackerContext.Provider
      value={{
        hours,
        currentHour: hours[currentHourIndex],
        currentHourIndex,
        addHour,
        goToPreviousHour,
        goToNextHour,
      }}
    >
      {children}
    </DungeonTimeTrackerContext.Provider>
  );
}

export function useDungeonTimeTracker() {
  const context = useContext(DungeonTimeTrackerContext);

  if (!context) {
    throw new Error(
      "useDungeonTimeTracker must be used within DungeonTimeTrackerProvider",
    );
  }

  return context;
}
