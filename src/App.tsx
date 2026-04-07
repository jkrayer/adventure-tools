import * as Tray from "./components/ActionTray";
import Characters from "./components/Characters/Characters.tsx";
import LocalhostCharacterSeed from "./components/Characters/LocalhostCharacterSeed";
import DungeonTimeTracker from "./components/DungeonTimeTracker/DungeonTimeTracker";
import { CharactersProvider } from "./context/CharactersContext";
import ToolBar from "./components/ToolBar/ToolBar";

function App() {
  return (
    <CharactersProvider>
      <LocalhostCharacterSeed />
      <Tray.Characters>
        <Characters />
      </Tray.Characters>
      <ToolBar />
      <Tray.Actions>
        <DungeonTimeTracker />
      </Tray.Actions>
    </CharactersProvider>
  );
}

export default App;
