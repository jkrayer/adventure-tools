import Card from "../Card";
import Flex from "../Flex";
import Menu from "../Menu";
import PopOver from "../Popover";

function CharacterOptionsMenu({
  link,
  onDelete,
  onEdit,
}: {
  link: string;
  onDelete: () => void;
  onEdit: () => void;
}) {
  const { close } = PopOver.useControls();

  return (
    <Menu onAction={close}>
      <Menu.Item as="a" href={link} rel="noopener noreferrer" target="_blank">
        Open Rules
      </Menu.Item>
      <Menu.Item onClick={onEdit}>Edit Character</Menu.Item>
      <Menu.Item intent="danger" onAction={onDelete}>
        Remove Character
      </Menu.Item>
    </Menu>
  );
}

function CharacterOptionsTrigger() {
  const triggerProps = PopOver.useTrigger();
  const { isOpen } = PopOver.useControls();

  return (
    <button
      aria-expanded={isOpen}
      aria-label="Character options"
      className={`btn btn-overlay ${isOpen ? "open" : ""}`}
      type="button"
      {...triggerProps}
    >
      <span className="btn-overly-menu-line top" />
      <span className="btn-overly-menu-line middle" />
      <span className="btn-overly-menu-line bottom" />
    </button>
  );
}

export default function PlayerCard({
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
