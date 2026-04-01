import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useSyncState } from "../lib";

export type Character = {
  id: number;
  character: string;
  player: string;
  currentHP: number;
  maxHP: number;
};

type CharactersContextValue = {
  characters: Character[];
  setCharacters: Dispatch<SetStateAction<Character[]>>;
  updateCharacterHP: (id: number, currentHP: number) => void;
};

const CharactersContext = createContext<CharactersContextValue | undefined>(
  undefined,
);

export function CharactersProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useSyncState<Character[]>(
    "goldenrod:characters",
    startCharacters,
  );

  const updateCharacterHP = (id: number, currentHP: number) => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? { ...character, currentHP } : character,
      ),
    );
  };

  return (
    <CharactersContext.Provider
      value={{ characters, setCharacters, updateCharacterHP }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

export function useCharacters() {
  const context = useContext(CharactersContext);

  if (!context) {
    throw new Error("useCharacters must be used within CharactersProvider");
  }

  return context;
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
