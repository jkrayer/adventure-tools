import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { TABLES_STORAGE_KEY, useSyncState } from "../lib";

export type Table = {
  id: number;
  name: string;
  dice: string;
  entries: { roll: string; effect: string }[];
};

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

const START_TABLES: Table[] = [
  {
    id: 1,
    name: "Factions",
    dice: "1d20",
    entries: [
      { roll: "1", effect: "The Goddess Axius" },
      { roll: "2", effect: "The Wizard Vibaris" },
      { roll: "3", effect: "Philomelos of Hyperion" },
      { roll: "4", effect: "Nimble Fingers" },
      { roll: "5", effect: "River Vipers" },
      { roll: "6", effect: "Clergy" },
      { roll: "7", effect: "Wizards" },
      { roll: "8", effect: "Guard" },
      { roll: "9", effect: "Veiled Society" },
      { roll: "10", effect: "Sewer Rats" },
      { roll: "11", effect: "Dock Street" },
      { roll: "12", effect: "Nobility" },
      { roll: "13", effect: "Demon Cults" },
      { roll: "14", effect: "" },
      { roll: "15", effect: "The Dwarves" },
      { roll: "16", effect: "Elves" },
      { roll: "17", effect: "Gnomish Revolutionaries" },
      { roll: "18", effect: "The Crown" },
      { roll: "19", effect: "Guild(s)" },
      { roll: "20", effect: "A Magical Being" },
    ],
  },
  {
    id: 2,
    name: "Items",
    dice: "1d20",
    entries: [
      { roll: "1", effect: "Holy or Unholy Relic" },
      { roll: "2", effect: "Scroll or Map" },
      { roll: "3", effect: "Potion or Magical Item" },
      { roll: "4", effect: "Documents" },
      { roll: "5", effect: "Gems / Jewelry" },
      { roll: "6", effect: "Art / Forgery" },
      { roll: "7", effect: "Heirloom" },
      { roll: "8", effect: "Drugs" },
      { roll: "9", effect: "Rare Wine" },
      { roll: "10", effect: "" },
      { roll: "11", effect: "Person" },
      { roll: "12", effect: "Arcane Text" },
      { roll: "13", effect: "Antiquity" },
      { roll: "14", effect: "Cash" },
      { roll: "15", effect: "Exotic Animal" },
      { roll: "16", effect: "Trophy" },
      { roll: "17", effect: "Exotic Plant or Component" },
      { roll: "18", effect: "Information" },
      { roll: "19", effect: "" },
      { roll: "20", effect: "" },
    ],
  },
  {
    id: 3,
    name: "Locations",
    dice: "4d8",
    entries: [
      { roll: "4", effect: "Imperial Palace" },
      { roll: "5", effect: "Senate" },
      { roll: "6", effect: "National Monument" },
      { roll: "7", effect: "Museum" },
      { roll: "8", effect: "" },
      { roll: "9", effect: "" },
      { roll: "10", effect: "" },
      { roll: "11", effect: "Tenament" },
      { roll: "12", effect: "Enemy Hideout" },
      { roll: "13", effect: "Noble Home" },
      { roll: "14", effect: "A Wizard's Home" },
      { roll: "15", effect: "Guild Hall (pick one)" },
      { roll: "16", effect: "Tavern" },
      { roll: "17", effect: "Sewers" },
      { roll: "18", effect: "Warehouse" },
      { roll: "19", effect: "Grave Yard" },
      { roll: "20", effect: "Theater" },
      { roll: "21", effect: "Barge" },
      { roll: "22", effect: "A Major Temple" },
      { roll: "23", effect: "Hidden Temple" },
      { roll: "24", effect: "Hidden Crypt" },
      { roll: "25", effect: "Guard House" },
      { roll: "26", effect: "Library" },
      { roll: "27", effect: "" },
      { roll: "28", effect: "" },
      { roll: "29", effect: "Monastery" },
      { roll: "30", effect: "Vault" },
      { roll: "31", effect: "Embassy" },
      { roll: "32", effect: "" },
    ],
  },
  {
    id: 4,
    name: "Pay",
    dice: "2d4",
    entries: [
      { roll: "2", effect: "7d6 x 10" },
      { roll: "3", effect: "5d6 x 10" },
      { roll: "4", effect: "3d6 x 10" },
      { roll: "5", effect: "2d6 x 10" },
      { roll: "6", effect: "4d6 x 10" },
      { roll: "7", effect: "6d6 x 10" },
      { roll: "8", effect: "special" },
    ],
  },
  {
    id: 5,
    name: "Timeline",
    dice: "2d4",
    entries: [
      { roll: "2", effect: "By Midnight" },
      { roll: "3", effect: "By Dawn" },
      { roll: "4", effect: "special" },
      { roll: "5", effect: "24 Hours" },
      { roll: "6", effect: "48 Hours" },
      { roll: "7", effect: "72 hours" },
      { roll: "8", effect: "2 hours" },
    ],
  },
];
