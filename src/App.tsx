import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import ActionTray, { CharacterTray } from "./components/ActionTray";
import Players from "./components/Players";
import { CharactersProvider } from "./context/CharactersContext";

function App() {
  return (
    <CharactersProvider>
      <CharacterTray>
        <Players />
      </CharacterTray>
      <ActionTray>
        <DungeonTimeTracker />
      </ActionTray>
    </CharactersProvider>
  );
}

export default App;
