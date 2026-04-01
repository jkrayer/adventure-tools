import { createContext, useContext, type ReactNode } from "react";
import { useSyncState } from "../../lib";

export type Light = {
  id?: string;
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
  addLight: (turnIndex: number, light: Light) => void;
  removeLight: (turnIndex: number, lightIndex: number) => void;
  goToPreviousHour: () => void;
  goToNextHour: () => void;
  toggleTurnChecked: (turnIndex: number) => void;
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

const turnsPerHour = 6;

export function DungeonTimeTrackerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [hours, setHours] = useSyncState<DungeonHour[]>(
    "dungeon-time-tracker-hours",
    [newHour()],
  );
  const [currentHourIndex, setCurrentHourIndex] = useSyncState<number>(
    "dungeon-time-tracker-current-hour-index",
    0,
  );
  const safeCurrentHourIndex = Math.min(currentHourIndex, hours.length - 1);

  const addHour = () => {
    setHours((prev) => {
      const lastTurn = prev[prev.length - 1][turnsPerHour - 1];
      const hourTurns = newHour();

      lastTurn.lights.forEach((light) => {
        const remainingDuration = light.duration - 1;

        for (
          let offset = 0;
          offset < remainingDuration && offset < turnsPerHour;
          offset += 1
        ) {
          hourTurns[offset] = {
            ...hourTurns[offset],
            lights: [
              ...hourTurns[offset].lights,
              { ...light, duration: remainingDuration - offset },
            ],
          };
        }
      });

      return [...prev, hourTurns];
    });
    setCurrentHourIndex((prev) => prev + 1);
  };

  const addLight = (turnIndex: number, light: Light) => {
    setHours((prev) => {
      const nextHours = [...prev];
      const lightId = light.id ?? crypto.randomUUID();
      const startTurn = safeCurrentHourIndex * turnsPerHour + turnIndex;
      const maxTurn = nextHours.length * turnsPerHour - 1;
      const endOffset = Math.min(light.duration - 1, maxTurn - startTurn);

      for (let offset = 0; offset <= endOffset; offset += 1) {
        const absoluteTurn = startTurn + offset;
        const targetHourIndex = Math.floor(absoluteTurn / turnsPerHour);
        const targetTurnIndex = absoluteTurn % turnsPerHour;

        nextHours[targetHourIndex] = nextHours[targetHourIndex].map(
          (turn, index) =>
            index === targetTurnIndex
              ? {
                  ...turn,
                  lights: [
                    ...turn.lights,
                    {
                      ...light,
                      id: lightId,
                      duration: light.duration - offset,
                    },
                  ],
                }
              : turn,
        ) as DungeonHour;
      }

      return nextHours;
    });
  };

  const removeLight = (turnIndex: number, lightIndex: number) => {
    setHours((prev) => {
      const targetLight =
        prev[safeCurrentHourIndex]?.[turnIndex]?.lights[lightIndex];

      if (!targetLight) {
        return prev;
      }

      if (!targetLight.id) {
        return prev.map((hour, hourIndex) => {
          if (hourIndex !== safeCurrentHourIndex) {
            return hour;
          }

          return hour.map((turn, index) => {
            if (index !== turnIndex) {
              return turn;
            }

            return {
              ...turn,
              lights: turn.lights.filter((_, idx) => idx !== lightIndex),
            };
          }) as DungeonHour;
        });
      }

      return prev.map(
        (hour) =>
          hour.map((turn) => ({
            ...turn,
            lights: turn.lights.filter((light) => light.id !== targetLight.id),
          })) as DungeonHour,
      );
    });
  };

  const goToPreviousHour = () => {
    setCurrentHourIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNextHour = () => {
    setCurrentHourIndex((prev) => (prev < hours.length - 1 ? prev + 1 : prev));
  };

  const toggleTurnChecked = (turnIndex: number) => {
    setHours((prev) => {
      const updatedHour = prev[safeCurrentHourIndex].map((turn, i) =>
        i === turnIndex ? { ...turn, checked: !turn.checked } : turn,
      ) as DungeonHour;

      return prev.map((hour, i) =>
        i === safeCurrentHourIndex ? updatedHour : hour,
      );
    });
  };

  return (
    <DungeonTimeTrackerContext.Provider
      value={{
        hours,
        currentHour: hours[safeCurrentHourIndex],
        currentHourIndex: safeCurrentHourIndex,
        addHour,
        addLight,
        removeLight,
        goToPreviousHour,
        goToNextHour,
        toggleTurnChecked,
      }}
    >
      {children}
    </DungeonTimeTrackerContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDungeonTimeTracker() {
  const context = useContext(DungeonTimeTrackerContext);

  if (!context) {
    throw new Error(
      "useDungeonTimeTracker must be used within DungeonTimeTrackerProvider",
    );
  }

  return context;
}
