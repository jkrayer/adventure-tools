import { useMemo, useState } from "react";
import Flex from "../Flex";
import Form from "../Form";
import Input from "../Input";
import Label from "../Label";
import { useTables } from "../../context/TablesContext";

const ALLOWED_DIE_TYPES: dieType[] = [4, 6, 8, 10, 12, 20, 100];

const toDieType = (value: number): dieType => {
  return ALLOWED_DIE_TYPES.includes(value as dieType) ? (value as dieType) : 4;
};

type TableEntryDraft = {
  start: number;
  end: number;
  effect: string;
};

type TableFormProps = {
  mode?: "create" | "edit";
  onClose: () => void;
  table?: Table;
};

// THIS NEEDS TO BE BUILT MANUALLY
export default function TableForm({
  mode = "create",
  onClose,
  table,
}: TableFormProps) {
  // CONTEXT
  const { createTable, updateTable } = useTables();

  const [initialDiceCount, initialDieSides] = useMemo(() => {
    if (mode !== "edit" || !table) {
      return [1, 4] as const;
    }

    return [
      Number.isFinite(table.noOfDice) && table.noOfDice > 0
        ? table.noOfDice
        : 1,
      toDieType(table.dieType),
    ] as const;
  }, [mode, table]);

  const initialEntries = useMemo<TableEntryDraft[]>(() => {
    if (mode !== "edit" || !table || table.entries.length === 0) {
      return [
        { start: 1, end: initialDiceCount * initialDieSides, effect: "" },
      ];
    }

    return table.entries;
  }, [initialDiceCount, initialDieSides, mode, table]);

  // STATE
  const [name, setName] = useState<string>(
    mode === "edit" && table ? table.name : "",
  );
  const [diceCount, setDiceCount] = useState<number>(initialDiceCount);
  const [dieSides, setDieSides] = useState<dieType>(initialDieSides);
  const [entries, setEntries] = useState<TableEntryDraft[]>(initialEntries);

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
    const nextTable = {
      name,
      noOfDice: diceCount,
      dieType: dieSides,
      entries,
    };

    if (mode === "edit" && table) {
      updateTable(table.id, nextTable);
    } else {
      createTable(nextTable);
    }

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
            onChange={(event) =>
              setDieSides(toDieType(event.target.valueAsNumber || 4))
            }
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
            {mode === "edit" ? "Update Table" : "Save Table"}
          </button>
        </div>
      </Flex>
    </Form>
  );
}
