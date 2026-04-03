import { useState } from "react";
import CharacterCard from "./CharacterCard";
import CharacterForm from "./CharacterForm";
import Modal from "../Modal";
import { AddButton } from "../CircleButton";
import { useCharacters } from "../../context/CharactersContext";

export default function Characters() {
  const { characters, updateCharacterHP } = useCharacters();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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

      <AddButton
        onClick={() => setIsCreateModalOpen(true)}
        title="Add character"
      />

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Add Character"
      >
        {({ close }) => <CharacterForm onClose={close} />}
      </Modal>
    </>
  );
}
