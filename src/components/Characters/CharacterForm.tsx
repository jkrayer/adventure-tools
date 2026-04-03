import type { FormEvent } from "react";
import Form from "../Form.tsx";
import Input from "../Input.tsx";
import Label from "../Label.tsx";
import Flex from "../Flex.tsx";
import { useCharacters, type Character } from "../../context/CharactersContext";

type CharacterFormProps = {
  editingCharacter?: Character | null;
  onClose: () => void;
};

export default function CharacterForm({
  editingCharacter,
  onClose,
}: CharacterFormProps) {
  const { createNew, updateCharacter } = useCharacters();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);

    const player = String(formData.get("player-name") ?? "").trim();
    const character = String(formData.get("character-name") ?? "").trim();
    const maxHP = Number(formData.get("character-hp-max") ?? 0);
    const currentHPRaw = formData.get("character-hp-current");
    const currentHP =
      currentHPRaw === null || String(currentHPRaw).trim() === ""
        ? maxHP
        : Number(currentHPRaw);
    const ac = Number(formData.get("character-ac") ?? 0);
    const link = String(formData.get("player-link") ?? "").trim();

    const nextCharacter = {
      ac,
      character,
      currentHP,
      link,
      maxHP,
      player,
    };

    if (editingCharacter) {
      updateCharacter(editingCharacter.id, nextCharacter);
    } else {
      createNew(nextCharacter);
      event.currentTarget.reset();
    }

    onClose();
  };

  return (
    <div style={{ maxWidth: "336px", margin: "0 auto" }}>
      <Form onSubmit={handleSubmit}>
        <Flex.Col gap="medium">
          <Flex gap="medium">
            <div>
              <Label htmlFor="player-name">Player:</Label>
              <Input
                autoFocus
                defaultValue={editingCharacter?.player ?? ""}
                id="player-name"
                name="player-name"
                required
                type="text"
              />
            </div>
            <div>
              <Label htmlFor="character-name">Character:</Label>
              <Input
                defaultValue={editingCharacter?.character ?? ""}
                id="character-name"
                name="character-name"
                type="text"
                required
              />
            </div>
          </Flex>
          <Flex gap="medium">
            <div>
              <Label htmlFor="character-hp-max">H.P. (max):</Label>
              <Input
                defaultValue={editingCharacter?.maxHP ?? ""}
                id="character-hp-max"
                name="character-hp-max"
                type="number"
                min={0}
                step={1}
                required
              />
            </div>
            <div>
              <Label htmlFor="character-hp-current">H.P. (current):</Label>
              <Input
                defaultValue={editingCharacter?.currentHP ?? ""}
                id="character-hp-current"
                name="character-hp-current"
                type="number"
                min={0}
                step={1}
              />
            </div>
            <div>
              <Label htmlFor="character-ac">A.C.:</Label>
              <Input
                defaultValue={editingCharacter?.ac ?? ""}
                id="character-ac"
                name="character-ac"
                type="number"
                max={10}
                min={-10}
                step={1}
                required
              />
            </div>
          </Flex>
          <div>
            <Label htmlFor="player-link">Link:</Label>
            <Input
              defaultValue={editingCharacter?.link ?? ""}
              id="player-link"
              name="player-link"
              type="url"
            />
          </div>
          <Flex gap="medium" justifyContent="flex-end">
            <button className="btn btn-standard info" type="submit">
              Save
            </button>
          </Flex>
        </Flex.Col>
      </Form>
    </div>
  );
}
