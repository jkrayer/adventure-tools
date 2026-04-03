import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import ActionTray, { CharacterTray } from "./components/ActionTray";
import Players from "./components/Characters/Players.tsx";
import { CharactersProvider } from "./context/CharactersContext";
import CharacterForm from "./components/Characters/CharacterForm.tsx";

function App() {
  return (
    <CharactersProvider>
      <CharacterTray>
        <Players />
        <CharacterForm />
      </CharacterTray>
      <ActionTray>
        <DungeonTimeTracker />
      </ActionTray>
    </CharactersProvider>
  );
}

export default App;
