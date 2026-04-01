import PlayerCard from "./PlayerCard";
import { useCharacters } from "../context/CharactersContext";

export default function Players() {
  const { characters, updateCharacterHP } = useCharacters();

  return (
    <>
      {characters.map((player) => (
        <PlayerCard
          key={player.id}
          character={player.character}
          player={player.player}
          currentHP={player.currentHP}
          maxHP={player.maxHP}
          onHPChange={(newHP) => updateCharacterHP(player.id, newHP)}
        />
      ))}
    </>
  );
}
