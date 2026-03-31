import Card from "./Card";
import Flex from "./Flex";
import PopOver from "./Popover";

export default function PlayerCard({
  character,
  currentHP,
  maxHP,
  player,
  onHPChange,
}: {
  character: string;
  currentHP: number;
  maxHP: number;
  player: string;
  onHPChange: (arg0: number) => void;
}) {
  return (
    <Card>
      <Card.Header>
        <Flex justifyContent="space-between">
          <div>
            {character} <Card.Sub>({player})</Card.Sub>
          </div>
          <Card.Sub>AC:10</Card.Sub>
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
