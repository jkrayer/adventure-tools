import Card from "../Card";
import Flex from "../Flex";
import PopOver from "../Popover";

export default function PlayerCard({
  character,
  link,
  currentHP,
  maxHP,
  player,
  ac,
  onHPChange,
}: {
  character: string;
  link: string;
  currentHP: number;
  maxHP: number;
  player: string;
  ac: number;
  onHPChange: (arg0: number) => void;
}) {
  console.log(23, link);
  return (
    <Card>
      <Card.Header>
        <Flex justifyContent="space-between">
          <div>
            <a href={link} target="_bank">
              {character}
            </a>
            <Card.Sub>({player})</Card.Sub>
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
    </Card>
  );
}
