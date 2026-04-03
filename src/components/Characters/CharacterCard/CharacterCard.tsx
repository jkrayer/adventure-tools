import CharacterOptionsMenu from "./CharacterOptionsMenu";
import CharacterOptionsTrigger from "./CharacterOptionsTrigger";
import Card from "../../Card";
import Flex from "../../Flex";
import PopOver from "../../Popover";

export default function CharacterCard({
  character,
  link,
  currentHP,
  maxHP,
  player,
  ac,
  onDelete,
  onEdit,
  onHPChange,
}: {
  character: string;
  link: string;
  currentHP: number;
  maxHP: number;
  player: string;
  ac: number;
  onDelete: () => void;
  onEdit: () => void;
  onHPChange: (arg0: number) => void;
}) {
  return (
    <Card className="character-card">
      <Card.Header>
        <Flex justifyContent="space-between">
          <div>
            {character}
            &nbsp;<Card.Sub>({player})</Card.Sub>
          </div>
          <Card.Sub>AC:{ac}</Card.Sub>
        </Flex>
      </Card.Header>

      <PopOver>
        <PopOver.Trigger>
          <Card.Meter max={maxHP} value={currentHP} />
        </PopOver.Trigger>
        <PopOver.Body>
          <input
            autoFocus
            type="number"
            value={currentHP}
            onChange={(e) => onHPChange(e.target.valueAsNumber || currentHP)}
          />
        </PopOver.Body>
      </PopOver>

      <div className="character-card-options">
        <PopOver placement="below">
          <CharacterOptionsTrigger />
          <PopOver.Body>
            <CharacterOptionsMenu
              link={link}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </PopOver.Body>
        </PopOver>
      </div>
    </Card>
  );
}
