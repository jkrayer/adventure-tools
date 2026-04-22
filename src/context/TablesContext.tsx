import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { START_TABLES } from "../data/tables";
import { TABLES_STORAGE_KEY, useSyncState } from "../lib";

type TablesContextValue = {
  tables: Table[];
  setTables: Dispatch<SetStateAction<Table[]>>;
  getTables: () => Table[];
  getTableById: (id: number) => Table | undefined;
  getTableByName: (name: string) => Table | undefined;
  getTableNames: () => string[];
  createTable: (table: Omit<Table, "id">) => void;
  updateTable: (id: number, table: Omit<Table, "id">) => void;
  deleteTable: (id: number) => void;
};

const TablesContext = createContext<TablesContextValue | undefined>(undefined);

export function TablesProvider({ children }: { children: ReactNode }) {
  const [tables, setTables] = useSyncState<Table[]>(
    TABLES_STORAGE_KEY,
    START_TABLES,
  );

  const getTables = () => tables;

  const getTableById = (id: number) => {
    return tables.find((table) => table.id === id);
  };

  const getTableByName = (name: string) => {
    return tables.find((table) => table.name === name);
  };

  const getTableNames = () => {
    return tables.map((table) => table.name);
  };

  const createTable = (table: Omit<Table, "id">) => {
    setTables((prev) => {
      const maxId = prev.reduce(
        (currentMax, currentTable) =>
          currentTable.id > currentMax ? currentTable.id : currentMax,
        0,
      );

      return [...prev, { ...table, id: maxId + 1 }];
    });
  };

  const updateTable = (id: number, table: Omit<Table, "id">) => {
    setTables((prev) =>
      prev.map((currentTable) =>
        currentTable.id === id ? { ...currentTable, ...table } : currentTable,
      ),
    );
  };

  const deleteTable = (id: number) => {
    setTables((prev) => prev.filter((table) => table.id !== id));
  };

  return (
    <TablesContext.Provider
      value={{
        tables,
        setTables,
        getTables,
        getTableById,
        getTableByName,
        getTableNames,
        createTable,
        updateTable,
        deleteTable,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTables() {
  const context = useContext(TablesContext);

  if (!context) {
    throw new Error("useTables must be used within TablesProvider");
  }

  return context;
}
