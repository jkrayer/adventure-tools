import CharacterCard from "./CharacterCard";
import { useCharacters } from "../../context/CharactersContext";

export default function Characters() {
  const { characters, updateCharacterHP } = useCharacters();

  return (
    <>
      {characters.map((player) => (
        <CharacterCard
          key={player.id}
          ac={player.ac}
          character={player.character}
          currentHP={player.currentHP}
          link={player.link}
          maxHP={player.maxHP}
          onHPChange={(newHP) => updateCharacterHP(player.id, newHP)}
          player={player.player}
        />
      ))}
    </>
  );
}
