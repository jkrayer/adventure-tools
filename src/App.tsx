import ActionTray, { CharacterTray } from "./components/ActionTray";
import Characters from "./components/Characters/Characters.tsx";
import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import { CharactersProvider } from "./context/CharactersContext";

function App() {
  return (
    <CharactersProvider>
      <CharacterTray>
        <Characters />
      </CharacterTray>
      <ActionTray>
        <DungeonTimeTracker />
      </ActionTray>
    </CharactersProvider>
  );
}

export default App;
