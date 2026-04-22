import { useEffect } from "react";
import { useCharacters, useTables } from "../../context";
import { START_CHARACTERS, START_TABLES } from "../../data";
import { CHARACTERS_STORAGE_KEY, TABLES_STORAGE_KEY } from "../../lib";

function isLocalhostHost() {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

export default function LocalhostCharacterSeed() {
  const { setCharacters } = useCharacters();
  const { setTables } = useTables();

  useEffect(() => {
    if (!isLocalhostHost()) {
      return;
    }

    const storedCharacters = localStorage.getItem(CHARACTERS_STORAGE_KEY);
    if (storedCharacters === null) {
      localStorage.setItem(
        CHARACTERS_STORAGE_KEY,
        JSON.stringify(START_CHARACTERS),
      );
      setCharacters(START_CHARACTERS);
    }

    const storedTables = localStorage.getItem(TABLES_STORAGE_KEY);
    if (storedTables === null) {
      localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(START_TABLES));
      setTables(START_TABLES);
    }
  }, [setCharacters, setTables]);

  return null;
}
