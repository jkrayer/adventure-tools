import PlayerCard from "./PlayerCard";
import { useCharacters } from "../../context/CharactersContext";

export default function Players() {
  const { characters, updateCharacterHP } = useCharacters();

  return (
    <>
      {characters.map((player) => (
        <PlayerCard
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
