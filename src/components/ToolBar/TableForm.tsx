import { useMemo, useState } from "react";
import Form from "../Form";
import Input from "../Input";
import Label from "../Label";
import { useTables } from "../../context/TablesContext";
import Flex from "../Flex";

type TableEntryDraft = {
  start: number;
  end: number;
  effect: string;
};

type TableFormProps = {
  onClose: () => void;
};

// THIS NEEDS TO BE BUILT MANUALLY
export default function TableForm({ onClose }: TableFormProps) {
  // CONTEXT
  const { createTable } = useTables();

  // STATE
  const [name, setName] = useState<string>("");
  const [diceCount, setDiceCount] = useState<number>(1);
  const [dieSides, setDieSides] = useState<number>(4);

  const [entries, setEntries] = useState<TableEntryDraft[]>([
    { start: 1, end: 4, effect: "" },
  ]);

  const updateEntry = (index: number, nextEntry: Partial<TableEntryDraft>) => {
    setEntries((prev) => {
      const nextEntries = prev.slice();
      nextEntries[index] = { ...nextEntries[index], ...nextEntry };

      return nextEntries;
    });
  };

  const maximumRoll = useMemo(
    () => diceCount * dieSides,
    [diceCount, dieSides],
  );

  // FOCUS
  const handleEntryFocus = () => {
    const lastIndex = entries.length - 1;
    if (entries[lastIndex].end < maximumRoll) {
      setEntries((old) => [
        ...old,
        { start: entries[lastIndex].end + 1, end: maximumRoll, effect: "" },
      ]);
    }
  };

  const handlerSubmit = () => {
    createTable({
      name,
      dice: `${diceCount}d${dieSides}`,
      entries: entries.map(({ start, end, effect }) => ({
        roll: `${start}-${end}`,
        effect,
      })),
    });
    onClose();
  };

  return (
    <Form onSubmit={handlerSubmit}>
      <Flex className="mh-m">
        <div style={{ flexGrow: 1 }}>
          <Label htmlFor="table-name">Table Name</Label>
          <Input
            autoFocus
            id="table-name"
            name="table-name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Table Name"
            required
            type="text"
            value={name}
          />
        </div>
        <div style={{ maxWidth: "32px" }}>
          <Label htmlFor="table-dice-count" title="Number of Dice">
            No.
          </Label>
          <Input
            // className="input-short"
            id="table-dice-count"
            min={1}
            name="table-dice-count"
            onChange={(event) => setDiceCount(event.target.valueAsNumber || 1)}
            placeholder="1"
            required
            step={1}
            type="number"
            value={diceCount}
          />
        </div>

        <div style={{ maxWidth: "32px" }}>
          <Label htmlFor="table-die-sides" title="Number of Sides">
            Sides
          </Label>
          <Input
            // className="input-short"
            id="table-die-sides"
            min={1}
            name="table-die-sides"
            onChange={(event) => setDieSides(event.target.valueAsNumber || 1)}
            required
            step={1}
            type="number"
            value={dieSides}
          />
        </div>
      </Flex>
      {entries.map((entry, index) => (
        <Flex className="mh-xs" key={index}>
          <div style={{ maxWidth: "32px" }}>
            <Label
              className="visually-hidden"
              htmlFor={`table-entry-start-${index}`}
            >
              Start
            </Label>
            <Input
              //   className="input-short"
              id={`table-entry-start-${index}`}
              readOnly
              required
              step={1}
              tabIndex={-1}
              type="number"
              value={entry.start}
            />
          </div>
          <div style={{ maxWidth: "32px" }}>
            <Label
              className="visually-hidden"
              htmlFor={`table-entry-end-${index}`}
            >
              End
            </Label>
            <Input
              //   className="input-short"
              id={`table-entry-end-${index}`}
              max={maximumRoll}
              min={entry.start}
              onChange={(event) => {
                const nextEnd = Number(event.target.value || entry.start);
                updateEntry(index, { end: nextEnd });
              }}
              required
              step={1}
              type="number"
              value={entry.end}
            />
          </div>
          {/*  className="table-entry-effect" */}
          <div style={{ flexGrow: 1 }}>
            <Label
              className="visually-hidden"
              htmlFor={`table-entry-effect-${index}`}
            >
              Effect
            </Label>
            <Input
              id={`table-entry-effect-${index}`}
              onChange={(event) =>
                updateEntry(index, {
                  effect: event.target.value,
                })
              }
              onFocus={handleEntryFocus}
              required
              type="text"
              value={entry.effect}
            />
          </div>
        </Flex>
      ))}

      <Flex className="mh-m" justifyContent="flex-end">
        <div>
          <button className="btn btn-standard info" type="submit">
            Save Table
          </button>
        </div>
      </Flex>
    </Form>
  );
}
