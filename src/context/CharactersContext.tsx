import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useSyncState } from "../lib";

export const CHARACTERS_STORAGE_KEY = "goldenrod:characters";

export type Character = {
  id: number;
  ac: number;
  character: string;
  currentHP: number;
  link: string;
  maxHP: number;
  player: string;
};

type CharactersContextValue = {
  characters: Character[];
  setCharacters: Dispatch<SetStateAction<Character[]>>;
  createNew: (character: Omit<Character, "id">) => void;
  deleteCharacter: (id: number) => void;
  updateCharacter: (id: number, character: Omit<Character, "id">) => void;
  updateCharacterHP: (id: number, currentHP: number) => void;
};

const CharactersContext = createContext<CharactersContextValue | undefined>(
  undefined,
);

export function CharactersProvider({ children }: { children: ReactNode }) {
  const [characters, setCharacters] = useSyncState<Character[]>(
    CHARACTERS_STORAGE_KEY,
    [],
  );

  const updateCharacterHP = (id: number, currentHP: number) => {
    setCharacters((prev) =>
      prev.map((character) =>
        character.id === id ? { ...character, currentHP } : character,
      ),
    );
  };

  const createNew = (character: Omit<Character, "id">) => {
    setCharacters((prev) => {
      const maxId = prev.reduce(
        (currentMax, currentCharacter) =>
          currentCharacter.id > currentMax ? currentCharacter.id : currentMax,
        0,
      );

      return [
        ...prev,
        {
          ...character,
          currentHP: character.currentHP || character.maxHP,
          id: maxId + 1,
        },
      ];
    });
  };

  const updateCharacter = (id: number, character: Omit<Character, "id">) => {
    setCharacters((prev) =>
      prev.map((currentCharacter) =>
        currentCharacter.id === id
          ? {
              ...currentCharacter,
              ...character,
              currentHP: character.currentHP || character.maxHP,
            }
          : currentCharacter,
      ),
    );
  };

  const deleteCharacter = (id: number) => {
    setCharacters((prev) => prev.filter((character) => character.id !== id));
  };

  return (
    <CharactersContext.Provider
      value={{
        characters,
        setCharacters,
        createNew,
        deleteCharacter,
        updateCharacter,
        updateCharacterHP,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCharacters() {
  const context = useContext(CharactersContext);

  if (!context) {
    throw new Error("useCharacters must be used within CharactersProvider");
  }

  return context;
}
