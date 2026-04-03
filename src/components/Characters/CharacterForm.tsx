import Form from "../Form.tsx";
import Input from "../Input.tsx";
import Label from "../Label.tsx";
import Flex from "../Flex.tsx";

export default function CharacterForm() {
  return (
    <div style={{ maxWidth: "336px", margin: "0 auto" }}>
      <Form>
        <Flex.Col gap="medium">
          <Flex gap="medium">
            <div>
              <Label htmlFor="player-name">Player:</Label>
              <Input id="player-name" name="player-name" type="text" required />
            </div>
            <div>
              <Label htmlFor="character-name">Character:</Label>
              <Input
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
            <Input id="player-link" name="player-link" type="url" />
          </div>
          <Flex gap="medium" justifyContent="flex-end">
            <button className="btn btn-primary" type="submit">
              Save
            </button>
          </Flex>
        </Flex.Col>
      </Form>
    </div>
  );
}
