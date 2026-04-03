import { useState } from "react";
import CharacterCard from "./CharacterCard/CharacterCard";
import CharacterForm from "./CharacterForm";
import Modal from "../Modal";
import { AddButton } from "../CircleButton";
import { useCharacters, type Character } from "../../context/CharactersContext";

export default function Characters() {
  const { characters, deleteCharacter, updateCharacterHP } = useCharacters();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(
    null,
  );

  const openCreateModal = () => {
    setEditingCharacter(null);
    setIsFormModalOpen(true);
  };

  const openEditModal = (character: Character) => {
    setEditingCharacter(character);
    setIsFormModalOpen(true);
  };

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
          onDelete={() => deleteCharacter(player.id)}
          onEdit={() => openEditModal(player)}
          onHPChange={(newHP) => updateCharacterHP(player.id, newHP)}
          player={player.player}
        />
      ))}

      <AddButton onClick={openCreateModal} title="Add character" />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingCharacter ? "Edit Character" : "Add Character"}
      >
        {({ close }) => (
          <CharacterForm editingCharacter={editingCharacter} onClose={close} />
        )}
      </Modal>
    </>
  );
}
