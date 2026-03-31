import PlayerCard from "./PlayerCard";
import { useSyncState } from "../lib";

type Character = {
  id: number;
  character: string;
  player: string;
  currentHP: number;
  maxHP: number;
};

export default function Players() {
  const [state, setState] = useSyncState<Character[]>(
    "goldenrod:characters",
    startCharacters,
  );

  const handleHPChange = (index: number, currentHP: number) => {
    setState((prev) => {
      const cp = prev.slice();

      cp[index] = {
        ...cp[index],
        currentHP,
      };

      return cp;
    });
  };

  return (
    <div className="player-tray">
      {state.map((player: Character, index: number) => (
        <PlayerCard
          key={player.id}
          character={player.character}
          player={player.player}
          currentHP={player.currentHP}
          maxHP={player.maxHP}
          onHPChange={(newHP) => handleHPChange(index, newHP)}
        />
      ))}
    </div>
  );
}

const startCharacters: Character[] = [
  {
    id: 1,
    character: "Dell Graybeard",
    player: "Jeff",
    currentHP: 90,
    maxHP: 100,
  },
  {
    id: 2,
    character: "Una Undervoot",
    player: "Lianne",
    currentHP: 75,
    maxHP: 100,
  },
  {
    id: 3,
    character: "B.F. Bagman",
    player: "Steve",
    currentHP: 80,
    maxHP: 100,
  },
  {
    id: 4,
    character: "Ryan Wythyneye",
    player: "Bryam",
    currentHP: 85,
    maxHP: 100,
  },
  {
    id: 5,
    character: "Gordon Heavyfoot",
    player: "Roehl",
    currentHP: 95,
    maxHP: 100,
  },
  {
    id: 6,
    character: "Tiny Tim",
    player: "John",
    currentHP: 70,
    maxHP: 100,
  },
];
