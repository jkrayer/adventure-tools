import { useEffect, useMemo, useState } from "react";
import { useCharacters, useTables } from "../context";
import { START_CHARACTERS, START_TABLES } from "../data";
import Modal from "./Modal";
import { WELCOME_SEED_COMPLETED_STORAGE_KEY } from "../lib";

const cloneStartCharacters = (): Character[] => {
  return START_CHARACTERS.map((character) => ({ ...character }));
};

const cloneStartTables = (): Table[] => {
  return START_TABLES.map((table) => ({
    ...table,
    entries: table.entries.map((entry) => ({ ...entry })),
  }));
};

export default function WelcomeSeedModal() {
  const { characters, setCharacters } = useCharacters();
  const { tables, setTables } = useTables();
  const [isOpen, setIsOpen] = useState(false);

  const hasExistingData = useMemo(() => {
    return characters.length > 0 || tables.length > 0;
  }, [characters.length, tables.length]);

  const markCompleted = () => {
    localStorage.setItem(WELCOME_SEED_COMPLETED_STORAGE_KEY, "true");
  };

  useEffect(() => {
    if (hasExistingData) {
      markCompleted();
      return;
    }

    const hasCompletedWelcomeFlow =
      localStorage.getItem(WELCOME_SEED_COMPLETED_STORAGE_KEY) === "true";

    if (!hasCompletedWelcomeFlow) {
      setIsOpen(true);
    }
  }, [hasExistingData]);

  const handleSkip = () => {
    markCompleted();
    setIsOpen(false);
  };

  const handlePreload = () => {
    setCharacters(cloneStartCharacters());
    setTables(cloneStartTables());
    markCompleted();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleSkip} title="Welcome to Goldenrod">
      <div style={{ maxWidth: "420px" }}>
        <p style={{ marginTop: 0 }}>
          Want to pre-populate your game with starter Characters and Tables?
        </p>
        <p
          style={{ color: "var(--gray50)", marginBottom: "var(--size-medium)" }}
        >
          You can always add your own data later.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "var(--size-small)",
          }}
        >
          <button
            className="btn btn-standard"
            onClick={handleSkip}
            type="button"
          >
            No thanks
          </button>
          <button
            className="btn btn-standard info"
            onClick={handlePreload}
            type="button"
          >
            Pre-load Starter Data
          </button>
        </div>
      </div>
    </Modal>
  );
}
