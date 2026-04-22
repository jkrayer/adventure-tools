import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { PointerEvent } from "react";
import TableComponent from "./Table";

type RollTableProps = {
  onEdit: () => void;
  onDelete: () => void;
  table: Table;
};

export default function RollTable({ onDelete, onEdit, table }: RollTableProps) {
  const holdToConfirmMs = 1000;
  const [isHoldingDelete, setIsHoldingDelete] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const isCompleteRef = useRef(false);

  const deleteButtonStyle = useMemo(
    () => ({ "--danger-hold-ms": `${holdToConfirmMs}ms` }) as CSSProperties,
    [holdToConfirmMs],
  );

  const clearDeleteHold = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!isCompleteRef.current) {
      setIsHoldingDelete(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startDeleteHold = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || timeoutRef.current !== null) {
      return;
    }

    isCompleteRef.current = false;
    setIsHoldingDelete(true);
    timeoutRef.current = window.setTimeout(() => {
      isCompleteRef.current = true;
      setIsHoldingDelete(false);
      timeoutRef.current = null;
      onDelete();
    }, holdToConfirmMs);
  };

  const hasManyEntries = table.entries.length > 10;
  const midpoint = Math.ceil(table.entries.length / 2);
  const leftEntries = table.entries.slice(0, midpoint);
  const rightEntries = table.entries.slice(midpoint);

  const tableBody = !hasManyEntries ? (
    <TableComponent caption={`${table.noOfDice}d${table.dieType}`}>
      <thead>
        <tr>
          <th scope="col">Roll</th>
          <th scope="col">Effect</th>
        </tr>
      </thead>
      <tbody>
        {table.entries.map((entry) => (
          <tr key={`${entry.start}-${entry.end}`}>
            <td>
              {entry.start === entry.end
                ? entry.start
                : `${entry.start}-${entry.end}`}
            </td>
            <td>{entry.effect}</td>
          </tr>
        ))}
      </tbody>
    </TableComponent>
  ) : (
    <TableComponent caption={`${table.noOfDice}d${table.dieType}`}>
      <thead>
        <tr>
          <th scope="col">Roll</th>
          <th scope="col">Effect</th>
          <th scope="col">Roll</th>
          <th scope="col">Effect</th>
        </tr>
      </thead>
      <tbody>
        {leftEntries.map((leftEntry, index) => {
          const rightEntry = rightEntries[index];

          return (
            <tr key={`split-${index}-${leftEntry.start}-${leftEntry.end}`}>
              <td>
                {leftEntry.start === leftEntry.end
                  ? leftEntry.start
                  : `${leftEntry.start}-${leftEntry.end}`}
              </td>
              <td>{leftEntry.effect}</td>
              <td>
                {rightEntry
                  ? rightEntry.start === rightEntry.end
                    ? rightEntry.start
                    : `${rightEntry.start}-${rightEntry.end}`
                  : ""}
              </td>
              <td>{rightEntry?.effect ?? ""}</td>
            </tr>
          );
        })}
      </tbody>
    </TableComponent>
  );

  return (
    <div className="roll-table-shell">
      {tableBody}
      <div className="roll-table-actions">
        <button
          className="btn btn-standard info"
          onClick={onEdit}
          type="button"
        >
          Edit Table
        </button>
        <button
          className={`menu-item menu-item-danger roll-table-delete-button ${isHoldingDelete ? "holding" : ""}`}
          onClick={(event) => {
            event.preventDefault();
          }}
          onPointerCancel={clearDeleteHold}
          onPointerDown={startDeleteHold}
          onPointerLeave={clearDeleteHold}
          onPointerUp={clearDeleteHold}
          style={deleteButtonStyle}
          type="button"
        >
          <span className="menu-item-label">Delete Table</span>
        </button>
      </div>
    </div>
  );
}
