import LightMenu from "./LightMenu";
import PopOver from "../Popover";
import TurnCircle from "./TurnCircle";

export default function TimeCircle({ turnIndex }: { turnIndex: number }) {
  return (
    <PopOver openOn="right" placement="above">
      <TurnCircle turnIndex={turnIndex} />
      <PopOver.Body>
        <LightMenu turnIndex={turnIndex} />
      </PopOver.Body>
    </PopOver>
  );
}
