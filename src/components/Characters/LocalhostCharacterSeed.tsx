import { useEffect } from "react";
import {
  CHARACTERS_STORAGE_KEY,
  useCharacters,
  type Character,
} from "../../context/CharactersContext";

const localhostCharacters: Character[] = [
  {
    id: 1,
    character: "Dell Graybeard",
    player: "Jeff",
    currentHP: 83,
    maxHP: 100,
    link: "https://jameskrayer.com/dungeons-and-dragons/house-rules/#anchor-assassin",
    ac: 7,
  },
  {
    id: 2,
    character: "Una Undervoot",
    player: "Lianne",
    currentHP: 75,
    maxHP: 100,
    link: "https://jameskrayer.com/dungeons-and-dragons/house-rules/#anchor-thief",
    ac: 5,
  },
  {
    id: 3,
    character: "B.F. Bagman",
    player: "Steve",
    currentHP: 80,
    maxHP: 100,
    link: "https://jameskrayer.com/dungeons-and-dragons/house-rules/#anchor-thief",
    ac: 7,
  },
  {
    id: 4,
    character: "Ryan Wythyneye",
    player: "Bryam",
    currentHP: 50,
    maxHP: 100,
    link: "https://jameskrayer.com/dungeons-and-dragons/house-rules/#anchor-thief",
    ac: 7,
  },
  {
    id: 5,
    character: "Gordon Heavyfoot",
    player: "Roehl",
    currentHP: 95,
    maxHP: 100,
    link: "https://jameskrayer.com/dungeons-and-dragons/house-rules/#anchor-thief",
    ac: 7,
  },
  {
    id: 6,
    character: "Tiny Tim",
    player: "John",
    currentHP: 117,
    maxHP: 100,
    ac: 7,
    link: "https://jameskrayer.com/dungeons-and-dragons/house-rules/#anchor-thief",
  },
];

function isLocalhostHost() {
  return (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  );
}

export default function LocalhostCharacterSeed() {
  const { setCharacters } = useCharacters();

  useEffect(() => {
    if (!isLocalhostHost()) {
      return;
    }

    localStorage.setItem(
      CHARACTERS_STORAGE_KEY,
      JSON.stringify(localhostCharacters),
    );
    setCharacters(localhostCharacters);
  }, [setCharacters]);

  return null;
}
