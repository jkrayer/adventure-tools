import type { Table as TableData } from "../context/TablesContext";
import Table from "./Table";

type RollTableProps = {
  table: TableData;
};

export default function RollTable({ table }: RollTableProps) {
  const hasManyEntries = table.entries.length > 10;

  if (!hasManyEntries) {
    return (
      <Table caption={table.dice}>
        <thead>
          <tr>
            <th scope="col">Roll</th>
            <th scope="col">Effect</th>
          </tr>
        </thead>
        <tbody>
          {table.entries.map((entry, index) => (
            <tr key={`${entry.roll}-${index}`}>
              <td>{entry.roll}</td>
              <td>{entry.effect}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  const midpoint = Math.ceil(table.entries.length / 2);
  const leftEntries = table.entries.slice(0, midpoint);
  const rightEntries = table.entries.slice(midpoint);

  return (
    <Table caption={table.dice}>
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
            <tr key={`split-${index}-${leftEntry.roll}`}>
              <td>{leftEntry.roll}</td>
              <td>{leftEntry.effect}</td>
              <td>{rightEntry?.roll ?? ""}</td>
              <td>{rightEntry?.effect ?? ""}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
